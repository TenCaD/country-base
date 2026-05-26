import {
  countries,
  countryCodes,
  getCountryByIso2,
  normalizeKey,
  type Country,
  type CountryCodeIso2
} from "country-base";
import { countriesByIso2 } from "country-base/data";
import { currency, type MultiCountryIndex } from "country-base/indexes/currency";
import { languageName } from "country-base/indexes";
import { iso3, type SingleCountryIndex } from "country-base/indexes/iso3";
import { nameSimple } from "country-base/indexes/name-simple";

const code: CountryCodeIso2 = iso3.USA;
const country: Country | undefined = getCountryByIso2(code);
const directCountry: Country | undefined = countriesByIso2.US;
const countryList: readonly Country[] = countries;
const codeList: readonly CountryCodeIso2[] = countryCodes;
const currencyIndex: MultiCountryIndex = currency;
const iso3Index: SingleCountryIndex = iso3;
const countriesByName: readonly CountryCodeIso2[] | undefined = nameSimple[normalizeKey("United States")];
const countriesByLanguageName: readonly CountryCodeIso2[] | undefined = languageName.english;
const missingCurrency: readonly CountryCodeIso2[] | undefined = currency.NOPE;

void country;
void directCountry;
void countryList;
void codeList;
void currencyIndex;
void iso3Index;
void countriesByName;
void countriesByLanguageName;
void missingCurrency;
