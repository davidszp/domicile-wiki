# Spain (regions) — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Covers all 17 autonomous communities and the autonomous cities of Ceuta and Melilla (`data/subnational/ESP.json`). The common-regime regions can change the wealth-tax allowance, scale and rebates and almost every inheritance/gift parameter, but not the savings-income scale: capital gains and dividends are taxed at 19%-30% everywhere except Navarra and the Basque Country, which run their own IRPF (top savings rate 28%). The main source is the Ministry of Finance's "Tributación Autonómica. Medidas 2026" (chapters I and IV, updated 23 September 2026), which reproduces each region's 2026 scales, allowances and rebates with legal references; the foral systems were checked against Navarra's and Bizkaia's official texts (Navarra's 2026 savings and wealth scales against the consolidated DFL 4/2008 and LF 13/1992 on navarra.es).

| Code | Region | Top CGT/dividends | Wealth tax (JSON: tax-free amount; top marginal rate) | Inheritance to a child 21+ |
|---|---|---|---|---|
| ES-MD | Comunidad de Madrid | 30% | tax-free to 3,700,000; top 3.50% | taxed_low; exemption 16,000 |
| ES-AN | Andalucía | 30% | tax-free to 3,700,000; top 3.50% | taxed_low; exemption 1,000,000 |
| ES-RI | La Rioja | 30% | tax-free to 3,700,000; top 3.50% | taxed_low; exemption 15,957 |
| ES-MC | Región de Murcia | 30% | tax-free to 3,700,000; top 3.50% | taxed_low; exemption 15,957 |
| ES-CB | Cantabria | 30% | tax-free to 3,700,000; top 3.50% | exempt_with_conditions; exemption 0 |
| ES-EX | Extremadura | 30% | tax-free to 3,700,000; top 3.50% | taxed_low; exemption 500,000 |
| ES-CT | Cataluña | 30% | tax-free to 500,000; top 3.50% | taxed; exemption 100,000 |
| ES-GA | Galicia | 30% | tax-free to 700,000; top 3.50% | taxed; exemption 1,000,000 |
| ES-AS | Principado de Asturias | 30% | tax-free to 700,000; top 3.50% | taxed; exemption 300,000 |
| ES-VC | Comunitat Valenciana | 30% | tax-free to 2,000,000; top 3.50% | taxed_low; exemption 100,000 |
| ES-IB | Illes Balears | 30% | tax-free to 3,000,000; top 3.50% | exempt_with_conditions; exemption 0 |
| ES-AR | Aragón | 30% | state rules | taxed; exemption 500,000 |
| ES-CN | Canarias | 30% | state rules | taxed_low; exemption 23,125 |
| ES-CL | Castilla y León | 30% | state rules | taxed_low; exemption 400,000 |
| ES-CM | Castilla-La Mancha | 30% | state rules | taxed; exemption 15,957 |
| ES-CE | Ceuta | 30% | state rules | taxed_low; exemption 15,957 |
| ES-ML | Melilla | 30% | state rules | taxed_low; exemption 15,957 |
| ES-NC | Comunidad Foral de Navarra | 28% | tax-free to 550,000; top 3.50% | taxed; exemption 250,000 |
| ES-PV | País Vasco / Euskadi | 28% | tax-free to 800,000; top 3.50% | taxed_low; exemption 400,000 |

## Residence and eligibility

- Common regime: the region of residence is where most days are spent in the tax year (IRPF, IP) or, for ISD, where the deceased (or the donee, for gifts of movables) spent most days of the previous 5 years (art. 28 Ley 22/2009). Days abroad count for no region. Non-resident heirs may use the rules of the deceased's region (DA 2ª Ley 29/1987).
- Navarra: Navarra taxes inheritances when the deceased was habitually resident there (art. 31 Convenio Económico, Ley 28/1990); IRPF and IP follow IRPF residence (art. 17).
- Basque Country: foral wealth tax follows IRPF residence (art. 24 Concierto, Ley 12/2002). Foral ISD applies when the deceased (inheritance) or donee (gift) is resident there, but common-regime rules apply instead if that person spent more days of the last 5 years in common-regime Spain (art. 25.Dos). Years abroad do not trigger this, so a family arriving from abroad gets the foral rules at once.

## Capital gains

Common regime (15 communities, Ceuta, Melilla): no regional difference; national 19%-30% savings scale (arts. 66, 76 LIRPF). JSON: no override.

- Navarra (ES-NC): own scale 20% to EUR 6,000; 22% to 10,000; 24% to 15,000; 26% to 200,000; 27% to 300,000; 28% above (art. 60 DFL 4/2008 as worded by Ley Foral 36/2022 from 1 January 2023; the consolidated text on navarra.es, which already includes Ley Foral 17/2025, shows no later change, so this is the 2026 scale). JSON override: all rates 0.28; confidence high.
- Basque Country (ES-PV), modelled on Bizkaia: art. 76 NF 13/2013 (text at 01/01/2026): 19% to EUR 7,500; 20% to 15,000; 22% to 30,000; 24% to 50,000; 25.5% to 90,000; 26% to 120,000; 26.5% to 240,000; 27% to 300,000; 28% above. JSON override: 0.28. Álava (NF 3/2025) and Gipuzkoa (NF 1/2025) adopted the same 19%-28% scale from 1 January 2026 (Cuatrecasas Legal Flash, May 2025, which tabulates the old and new scales), so the override holds for the whole Basque Country; confidence high.

## Dividends

Same as capital gains: national 30% top rate in the common regime; 28% top in Navarra and in all three Basque territories (JSON overrides with `foreign_tax_credit` credit).

## Inheritance and gifts to children

How the JSON was built: brackets = the region's scale multiplied by (1 - rebate), applied above the region's parent-child reduction (`exemption`), multiplier 1.0 (heir's own pre-existing wealth under about EUR 400,000; richer heirs pay up to 20% more where state-style multipliers apply). Catalonia's rebate is a weighted average of a sliding table over the taxable base, so its brackets are a piecewise-linear fit, exact at the rebate band edges. Castilla-La Mancha's rebate is a band cliff on the whole base; the 80% band (bases of EUR 300,000+) is encoded. Cantabria and Illes Balears rebate 100% and are coded `exempt_with_conditions` with no brackets. Navarra's scale starts at 0% to EUR 250,000, encoded as `exemption` 250,000.

- **Comunidad de Madrid (ES-MD)**: Madrid: 99% rebate for children on inheritances and gifts; about 0.33% of a EUR 10m inheritance. Gifts: Gifts to children: 99% rebate if in a public document when the base exceeds EUR 10,000 and, for cash, with the origin of funds stated; Madrid scale 7.65%-34% before rebate.
- **Andalucía (ES-AN)**: Andalucía: EUR 1m reduction per child and 99% rebate; about 0.23% of a EUR 10m inheritance. Gifts: Gifts to children: 99% rebate (art. 40 Ley 5/2021) if formalised in a public document with simultaneous delivery when above EUR 5,000; cash gifts need the origin of funds stated; no EUR 1m reduction for gifts.
- **La Rioja (ES-RI)**: La Rioja: 99% deduction for children on inheritances and gifts; about 0.33% of a EUR 10m inheritance. Gifts: Gifts to children: 99% deduction if in a notarial document (cash by bank transfer with a private document stating the origin of funds also accepted).
- **Región de Murcia (ES-MC)**: Murcia: 99% deduction for children; about 0.36% of a EUR 10m inheritance. Gifts: Gifts to Groups I-III: 99% deduction if in a public document and the origin of funds is justified.
- **Cantabria (ES-CB)**: Cantabria: 100% rebate of the tax for children and spouses on inheritances and on gifts (since 2019/2024). Gifts: Gifts to children: 100% rebate (art. 8.3 D.Leg. 62/2008).
- **Extremadura (ES-EX)**: Extremadura: EUR 500,000 reduction and 99% rebate for children's inheritances; about 0.32% of a EUR 10m inheritance. Gifts above EUR 600,000 get no rebate on the excess. Gifts: Gifts to children: 99% rebate up to EUR 300,000 of base, 50% on the part from EUR 300,000 to 600,000, nothing above: a large gift is taxed at up to 34% (state scale).
- **Cataluña (ES-CT)**: Catalonia: children 21+ get EUR 100,000 reduction, scale 7%-32%, and a rebate that falls from 60% (first EUR 100,000 of base) to 0% (above EUR 3m) as a weighted average; about 27.99% of a EUR 10m inheritance. Gifts: Gifts to children: special scale 5% to EUR 200,000, 7% to EUR 600,000, 9% above, if in a public deed (Libro sexto art. 633-2); about 8.8% on a EUR 10m gift. No gift rebate.
- **Galicia (ES-GA)**: Galicia: EUR 1,000,000 reduction per child, then 5%-18%; no rebate for Group II; about 15.30% of a EUR 10m inheritance. Gifts: Gifts to children: scale 5% to EUR 200,000, 7% to EUR 600,000, 9% above if in a public deed (otherwise state scale); no EUR 1m reduction for gifts.
- **Principado de Asturias (ES-AS)**: Asturias: EUR 300,000 reduction per child, then a special Group I-II scale from 21.25% to 36.5% (above EUR 616,000); about 34.93% of a EUR 10m inheritance. Gifts: Gifts to children: 2%-36.5% scale (2% to EUR 150,000) only if in a public document and the donee's wealth is at most EUR 402,678; otherwise the general scale 7.65%-36.5%.
- **Comunitat Valenciana (ES-VC)**: Valencia: EUR 100,000 reduction and 99% rebate for children on inheritances and gifts (since 28/5/2023); about 0.33% of a EUR 10m inheritance. Gifts: Gifts to children: EUR 100,000 reduction and 99% rebate if in a public document; cash gifts must state the origin of funds.
- **Illes Balears (ES-IB)**: Illes Balears: 100% rebate for children and spouses on inheritances (since 18/7/2023) and 100% deduction on gifts (since 25/7/2025). Gifts: Gifts to children: 100% deduction of the tax if in a public deed; cash gifts must state the origin of funds; real estate must be declared at no more than the reference value + 20%.
- **Aragón (ES-AR)**: Aragón: children get a 100% reduction capped so that total reductions do not exceed EUR 500,000, then the state scale 7.65%-34%; no rebate for adult children; about 31.58% of a EUR 10m inheritance. Gifts: Gifts to children: 100% reduction up to EUR 100,000 per 5 years and a 99% rebate only while gifts in 5 years stay within EUR 500,000; large gifts pay the state scale.
- **Canarias (ES-CN)**: Canarias: children get a EUR 23,125 reduction and a 99.9% rebate on inheritances and gifts; about 0.03% of a EUR 10m inheritance. Gifts: Gifts to children: 99.9% rebate if in a public document.
- **Castilla y León (ES-CL)**: Castilla y León: reductions totalling EUR 400,000 per child and a 99% rebate; about 0.32% of a EUR 10m inheritance. Gifts: Gifts to children: 99% rebate if in a public document stating the origin of funds for cash.
- **Castilla-La Mancha (ES-CM)**: Castilla-La Mancha: rebate of 100% for a taxable base under EUR 175,000, falling to 80% at EUR 300,000 or more; state scale; about 6.64% of a EUR 10m inheritance. Gifts: Gifts to children: rebate 95% (base under EUR 120,000), 90% (under 240,000), 85% (240,000 or more) on the state scale: about 5% on a large gift.
- **Ceuta (ES-CE)**: Ceuta: state rules with a 99% rebate for Groups I-II when the deceased was habitually resident in Ceuta or Melilla on death and for the previous 5 years (art. 23 bis Ley 29/1987); about 0.33% of a EUR 10m inheritance. Gifts: Gifts of movable assets: 50% rebate when the donee is resident in Ceuta or Melilla (art. 23 bis.3); gifts otherwise on the state scale.
- **Melilla (ES-ML)**: Melilla: state rules with a 99% rebate for Groups I-II when the deceased was habitually resident in Ceuta or Melilla on death and for the previous 5 years (art. 23 bis Ley 29/1987); about 0.33% of a EUR 10m inheritance. Gifts: Gifts of movable assets: 50% rebate when the donee is resident in Ceuta or Melilla (art. 23 bis.3); gifts otherwise on the state scale.
- **Comunidad Foral de Navarra (ES-NC)**: Navarra: children (any age) pay 0% on the first EUR 250,000 of taxable base and then 2%, 4%, 8%, 12% and 16% above EUR 3m; about 13.53% of a EUR 10m inheritance. Gifts: Gifts to children: 0.8% to EUR 250,000, 2% to 500,000, 3% to 1m, 4% to 1.8m, 6% to 3m, 8% above (art. 34.1.a.4º): about 7.4% on a EUR 10m gift.
- **País Vasco / Euskadi (ES-PV)**: Basque Country: Group I (children of any age, spouse, parents) gets a EUR 400,000 reduction on inheritances and pays a flat 1.5% above it (Bizkaia NF 4/2015 arts. 43, 47; same in Gipuzkoa); about 1.44% of a EUR 10m inheritance. Gifts: Gifts to children: flat 1.5% on the whole gift (the EUR 400,000 reduction is only for inheritances).

**Surviving spouse:** the spouse is Group II under the state law (Ley 29/1987 art. 20), so the regional result mostly mirrors the children's. A 99% (or 100%) bonificación applies to spouses in Madrid, Andalucía, La Rioja, Murcia, Extremadura, Valencia, Castilla y León, Canarias (99.9%) and Ceuta/Melilla (residence condition), giving `taxed_low` (about 0.03%-0.4% of a EUR 35M estate); Cantabria and Illes Balears give 100% under conditions (`exempt_with_conditions`). Catalonia gives the spouse alone a 99% bonificación (art. 633-4.1), so `taxed_low` although children are `taxed`. Navarra taxes the spouse at 0% to EUR 250,000 then 0.8% (art. 34.1.a.1º), and the Basque Country (Bizkaia, Gipuzkoa; Álava not checked) at 1.5% above EUR 400,000. Galicia, Asturias and Aragón have no spouse bonificación and tax a large estate at about 17%, 36% and 33% (`taxed`). Castilla-La Mancha's 80% rebate leaves about 6.8% (`taxed_low` by the under-10% rule, although the children's field reads `taxed`).

## Wealth tax

How the JSON was built: one component per region on worldwide net wealth after the main-home exemption, whose brackets encode the actual combined burden max(regional IP after rebates, state ITSGF), computed from the official scales. In regions that rebate IP 100% (Madrid, Andalucía, La Rioja, Cantabria) or by the excess over the ITSGF (Murcia since 25/7/2025), the IP equals the ITSGF amount and is paid to the region, so nothing is due below about EUR 3.7m. Extremadura rebates 100% without such a clause, so the ITSGF is paid in full to the state. Galicia's 50% rebate is reduced by the ITSGF due, so the burden is max(half the IP, ITSGF). Regions where the IP is payable are topped up by the ITSGF only where it exceeds the IP. The joint IRPF+IP limit (60% of the IRPF base, IP cut by at most 80%) is ignored in the brackets. Regions without a JSON override (Aragón, Canarias, Castilla y León, Castilla-La Mancha, Ceuta, Melilla) use the state allowance and scale; Ceuta/Melilla's 75% rebate only covers assets located there.

- **Comunidad de Madrid (ES-MD)**: Madrid: the 100% IP rebate (since 2009) is replaced, while the ITSGF is in force, by a rebate equal to the excess of IP over ITSGF, so the IP paid equals the ITSGF amount and stays in Madrid. Result: no tax up to about EUR 3.7m of net wealth; above that the burden equals the ITSGF. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 22,100; EUR 10m: EUR 122,908; EUR 20m: EUR 453,364.
- **Andalucía (ES-AN)**: Andalucía: the 100% IP rebate (since 2022) is replaced, while the ITSGF is in force, by a rebate equal to the excess of IP over ITSGF (choice removed by Ley 7/2024 from 31/12/2024); the regional scale is suspended. Result: no tax up to about EUR 3.7m of net wealth; above that the burden equals the ITSGF. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 22,100; EUR 10m: EUR 122,908; EUR 20m: EUR 453,364.
- **La Rioja (ES-RI)**: La Rioja: the 100% IP rebate (from 2025, Ley 6/2024) is replaced, while the ITSGF is in force, by a rebate equal to the excess of IP over ITSGF. Result: no tax up to about EUR 3.7m of net wealth; above that the burden equals the ITSGF. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 22,100; EUR 10m: EUR 122,908; EUR 20m: EUR 453,364.
- **Región de Murcia (ES-MC)**: Murcia: there is no general rebate, but since 25/7/2025 (Ley 3/2025) a rebate equal to the excess of IP over ITSGF applies; with no ITSGF due, the whole IP is rebated. Result: no tax up to about EUR 3.7m of net wealth; above that the burden equals the ITSGF. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 22,100; EUR 10m: EUR 122,908; EUR 20m: EUR 453,364.
- **Cantabria (ES-CB)**: Cantabria: the 100% IP rebate (since 2024) does not apply when net wealth after the EUR 700,000 allowance exceeds EUR 3m while the ITSGF exists; a rebate equal to IP minus ITSGF applies instead. Result: no tax up to about EUR 3.7m of net wealth; above that the burden equals the ITSGF. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 22,100; EUR 10m: EUR 122,908; EUR 20m: EUR 453,364.
- **Extremadura (ES-EX)**: Extremadura: a general 100% IP rebate applies (since 2023); with no IP paid, the ITSGF is payable in full to the state. Result: no tax up to about EUR 3.7m of net wealth; above that the burden equals the ITSGF. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 22,100; EUR 10m: EUR 122,908; EUR 20m: EUR 453,364.
- **Cataluña (ES-CT)**: Catalonia: IP payable with a EUR 500,000 allowance and a regional scale 0.21%-2.75%, plus a 3.48% band above EUR 20m base while the ITSGF exists (Decreto-ley 10/2024). The ITSGF tops up only where it exceeds IP (roughly above EUR 17.5m). Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 59,794; EUR 10m: EUR 166,482; EUR 20m: EUR 453,364.
- **Galicia (ES-GA)**: Galicia: IP at the state scale (top band raised to 3.5% while the ITSGF exists) with a 50% rebate that is reduced by any ITSGF due, so the burden is the higher of half the IP and the ITSGF. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 26,773; EUR 10m: EUR 122,908; EUR 20m: EUR 453,364.
- **Principado de Asturias (ES-AS)**: Asturias: IP payable, regional scale 0.22%-3.0%, state EUR 700,000 allowance; ITSGF tops up above about EUR 23.9m. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 61,429; EUR 10m: EUR 180,085; EUR 20m: EUR 472,826.
- **Comunitat Valenciana (ES-VC)**: Comunitat Valenciana: IP allowance EUR 2,000,000 (Ley 5/2026, in force from 11/08/2026; EUR 1,000,000 from 31/12/2025), regional scale 0.25%-3.5%. The ITSGF (EUR 700,000 allowance) can exceed IP at some wealth levels; the brackets take the higher. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 39,166; EUR 10m: EUR 158,426; EUR 20m: EUR 484,702.
- **Illes Balears (ES-IB)**: Illes Balears: IP allowance EUR 3,000,000 (since 2024), regional scale 0.28%-3.45%. The ITSGF (EUR 700,000 allowance) exceeds the IP at many levels; the brackets take the higher of the two. Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 23,521; EUR 10m: EUR 145,445; EUR 20m: EUR 468,941.
- **Aragón (ES-AR)**: State rules (EUR 700,000 allowance, 0.2%-3.5%).
- **Canarias (ES-CN)**: State rules (EUR 700,000 allowance, 0.2%-3.5%).
- **Castilla y León (ES-CL)**: State rules (EUR 700,000 allowance, 0.2%-3.5%).
- **Castilla-La Mancha (ES-CM)**: State rules (EUR 700,000 allowance, 0.2%-3.5%).
- **Ceuta (ES-CE)**: State rules (EUR 700,000 allowance, 0.2%-3.5%).
- **Melilla (ES-ML)**: State rules (EUR 700,000 allowance, 0.2%-3.5%).
- **Comunidad Foral de Navarra (ES-NC)**: Navarra: own wealth tax, EUR 550,000 allowance (art. 28.1 LF 13/1992), 0.16%-2.0% and 3.5% above EUR 11,003,784.50 of base (in place of the ITSGF). The 2026 scale is DA 1ª LF 13/1992 'Escala del Impuesto sobre el Patrimonio en 2026', worded by Ley Foral 17/2025 (BON 31/12/2025): identical to 2022-2025. Tax on EUR 5m: EUR 45,964; EUR 10m: EUR 128,280; EUR 20m: EUR 453,364. Confidence high.
- **País Vasco / Euskadi (ES-PV)**: Basque Country (modelled on Bizkaia): own wealth tax, EUR 800,000 allowance, 0.2%-2.0%; the foral solidarity tax (NF 9/2023, 800,000 allowance, 1.5%-3.5%) tops it up only at the very top (about EUR 16.8m of net wealth and above). Combined IP+ITSGF on net wealth (after the main-home exemption) of EUR 5m: EUR 37,400; EUR 10m: EUR 119,400; EUR 20m: EUR 358,500.
  - Álava and Gipuzkoa (not modelled; secondary source Guía Fiscal, updated 29/07/2026): Álava has the same EUR 800,000 allowance and EUR 400,000 main-home exemption but its own 8-band scale up to 2.5%; Gipuzkoa has a EUR 700,000 allowance, a EUR 300,000 main-home exemption and a 2.5% top rate. Each territory has its own foral solidarity tax (Bizkaia NF 9/2023, Gipuzkoa NF 3/2023, Álava NF 23/2023) for net wealth above EUR 3m, credited against the foral IP. The band limits could not be checked officially: Gipuzkoa's Hacienda site returned HTTP 503 and araba.eus did not respond on 2026-10-15. Bizkaia therefore understates the burden for a family in Álava or Gipuzkoa at high wealth.

Announced or recent changes: Comunitat Valenciana raised the allowance from EUR 500,000 to 1m (31/12/2025) and then to EUR 2m (Ley 5/2026, from 11/08/2026); Murcia added its ITSGF-difference rebate from 25/7/2025; La Rioja reintroduced a 100% rebate from 2025; Cantabria 100% from 2024; Illes Balears EUR 3m allowance from 2024. Navarra's 3.5% band replacing the ITSGF was re-enacted for 2026 by Ley Foral 17/2025 (as for 2025 by LF 20/2024); it must be re-enacted each year.

## Special regimes

The state Beckham regime (art. 93 LIRPF) is available in all common-regime regions and the autonomous cities; regional wealth-tax rules may apply to the Spanish assets of regime taxpayers (not verified). It is marked `available: false` for Navarra and the Basque Country, which have their own impatriate regimes (not modelled; Navarra's regime for displaced workers is filed on Modelos 149/150 of Hacienda Foral).

## Company taxation (kept separate from personal tax)

Corporate tax is state-level in the common regime (25%). Navarra and the Basque territories have their own corporate tax rules (not researched here).

## Cost of living notes

Method for rent and price per m² (all cities): a snapshot of LuxuryEstate.com taken on 2026-10-15. Rent for Madrid, Barcelona, Marbella, Palma and Tenerife was replaced on 2026-10-15 by Fotocasa medians for 4+ bedroom homes of 160-300 m² in a named upper-middle district (the first 30 results; see the JSON descriptions); Valencia keeps its LuxuryEstate rent. Price per m² = LuxuryEstate.com for all cities. LuxuryEstate rent method: median asking rent of distinct listings with 4-6 bedrooms priced per month or with no period stated (duplicates with the same bedrooms, price and size removed). Price per m² = median asking price per m² over the first five sale result pages (EUR 500,000+, 80 m²+, offices and land excluded). These are portal asking prices skewed to the luxury end, not agency-report or transaction figures. Health insurance and housekeeper costs were not sourced anywhere.

| Code | City | Prime rent / month (n) | Price per m² (n) | School (annual, top secondary grade) |
|---|---|---|---|---|
| ES-MD | Madrid (Chamartín) | EUR 4,500 (13; Fotocasa, 4+ bedrooms, 160-300 m²) | EUR 7,816 (71) | Runnymede College EUR 23,700 (national file) |
| ES-CT | Barcelona (Sarrià-Sant Gervasi) | EUR 4,900 (17; Fotocasa, 4+ bedrooms, 160-300 m²) | EUR 9,810 (64) | Benjamin Franklin International School, High School 2026-27, EUR 21,720 (+ EUR 1,100 a year matriculation, EUR 6,000 one-off entrance) |
| ES-AN | Marbella (Nueva Andalucía and others) | EUR 6,900 (17; Fotocasa, 4+ bedrooms, 160-300 m²; seasonal lets not separated) | EUR 8,636 (73) | Sotogrande International School (about 45 km away), IB Diploma 2026-27, EUR 28,255 (+ EUR 550 registration, EUR 4,000 family membership) |
| ES-IB | Palma | EUR 3,800 (21; Fotocasa, 4+ bedrooms, 160-300 m²) | EUR 8,333 (71) | Bellver International College, Years 12-13 termly rate EUR 13,860 (table uploaded July 2026, year not printed) |
| ES-VC | Valencia | EUR 3,250 (37; province incl. Bétera, L'Eliana) | EUR 5,912 (62) | American School of Valencia, Grades 11-12 2026-27, EUR 9,862 (+ EUR 1,250 a year enrolment for non-shareholders) |
| ES-CN | Costa Adeje, Tenerife (school, price per m²); Santa Cruz de Tenerife (rent) | EUR 1,950 (8; Fotocasa, Santa Cruz, El Rosario, La Laguna, 4+ bedrooms, 160-300 m²) | EUR 7,811 (73, Adeje) | Wingate School, Seniors 2026-27, EUR 6,495 (Sixth Form charged per A level, about EUR 8,865 for three) |
| ES-PV | Bilbao (rent, school); San Sebastián (price per m²) | EUR 2,450 (16; Fotocasa, Bilbao long-term lets, 4+ rooms, 120 m²+) | EUR 7,617 (52) | Colegio Alemán de Bilbao (German School), classes 11-12 2026-27, EUR 7,550 (+ EUR 1,700 one-off enrolment) |

Tenerife's south-west coast was chosen over Las Palmas because that is where the prime villa market and the main British school are; its rent is now taken from Santa Cruz de Tenerife because the Adeje and Arona villa sample was a tourist-resort segment. Marbella's Aloha College site did not respond and Swans publishes no fee table, hence Sotogrande. Basque Country: rent comes from Fotocasa, not LuxuryEstate (which had almost no 4+ bedroom lets there): of 50 Bilbao listings with 4+ rooms on 2026-10-15, fixed-term 'alquiler de temporada' lets were dropped, leaving 25 long-term lets (median EUR 1,950); the 16 of 120 m²+ give EUR 2,450 (IQR 1,750-2,850). San Sebastián had only 3 long-term 4+ room lets. The American School of Bilbao website still did not resolve, so the German School Bilbao fee page is used (class 11: EUR 755 a month x 10; class 12: EUR 943.75 x 8; both EUR 7,550). Madrid (ES-MD) now carries the Runnymede College fee itself, copied from ESP.json with the same source.

Markers: Madrid, Barcelona, Málaga, Valencia, Palma, Pamplona and Bilbao (GeoNames coordinates); unchanged.

## Open questions

- Murcia's ITSGF-difference rebate is read (per the Ministry summary) as removing all IP when no ITSGF is due; confirm with the regional agency.
- Navarra impatriate regime (Modelos 149/150) not researched.
- Basque Country: the 2026 savings scale is the same in all three territories (Cuatrecasas). Wealth tax: only Bizkaia's is verified from official texts; Álava's and Gipuzkoa's band limits are still unverified (allowances and 2.5% top rates known only from Guía Fiscal; Gipuzkoa's site returned 503 and araba.eus did not respond on 2026-10-15). Álava's inheritance rules for descendants were not verified.
- Cost of living: the Basque Country's rent is a Bilbao portal sample (16 listings) while its price per m² is San Sebastián's; Marbella's rent sample (17 Fotocasa listings) does not separate seasonal lets; no health insurance or housekeeper figures anywhere.
- The ITSGF has no end date; if it is repealed, Madrid, Andalucía, La Rioja, Murcia, Cantabria and Extremadura return to zero wealth tax, Galicia to a 50% rebate.
- Newly arrived families: whether a deceased parent who lived abroad for part of the previous 5 years counts as resident in the region (most days among regions) should be confirmed with an adviser.

## Sources

- Tributación Autonómica. Medidas 2026, Capítulo IV: resumen de medidas vigentes en tributos cedidos, ejercicio 2026 — https://www.hacienda.gob.es/sgfal/financiacionterritorial/autonomica/capitulo-iv-tributacion-autonomica-2026.pdf
- Tributación Autonómica. Medidas 2026, Capítulo I (updated 23 September 2026) — https://www.hacienda.gob.es/sgfal/financiacionterritorial/autonomica/capitulo-i-tributacion-autonomica-2026.pdf
- Spain - Individual - Other taxes (last reviewed 30 June 2026) — https://taxsummaries.pwc.com/spain/individual/other-taxes
- Ley 29/1987 del Impuesto sobre Sucesiones y Donaciones (consolidated text: arts. 20-23 bis, DA 2ª) — https://www.boe.es/buscar/act.php?id=BOE-A-1987-28141
- Ley 19/1991 del Impuesto sobre el Patrimonio (consolidated text: arts. 4, 28, 30, 31, 33) — https://www.boe.es/buscar/act.php?id=BOE-A-1991-14392
- Manual teórico de la campaña de 2025 (IRPF y Patrimonio), Hacienda Foral de Navarra, actualización 02-02-2026 — https://www.navarra.es/documents/48192/35409067/Manual+te%C3%B3rico+de+la+campa%C3%B1a+de+2025.pdf/c9e11ce5-ae6f-eb9a-040b-265f1f040525?t=1775726152475&download=true
- Ley 28/1990, Convenio Económico con Navarra (arts. 17, 31, DA 8ª) — https://www.boe.es/buscar/act.php?id=BOE-A-1990-31117
- Decreto Foral Legislativo 250/2002, texto refundido del Impuesto sobre Sucesiones y Donaciones de Navarra (art. 34) — https://www.lexnavarra.navarra.es/detalle.asp?r=10781
- Norma Foral 13/2013 del IRPF de Bizkaia (consolidated to 01/01/2026, art. 76) — https://www.bizkaia.eus/documents/880307/15187815/ca_13_2013.pdf/ce52e403-4fca-9ef7-bf85-2505ba29f921?t=1784098584068
- Ley 12/2002, Concierto Económico con el País Vasco (arts. 24, 25, DA 5ª) — https://www.boe.es/buscar/act.php?id=BOE-A-2002-9969
- Norma Foral 2/2013 del Impuesto sobre el Patrimonio de Bizkaia (consolidated) — https://www.bizkaia.eus/documents/880307/15187815/ca_2_2013.pdf/7562e4a0-44c4-7875-7eae-0e59a8f88fd2?t=1746526194585
- Norma Foral 9/2023 del Impuesto Temporal de Solidaridad de las Grandes Fortunas de Bizkaia — https://www.bizkaia.eus/documents/880307/15187815/ca_9_2023.pdf/5800d79a-5281-b59d-bac4-cd8b264e8dd8?t=1736858160050
- Norma Foral 4/2015 del Impuesto sobre Sucesiones y Donaciones de Bizkaia (consolidated, last change 23/04/2025) — https://www.bizkaia.eus/documents/880307/15187815/ca_4_2015.pdf/b6d32212-4007-7fff-588f-207247783372?t=1746431810761
- Reducciones ISD aplicables a hechos imponibles desde 16/05/2025 (Gipuzkoa) — https://www.gipuzkoa.eus/documents/2456431/2811273/Reducciones+2025_es.pdf
- Sucesiones y donaciones: escalas y grupos, hechos imponibles a partir de 1 de enero de 2018 (Gipuzkoa) — https://www.gipuzkoa.eus/es/web/ogasuna/impuestos/sucesiones-donaciones/escalas-grupos/hechos-imponibles-a-partir-1-de-enero-2018
- Texto Refundido de la Ley Foral del IRPF (DFL 4/2008), consolidated, art. 60 — https://www.navarra.es/es/web/normativa-hacienda/-/texto-refundido-de-la-ley-foral-del-impuesto-sobre-la-renta-de-las-personas-f%C3%ADsicas-dfl-4/2008-de-2-de-junio-
- Ley Foral 13/1992 del Impuesto sobre el Patrimonio, consolidated (art. 28; DA 1ª, 2026 scale per LF 17/2025) — https://www.navarra.es/es/web/normativa-hacienda/-/ley-foral-13/1992-de-19-de-noviembre-del-impuesto-sobre-el-patrimonio
- Cuatrecasas, País Vasco - Novedades tributarias para personas físicas 2025 y 2026 (May 2025) — https://www.cuatrecasas.com/resources/pais-vasco-personas-fisicas-text-682f4962b2782669451928.pdf
- Guía Fiscal, Patrimonio País Vasco 2026 (updated 29 July 2026) — https://guiafiscal.es/patrimonio/ip/pais-vasco/
- LuxuryEstate.com rental listings: Madrid — https://www.luxuryestate.com/rent/spain/community-of-madrid/province-of-madrid/madrid ; Barcelona — https://www.luxuryestate.com/rent/spain/catalonia/province-of-barcelona/barcelona ; Marbella — https://www.luxuryestate.com/rent/spain/andalusia/malaga/marbella ; Palma — https://www.luxuryestate.com/rent/spain/balearic-islands/province-of-balearic-islands/palma ; Valencia province — https://www.luxuryestate.com/rent/spain/valencia/valencia ; Province of Santa Cruz de Tenerife — https://www.luxuryestate.com/rent/spain/canary-islands/province-of-santa-cruz-de-tenerife
- LuxuryEstate.com sale listings: Madrid — https://www.luxuryestate.com/spain/community-of-madrid/province-of-madrid/madrid ; Barcelona — https://www.luxuryestate.com/spain/catalonia/province-of-barcelona/barcelona ; Marbella — https://www.luxuryestate.com/spain/andalusia/malaga/marbella ; Palma — https://www.luxuryestate.com/spain/balearic-islands/province-of-balearic-islands/palma ; Valencia — https://www.luxuryestate.com/spain/valencia/valencia/valencia ; Adeje — https://www.luxuryestate.com/spain/canary-islands/province-of-santa-cruz-de-tenerife/adeje ; San Sebastián — https://www.luxuryestate.com/spain/basque-country/guipuzcoa/donostia-san-sebastian/san-sebastian
- Fotocasa rental listings, 4+ bedrooms (snapshots 2026-10-15): Madrid Chamartín — https://www.fotocasa.es/es/alquiler/viviendas/madrid-capital/chamartin/l?minRooms=4 ; Barcelona Sarrià-Sant Gervasi — https://www.fotocasa.es/es/alquiler/viviendas/barcelona-capital/sarria-sant-gervasi/l?minRooms=4 ; Marbella — https://www.fotocasa.es/es/alquiler/viviendas/marbella/todas-las-zonas/l?minRooms=4 ; Palma — https://www.fotocasa.es/es/alquiler/viviendas/palma-de-mallorca/todas-las-zonas/l?minRooms=4 ; Santa Cruz de Tenerife — https://www.fotocasa.es/es/alquiler/viviendas/santa-cruz-de-tenerife-capital/todas-las-zonas/l?minRooms=4
- Benjamin Franklin International School, School Fees 2026-2027 — https://www.bfischool.org/admissions/school-fees
- Sotogrande International School, Fee Schedule 2026-27 — https://www.sis.ac/sites/school80/files/2026-03/fees_2026-27_sis_new_1.pdf
- Bellver International College, Admissions and school fees — https://www.bellvercollege.com/admissions/
- American School of Valencia, Tuition and Fees 2026-2027 — https://asvalencia.org/admissions/tuition-fees/
- Wingate School, School fees 2026/2027 — https://www.wingateschool.com/wp-content/uploads/2026/06/school-fees-2026-2027.pdf
- Fotocasa - Alquiler de viviendas en Bilbao, 4 habitaciones o más (snapshot 2026-10-15) — https://www.fotocasa.es/es/alquiler/viviendas/bilbao/todas-las-zonas/l?minRooms=4
- Colegio Alemán de Bilbao - Cuotas escolares 2026/2027 — https://www.dsbilbao.org/secretaria-virtual/cuotas-escolares/
- Runnymede College Madrid - Fees 2026-2027 (used for ES-MD, as in ESP.json) — https://www.runnymede-college.com/admissions/fees

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added cost_of_living for ES-MD, ES-CT, ES-AN (Marbella), ES-IB, ES-VC, ES-CN (Costa Adeje) and ES-PV (San Sebastián, price per m² only) from LuxuryEstate.com listing samples and schools' 2026-27 fee pages. Navarra: savings scale and 2026 wealth scale confirmed from the consolidated DFL 4/2008 and LF 13/1992 (LF 17/2025), raised to high/verified. Basque Country: the 19-28% savings scale is common to all three territories from 2026 (Cuatrecasas), raised to high/verified; Álava and Gipuzkoa wealth-tax allowances and top rates added as text, band limits still unverified.
- 2026-10-15 (household cost pass): ES-MD now carries the Runnymede College fee (EUR 23,700, from ESP.json). ES-PV: added prime rent EUR 2,450 (Fotocasa, Bilbao long-term 4+ room lets of 120 m²+, n=16) and the Colegio Alemán de Bilbao upper-secondary fee EUR 7,550 (2026-27); city now Bilbao for rent and school, San Sebastián for price per m².
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (ES-VC Valencia province sample EUR 3,250 (a Fotocasa check of Valencia city, 9 listings, gave EUR 3,800)).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (ES-PV Bilbao Fotocasa EUR 2,450).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: changed from EUR 8,000 to EUR 4,500 for ES-MD (Chamartín, Fotocasa).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: changed from EUR 7,700 to EUR 4,900 for ES-CT (Sarrià-Sant Gervasi, Fotocasa).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: changed from EUR 25,000 to EUR 6,900 for ES-AN (Marbella Fotocasa, replacing Golden Mile villas and penthouses).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: changed from EUR 4,200 to EUR 3,800 for ES-IB (Palma, Fotocasa).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: changed from EUR 6,350 to EUR 1,950 for ES-CN (Santa Cruz de Tenerife area, Fotocasa, replacing Adeje resort villas).
- 2026-10-15: ES-CN purchase price per m² removed: it described Adeje resort villas, while the family rent is now Santa Cruz de Tenerife.
- 2026-10-16: added surviving-spouse treatment.
