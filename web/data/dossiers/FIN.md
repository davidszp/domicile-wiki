# Finland — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary
Capital gains are taxed at 34% at the top. Listed dividends are taxed at an effective 28.9%. There is no wealth tax. Inheritance tax per child: nothing below EUR 30,000 (from 2026), then 7% to 19% on the whole share, so about 18.6% on a EUR 10m share. Finland is an EU member with no special regime for wealthy arrivals.

## Residence and eligibility
A person is resident with a permanent home or habitual abode in Finland, or after more than 6 months' continuous stay. Finnish nationals stay resident for 3 calendar years after leaving unless they prove they have no essential ties (PwC). EU citizens use free movement (registration after 3 months). Others need a residence permit on another basis (work, entrepreneur, start-up, family). There is no investor visa. Migri could not be fetched automatically, so these permit details are unverified.

## Capital gains
Capital income tax is 30% up to EUR 30,000 and 34% above (Vero, "Selling shares"; PwC). There is no holding-period relief on the rate. A deemed acquisition cost of 20% of the price (40% after 10 years) can replace the actual cost. Sales totalling EUR 1,000 or less a year are exempt. A main home used for 2 years is exempt. Losses carry forward 5 years. JSON: 0.34 for all categories (the statutory marginal rate on the gain). There is no exit tax for individuals. 2026 change: earn-out gains are now taxed in the year the amount is confirmed. A business-scale trader can be taxed partly as earned income (top marginal rate about 52%).

## Dividends
For listed companies, 85% of the dividend is taxable at 30%/34%, so JSON 0.289 = 0.85 x 0.34. For unlisted companies, 25% is taxable on the part within an 8% return on net asset value up to EUR 150,000. Above that, within the 8% return, 85% is taxable. Above the 8% return, 75% is taxable as earned income. Foreign dividends get the same treatment if paid from the EU/EEA or a treaty country, which includes the US; foreign WHT is credited up to the treaty rate (Vero, "Foreign dividends"). Dividends from non-treaty, non-EEA countries are taxed in full as earned income. Outbound WHT is 30%/35% to non-resident individuals and 20% to non-resident companies. PwC lists about 76 treaty partners.

## Inheritance and gifts to children
Inheritance tax is charged per heir, and the 2026 tables apply to deaths from 1 January 2026 (Vero inheritance tax calculator). Children (bracket 1) pay nothing below EUR 30,000. Above it, tax starts at EUR 100 + 7% of the excess over 30,000. The base amount is EUR 800 at 40,000 (+10%), EUR 2,800 at 60,000 (+13%), EUR 21,000 at 200,000 (+16%) and EUR 149,000 at 1,000,000 (+19%). JSON: marginal brackets from 30,000, bracket_mode marginal (checked: 100 + 0.07 x 10,000 = 800, and so on), with the flat EUR 100 omitted.

Gifts from one donor are added up over 3 years. They are exempt below EUR 7,500 (EUR 5,000 before 2026), and rates run from 8% to 17%. Gifts made within 3 years before death are added to the inheritance. The tax reaches worldwide assets if the deceased or the heir was resident; Finnish real estate is always taxable. Generational business relief exists but does not cover listed portfolios.

## Wealth tax
None (abolished 2006; PwC). Municipal real estate tax is 0.41%–2.00%. Transfer tax is 3% on real property and 1.5% on unlisted securities; listed securities are generally exempt.

## Special regimes
None relevant. The 25% tax-at-source regime for key employees applies to earned income only.

## Holding structures

**Structure modelled: family investment company (osakeyhtiö, Oy), regime id `holding_oy`.**

- **Company level:** an unlisted Oy pays the 20% corporate rate (2026) on gains on portfolio shares; the
  participation exemption needs a 10% fixed-asset holding kept for one year. Dividends from listed companies in
  which an unlisted company holds less than 10% are 100% taxable, and dividends from outside the EU/EEA are fully
  taxable too, so portfolio dividends also bear **20%**, with credit for foreign withholding (PwC, Corporate income
  determination, reviewed September 2026). Compare 34% on gains and 28.9% on listed dividends personally.
- **JSON (structure-level):** gains 0.2 on all classes (private business conservatively 0.2; exempt only if the
  participation-exemption conditions are met); dividends 0.2 domestic and foreign with credit.
- **Payout:** dividends from an unlisted company (Vero, "Dividend from an unlisted company", updated 1 January
  2026): within an 8% return on the shares' mathematical value (net assets per the previous year's balance sheet),
  25% is taxable capital income up to EUR 150,000 per shareholder a year (7.5% effective) and 85% above; above the
  8% return, 75% is taxable earned income. The limit is per shareholder across all unlisted companies.
  `payout_tax_rate` **0.13** = EUR 400,000 split between two parents: each EUR 200,000 gives EUR 37,500 + 42,500 =
  EUR 80,000 taxable, taxed 30% to EUR 30,000 and 34% above = EUR 26,000 each, EUR 52,000 in all. Adult children as
  shareholders lower this further. The 8% limit needs book net assets of at least EUR 5m.
- **Wealth tax:** none in Finland. **Inheritance:** the Oy shares are inherited at fair value under the ordinary
  rates (inherited from standard); generational business relief does not cover investment companies.
- **Anti-avoidance and running:** general anti-avoidance rule (Act on Assessment Procedure § 28); hidden profit
  distributions are taxed as dividends or earned income; repayment from the invested unrestricted equity fund of an
  unlisted company is taxed as a dividend. Running and set-up costs not sourced (omitted).
- **Getting assets in:** contributing an existing portfolio is a taxable sale for the individual at 30/34% and Finland
  gives no step-up on immigration.
- **Exit and liquidation:** no exit tax for individuals (Finnish nationals keep a 3-year residence tail). Liquidation
  proceeds are a capital gain for the shareholder at 30/34%. Dividends paid after emigration bear withholding.
- **Pending:** HE 151/2026 would cut the corporate rate to 18% from 2027 (not confirmed enacted). A VATT/Etla study
  proposes reworking the unlisted-dividend relief; no bill found.
- **US citizens:** excluded (US CFC/PFIC rules).
- **Unverified:** participation-exemption treatment of a private business stake in a passive holding's income
  source; audit thresholds; inheritance valuation of the Oy shares (deferred tax on latent gains).

## Company taxation (kept separate from personal tax)
CIT is 20%. Government proposal HE 151/2026 would cut it to 18% from 2027 (and corporate WHT to 18%), with loss carry-forward extended to 25 years. Enactment was not confirmed as of 2026-10-15.

## Cost of living notes

City: Helsinki.

- **Prime rent (monthly):** 2,490 EUR (2026). Median asking rent of the 5 whole houses with 5+ rooms and 4 bedrooms for rent in Helsinki and Espoo on Qasa on 2026-10-15 (EUR 1,890-3,450; room lets excluded). Very thin sample, not limited to prime districts, so it probably understates a prime family house (e.g. Kulosaari, Westend). Source: [Qasa - houses for rent, Helsinki](https://qasa.com/fi/en/find-home?homeTypes=house&minRoomCount=5&searchAreas=Helsinki%7E%7Efi).
- **International school fee (annual, per child):** 16,608 EUR (2026). International School of Helsinki, grades 11-12 (IB Diploma), basic + supplementary tuition 2026-2027, annual payment. Entry and other fees extra. Source: [ISH Summary of Annual Fees 2026-2027](https://ishelsinki.fi/wp-content/uploads/2026/04/Fee-summary-2026-2027-website.pdf).
- Health insurance, housekeeper and price per m² not sourced. Vuokraovi and Oikotie listings could not be read automatically (scripted pages).

## Open questions
- Whether HE 151/2026 (CIT 18%) has passed.
- The additional inheritance deduction for minor children in 2026.
- Whether the 3-year residence tail applies to inheritance and gift tax.
- The equity savings account cap.
- Cost-of-living items.

## Sources
- Finland - Individual - Income determination, PwC: https://taxsummaries.pwc.com/finland/individual/income-determination
- Finland - Individual - Other taxes, PwC: https://taxsummaries.pwc.com/finland/individual/other-taxes
- Finland - Individual - Residence, PwC: https://taxsummaries.pwc.com/finland/individual/residence
- Finland - Individual - Significant developments, PwC: https://taxsummaries.pwc.com/finland/individual/significant-developments
- Finland - Corporate - Withholding taxes, PwC: https://taxsummaries.pwc.com/finland/corporate/withholding-taxes
- Finland - Corporate - Taxes on corporate income, PwC: https://taxsummaries.pwc.com/finland/corporate/taxes-on-corporate-income
- Selling shares, Vero: https://www.vero.fi/en/individuals/property/investments/selling-shares/
- Foreign dividends, Vero: https://www.vero.fi/en/individuals/property/investments/dividends/foreign-dividends/
- Inheritance tax calculator, Vero: https://www.vero.fi/en/individuals/property/inheritance/inheritance-tax-calculator/
- Gift tax calculator, Vero: https://www.vero.fi/en/individuals/property/gifts/gift-tax-calculator/
- Government proposes CIT 18%, Vero: https://www.vero.fi/en/About-us/newsroom/news/uutiset/2026/the-government-proposes-to-lower-the-corporate-income-tax-rate-to-18-and-to-extend-the-deduction-period-for-business-losses/
- Finland: Tax measures in draft budget for 2027, KPMG: https://kpmg.com/us/en/taxnewsflash/news/2026/08/tnf-finland-tax-measures-in-draft-budget-for-2027.html
- ISH Summary of Annual Fees 2026-2027: https://ishelsinki.fi/wp-content/uploads/2026/04/Fee-summary-2026-2027-website.pdf
- [Qasa - houses for rent, Helsinki](https://qasa.com/fi/en/find-home?homeTypes=house&minRoomCount=5&searchAreas=Helsinki%7E%7Efi)
- Finland - Corporate - Income determination, PwC: https://taxsummaries.pwc.com/finland/corporate/income-determination
- Dividend from an unlisted company, Vero: https://vero.fi/en/individuals/property/investments/dividends/dividend-from-an-unlisted-company/

## Change log
- 2026-10-15: initial research.
- 2026-10-15: data-quality pass: added prime rent (Qasa, Helsinki/Espoo 4-bedroom houses, EUR 2,490/month; thin sample).
- 2026-10-15: added the family investment Oy structure regime (`holding_oy`) and the Holding structures section; standard holding_company_notes updated.
