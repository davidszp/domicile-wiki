"""Schema for researched jurisdiction tax and cost data.

One JSON file per country lives in ``data/jurisdictions/<ISO3>.json``; regional
overrides live in ``data/subnational/<ISO3>.json``. Every factual claim carries
its sources, tax year, verification date and confidence. Amounts are stored in
the jurisdiction's own currency and converted to EUR at build time.

Rates are decimals (0.25 means 25%). ``None`` means "not known": it is never
treated as zero.
"""

from __future__ import annotations

import datetime as dt
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, field_validator, model_validator

Rate = Annotated[float, Field(ge=0.0, le=1.0)]
Citizenship = Literal["EU", "US", "OTHER"]
Confidence = Literal["high", "medium", "low"]
Verification = Literal["verified", "partially_verified", "unverified"]


class Strict(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Source(Strict):
    title: str
    url: HttpUrl
    publisher: str
    kind: Literal["legislation", "tax_authority", "government", "intergovernmental", "professional", "other"]
    accessed: dt.date | None = None


class Money(Strict):
    amount: float = Field(ge=0)
    currency: str = Field(pattern=r"^[A-Z]{3}$")


class Bracket(Strict):
    """Marginal rate applied to the part of the base above ``from_amount`` (native currency)."""

    from_amount: float = Field(ge=0)
    rate: Rate


class MetricBase(Strict):
    status: Literal["researched", "not_researched"] = "researched"
    basis: Literal["law_in_force", "pro_forma_draft"] = Field(
        "law_in_force",
        description="'pro_forma_draft' = a published draft scored as if enacted, by explicit editorial decision; say why in summary")
    summary: str = Field(min_length=10)
    exemptions_thresholds: str = ""
    eligibility_conditions: str = ""
    regional_differences: str = ""
    important_exceptions: str = ""
    tax_year: str = Field(pattern=r"^\d{4}(/\d{2,4})?$")
    sources: list[Source] = Field(min_length=1)
    verified_on: dt.date
    confidence: Confidence
    verification: Verification
    open_questions: list[str] = []


class CapitalGainsRates(Strict):
    """Effective top-end rates for a large gain realised by a resident private investor."""

    listed_securities_domestic: Rate | None
    listed_securities_foreign: Rate | None
    private_business_sale: Rate | None
    real_estate_local: Rate | None
    real_estate_foreign: Rate | None = None


class CapitalGains(MetricBase):
    headline_rate: Rate | None
    rates: CapitalGainsRates
    rate_basis: str = Field(min_length=10, description="How the rates were derived (marginal top rate, holding period assumed, ...)")
    professional_trader: str = ""
    holding_period_rules: str = ""
    foreign_assets: str = ""


class Dividends(MetricBase):
    headline_rate: Rate | None
    domestic_rate: Rate | None = Field(description="Residence-country tax on dividends from domestic companies")
    foreign_gross_rate: Rate | None = Field(description="Residence-country rate on foreign dividends before any credit")
    foreign_tax_credit: Literal["credit", "exemption", "none", "not_applicable"]
    rate_basis: str = Field(min_length=10)
    withholding_outbound: str = Field("", description="WHT this country levies on dividends paid OUT by its companies")
    treaty_network: str = ""
    holding_company_notes: str = ""


class WealthComponent(Strict):
    name: str
    base: Literal[
        "net_wealth_worldwide",
        "net_wealth_local",
        "financial_assets_all",
        "financial_assets_foreign",
        "securities_accounts",
        "real_estate_local",
        "real_estate_foreign",
        "real_estate_all",
    ]
    exempt_amount: float = Field(0, ge=0, description="Allowance deducted from the base before brackets")
    entry_threshold: float = Field(0, ge=0, description="Tax applies only if base exceeds this (cliff), native currency")
    brackets: list[Bracket] = Field(min_length=1)
    bracket_mode: Literal["marginal", "whole_amount"] = "marginal"
    notes: str = ""


class WealthTax(MetricBase):
    type: Literal["none", "limited", "broad"]
    components: list[WealthComponent] = []
    property_tax_note: str = Field("", description="Ordinary municipal/property taxes, kept separate from wealth tax")

    @model_validator(mode="after")
    def _components_match_type(self) -> WealthTax:
        if self.type == "none" and self.components:
            raise ValueError("wealth_tax.type 'none' must have no components")
        if self.type != "none" and not self.components:
            raise ValueError("a limited/broad wealth tax needs at least one component")
        return self


class Inheritance(MetricBase):
    basis: Literal["none", "beneficiary", "estate"]
    children_treatment: Literal["fully_exempt", "exempt_with_conditions", "taxed_low", "taxed"]
    exemption: float = Field(0, ge=0, description="Per child (beneficiary basis) or per estate (estate basis), native currency")
    brackets: list[Bracket] = Field(description="Applied to the taxable amount above the exemption; [] when untaxed")
    bracket_mode: Literal["marginal", "whole_amount"] = Field(
        "marginal",
        description="'whole_amount' when the rate of the band reached applies to the entire taxable amount (e.g. Germany)",
    )
    other_transfer_cost_rate: Rate = Field(0, description="Unavoidable registration/stamp/probate cost as a share of value")
    scope: Literal["worldwide", "local_assets_only"] = Field(
        "worldwide",
        description="'local_assets_only' when only assets situated in the jurisdiction are taxed for this family "
                    "(e.g. Greece Art. 5A foreign movables exempt, Bermuda situs-based estate duty)")
    deemed_disposal_rate: Rate = Field(
        0, description="Income/capital-gains tax charged on unrealised gains at death or gift (e.g. Canada), as a rate on the gain")
    gift_tax: str = Field(min_length=3)
    gifts_same_as_inheritance: bool
    lifetime_gift_tax_free_after_years: float | None = None
    business_relief: str = ""
    business_relief_covers_public_shares: bool = False
    foreign_assets: str = ""
    domicile_rules: str = ""

    @model_validator(mode="after")
    def _brackets_match_basis(self) -> Inheritance:
        if self.basis == "none" and self.brackets:
            raise ValueError("inheritance basis 'none' must have no brackets")
        if (self.status == "researched" and self.children_treatment in ("taxed", "taxed_low") and not self.brackets
                and not self.deemed_disposal_rate and not self.other_transfer_cost_rate):
            raise ValueError("a taxed inheritance needs brackets, a deemed_disposal_rate or a transfer cost; "
                             "if the rates are unknown, set status 'not_researched'")
        return self


class LumpSum(Strict):
    annual: Money
    covers: list[Literal["foreign_capital_gains", "foreign_dividends", "foreign_income_all", "wealth_tax_foreign", "domestic_income"]]
    notes: str = ""


class StructureTerms(Strict):
    """A holding vehicle (company, foundation, trust). The regime's metrics are then the
    structure-level taxes; these terms add what it costs to get money out and to run it."""

    entity: str = Field(description="e.g. 'vermögensverwaltende GmbH', 'Family investment company (Ltd)', 'Privatstiftung'")
    kind: Literal["company", "foundation", "trust", "partnership", "other"]
    payout_tax_rate: Rate | None = Field(description="Personal tax on distributions to resident individuals (incl. surcharges)")
    payout_notes: str = Field(min_length=10, description="How distributions/withdrawals are taxed; loans, capital repayments, etc.")
    annual_running_cost: Money | None = Field(None, description="Typical annual cost (accounting, audit, directors, minimum taxes)")
    setup_cost: Money | None = None
    substance_and_anti_avoidance: str = Field(
        min_length=10, description="Substance needs, CFC/look-through/anti-abuse rules, trade-tax traps, passive-income rules")
    exit_and_liquidation: str = Field("", description="Tax on liquidation, emigration of shareholders, step-ups")
    sources: list[Source] = Field(min_length=1)


class Regime(Strict):
    id: str = Field(pattern=r"^[a-z0-9_]+$")
    name: str
    type: Literal["standard", "special", "structure"]
    description: str
    eligible_citizenships: list[Citizenship] = Field(min_length=1)
    eligibility: str = Field(min_length=10, description="Prior non-residence, investment, day counts, etc.")
    duration_years: float | None = Field(None, description="None = indefinite")
    requires_qualifying_activity: bool = Field(
        False, description="True when the regime needs employment, a directorship or another qualifying activity, "
                           "so a purely passive investor family cannot use it")
    duration_note: str = Field("", description="Required for a special regime with no duration: why it does not expire (or what ends it)")
    lump_sum: LumpSum | None = None
    structure: StructureTerms | None = None
    capital_gains: CapitalGains | None = None
    dividends: Dividends | None = None
    wealth_tax: WealthTax | None = None
    inheritance: Inheritance | None = None
    sources: list[Source] = []

    @model_validator(mode="after")
    def _structure_terms(self) -> Regime:
        if (self.type == "structure") != (self.structure is not None):
            raise ValueError("a 'structure' regime needs structure terms, and only it may have them")
        if self.type == "structure" and (self.capital_gains is None or self.dividends is None):
            raise ValueError("a structure regime must give its own capital_gains and dividends (structure-level rates)")
        return self


class ResidencyRoute(Strict):
    name: str
    citizenships: list[Citizenship]
    requirements: str
    minimum_investment: Money | None = None


class Residency(Strict):
    tax_residency_test: str
    routes: list[ResidencyRoute] = []
    sources: list[Source] = []


class Corporate(Strict):
    cit_rate: Rate | None
    summary: str
    special_zones: str = ""
    sources: list[Source] = []


class CostItem(Strict):
    value: Money
    year: int
    description: str
    source: Source


class CostOfLiving(Strict):
    city: str
    prime_rent_monthly: CostItem | None = Field(None, description="4-5 bedroom family home, prime area")
    prime_price_per_m2: CostItem | None = None
    intl_school_annual_fee: CostItem | None = Field(None, description="Leading international school, secondary, per child")
    family_health_insurance_annual: CostItem | None = None
    housekeeper_monthly: CostItem | None = None
    notes: str = ""


class IndicatorOverride(Strict):
    value: float
    year: int
    source: Source
    notes: str = ""


class Marker(Strict):
    name: str
    lon: float = Field(ge=-180, le=180)
    lat: float = Field(ge=-90, le=90)
    kind: Literal["capital", "city", "financial_centre", "region"]
    coordinate_source: str


INDICATOR_KEYS = {
    "homicide_rate", "wgi_pv", "wgi_ge", "wgi_rq", "wgi_rl", "wgi_cc", "wgi_va", "cpi",
    "hdi", "life_expectancy", "uhc_index", "learning_outcomes", "pisa", "gdp_pc_ppp",
    "internet_users", "lpi", "english_epi", "migrant_share", "price_level_ratio",
}


class Jurisdiction(Strict):
    id: str = Field(pattern=r"^[A-Z]{3}$")
    name: str
    continent: Literal["Europe", "Asia", "Middle East", "Africa", "North America", "Caribbean", "Central America", "South America", "Oceania"]
    region: str
    currency: str = Field(pattern=r"^[A-Z]{3}$")
    researched_on: dt.date
    summary: str = Field(min_length=40)
    regimes: list[Regime] = Field(min_length=1)
    residency: Residency
    corporate: Corporate
    cost_of_living: CostOfLiving | None = None
    indicator_overrides: dict[str, IndicatorOverride] = {}
    markers: list[Marker] = []
    us_citizen_notes: str = ""
    open_questions: list[str] = []

    @field_validator("indicator_overrides")
    @classmethod
    def _known_indicators(cls, v: dict[str, IndicatorOverride]) -> dict[str, IndicatorOverride]:
        unknown = set(v) - INDICATOR_KEYS
        if unknown:
            raise ValueError(f"unknown indicator keys {sorted(unknown)}; allowed: {sorted(INDICATOR_KEYS)}")
        return v

    @model_validator(mode="after")
    def _standard_regime_complete(self) -> Jurisdiction:
        std = [r for r in self.regimes if r.type == "standard"]
        if len(std) != 1 or self.regimes[0].type != "standard":
            raise ValueError("the first regime must be the single 'standard' regime")
        s = std[0]
        missing = [m for m in ("capital_gains", "dividends", "wealth_tax", "inheritance") if getattr(s, m) is None]
        if missing:
            raise ValueError(f"standard regime must define all four tax metrics; missing {missing}")
        ids = [r.id for r in self.regimes]
        if len(ids) != len(set(ids)):
            raise ValueError("regime ids must be unique")
        return self


class RegimeOverride(Strict):
    """Partial regime for a subnational unit. Only the metrics given replace the parent's."""

    name: str | None = None
    description: str | None = None
    eligibility: str | None = None
    available: bool = Field(True, description="False removes this parent regime in the unit (e.g. no lump-sum taxation in Zurich)")
    lump_sum: LumpSum | None = None
    capital_gains: CapitalGains | None = None
    dividends: Dividends | None = None
    wealth_tax: WealthTax | None = None
    inheritance: Inheritance | None = None
    sources: list[Source] = []


class SubnationalUnit(Strict):
    """A region whose rules override the national file. Unset fields inherit from the parent."""

    code: str = Field(pattern=r"^[A-Z]{2}-[A-Z0-9]{1,3}$", description="ISO 3166-2 code")
    name: str
    summary: str = Field(min_length=20)
    regime_overrides: dict[str, RegimeOverride] = Field(
        {}, description="Keyed by parent regime id; the given metrics replace the parent's"
    )
    cost_of_living: CostOfLiving | None = None
    markers: list[Marker] = []
    open_questions: list[str] = []


class Subnational(Strict):
    parent: str = Field(pattern=r"^[A-Z]{3}$")
    unit_type: str
    researched_on: dt.date
    notes: str = ""
    units: list[SubnationalUnit] = Field(min_length=1)

    @model_validator(mode="after")
    def _unique_codes(self) -> Subnational:
        codes = [u.code for u in self.units]
        if len(codes) != len(set(codes)):
            raise ValueError("duplicate subnational codes")
        return self


# ---------------------------------------------------------------------------------------------
# Earned income (Expat and Digital nomad personas): data/income/<ISO3>.json
# ---------------------------------------------------------------------------------------------

class EmploymentDeduction(Strict):
    """Standard deduction for employees' work expenses, taken from gross pay before the brackets.

    deduction = clamp(base + marginal schedule applied to gross pay, minimum, maximum), never more than pay.
    A flat percentage is a one-step schedule; a fixed amount is schedule [{0, 0}] with minimum = the amount."""

    schedule: list[Bracket] = Field(min_length=1, description="Marginal rates on gross pay (local currency)")
    base: float = Field(0, ge=0)
    minimum: float = Field(0, ge=0)
    maximum: float | None = Field(None, ge=0)
    note: str = Field(min_length=10)
    source: Source


class IncomeTax(Strict):
    """Resident individual taxation of employment and self-employment income (tax year 2026)."""

    summary: str = Field(min_length=20)
    tax_year: str = Field(pattern=r"^\d{4}(/\d{2,4})?$")
    brackets: list[Bracket] = Field(
        min_length=1, description="Marginal income tax on taxable income, national plus typical local/municipal surtax "
                                  "for the main city combined (local currency). Use [{from_amount: 0, rate: 0}] for no tax.")
    personal_allowance: float = Field(0, ge=0, description="Amount deducted before the brackets (standard deduction, basic allowance)")
    employment_deduction: EmploymentDeduction | None = Field(
        None, description="Employees only: standard work-expense deduction (e.g. Belgium 30% to a cap, Japan's employment "
                          "income deduction). Only where it reduces the same base as the brackets")
    self_employed_brackets: list[Bracket] | None = Field(
        None, description="Only when self-employment income is taxed on a different scale from wages (e.g. a business "
                          "tax on sole traders where wages are untaxed, or a levy on wages only); null = same brackets")
    employee_social_security_rate: Rate = Field(description="Employee's own social security/health contributions")
    employee_social_security_cap: float | None = Field(None, ge=0, description="Annual income ceiling for those contributions; null = uncapped")
    self_employed_social_security_rate: Rate
    self_employed_social_security_cap: float | None = Field(None, ge=0)
    self_employed_notes: str = Field("", description="Flat-rate/simplified regimes, deemed-expense rules, minimum contributions")
    social_security_deductible: float | None = Field(
        None, ge=0, le=1, description="Share of the individual's own social security contributions deducted from taxable "
                                      "income before the brackets (1 = fully deductible, 0 = not deductible, e.g. 0.5 if "
                                      "only the pension part is); null = not yet researched (treated as 0)")
    local_tax_note: str = ""
    sources: list[Source] = Field(min_length=1)
    verified_on: dt.date
    confidence: Confidence
    verification: Verification
    open_questions: list[str] = []


class EarnedIncomeRegime(Strict):
    """A digital-nomad visa or expat/impatriate regime that changes how earned income is taxed."""

    id: str = Field(pattern=r"^[a-z0-9_]+$")
    name: str
    kind: Literal["digital_nomad_visa", "expat_regime", "other"]
    description: str = Field(min_length=20)
    eligible_citizenships: list[Citizenship] = Field(min_length=1)
    applies_to: list[Literal["employment", "self_employment"]] = Field(min_length=1)
    requires_foreign_income: bool = Field(description="Income must come from foreign employers/clients (typical for nomad visas)")
    requires_local_employment: bool = Field(description="Needs a local employer or local assignment (typical for expat regimes)")
    min_income: Money | None = Field(None, description="Minimum ANNUAL gross income to qualify (convert monthly thresholds x12)")
    max_income: Money | None = Field(None, description="Income above which the regime stops applying, if any "
                                                      "(flat_rate: the excess is taxed normally; partial_exemption: the "
                                                      "exempt share applies only up to this amount)")
    duration_years: float | None = Field(description="Realistic maximum duration incl. renewals; null only if genuinely open-ended")
    duration_note: str = ""
    treatment: Literal["exempt", "flat_rate", "partial_exemption", "standard"] = Field(
        description="exempt = no local income tax on the qualifying income; flat_rate = flat_rate on it; partial_exemption = "
                    "exempt_share of it is tax-free and the rest taxed at normal rates; standard = no tax change (visa only)")
    flat_rate: Rate | None = None
    exempt_share: Rate | None = None
    exemption_threshold: Money | None = Field(
        None, description="partial_exemption only: exempt_share applies just to the income above this annual amount "
                          "(e.g. Taiwan Gold Card: 50% of salary above TWD 3M); null = to all qualifying income")
    covers_local_work: bool | None = Field(
        None, description="Whether the relief covers pay for work physically performed in the country, e.g. a remote "
                          "worker's fees from foreign clients earned while living there. Most foreign-income and "
                          "territorial exemptions do NOT (such work is locally sourced). null = not established; "
                          "required true for a requires_foreign_income regime to be counted in the scores")
    social_security_applies: bool = Field(description="Whether local social security contributions are still due")
    sources: list[Source] = Field(min_length=1)
    confidence: Confidence
    verification: Verification
    open_questions: list[str] = []

    @model_validator(mode="after")
    def _treatment_fields(self) -> EarnedIncomeRegime:
        if self.treatment == "flat_rate" and self.flat_rate is None:
            raise ValueError("flat_rate treatment needs flat_rate")
        if self.treatment == "partial_exemption" and self.exempt_share is None:
            raise ValueError("partial_exemption treatment needs exempt_share")
        return self


class PersonaCosts(Strict):
    """Living costs for a single professional or a couple, in the city they would most likely live in."""

    city: str
    rent_1bed_monthly: CostItem | None = Field(None, description="Furnished or unfurnished 1-bedroom, city centre/popular expat area")
    rent_2bed_monthly: CostItem | None = Field(None, description="2-bedroom, city centre/popular expat area")
    coworking_monthly: CostItem | None = None
    notes: str = ""


class IncomeFile(Strict):
    id: str = Field(pattern=r"^[A-Z]{3}$")
    name: str
    currency: str = Field(pattern=r"^[A-Z]{3}$")
    researched_on: dt.date
    income_tax: IncomeTax
    regimes: list[EarnedIncomeRegime] = []
    costs: PersonaCosts | None = None
    residence_routes: str = Field(min_length=20, description="How a remote worker / skilled expat gets the right to live (and work) there, per citizenship group")
    open_questions: list[str] = []
