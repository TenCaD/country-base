"use strict";
const currency = Object.assign(Object.create(null), {
  "AED": [
    "AE"
  ],
  "AFN": [
    "AF"
  ],
  "ALL": [
    "AL"
  ],
  "AMD": [
    "AM"
  ],
  "ANG": [
    "CW",
    "SX"
  ],
  "AOA": [
    "AO"
  ],
  "ARS": [
    "AR"
  ],
  "AUD": [
    "AU",
    "CC",
    "CX",
    "KI",
    "NF",
    "NR",
    "TV"
  ],
  "AWG": [
    "AW"
  ],
  "AZN": [
    "AZ"
  ],
  "BAM": [
    "BA"
  ],
  "BBD": [
    "BB"
  ],
  "BDT": [
    "BD"
  ],
  "BGN": [
    "BG"
  ],
  "BHD": [
    "BH"
  ],
  "BIF": [
    "BI"
  ],
  "BMD": [
    "BM"
  ],
  "BND": [
    "BN"
  ],
  "BOB": [
    "BO"
  ],
  "BRL": [
    "BR"
  ],
  "BSD": [
    "BS"
  ],
  "BTN": [
    "BT"
  ],
  "BWP": [
    "BW",
    "ZW"
  ],
  "BYN": [
    "BY"
  ],
  "BZD": [
    "BZ"
  ],
  "CAD": [
    "CA"
  ],
  "CDF": [
    "CD"
  ],
  "CHF": [
    "CH",
    "LI"
  ],
  "CKD": [
    "CK"
  ],
  "CLP": [
    "CL"
  ],
  "CNY": [
    "CN",
    "ZW"
  ],
  "COP": [
    "CO"
  ],
  "CRC": [
    "CR"
  ],
  "CUC": [
    "CU"
  ],
  "CUP": [
    "CU"
  ],
  "CVE": [
    "CV"
  ],
  "CZK": [
    "CZ"
  ],
  "DJF": [
    "DJ"
  ],
  "DKK": [
    "DK",
    "FO",
    "GL"
  ],
  "DOP": [
    "DO"
  ],
  "DZD": [
    "DZ",
    "EH"
  ],
  "EGP": [
    "EG",
    "PS"
  ],
  "ERN": [
    "ER"
  ],
  "ETB": [
    "ET"
  ],
  "EUR": [
    "AD",
    "AT",
    "AX",
    "BE",
    "BL",
    "CY",
    "DE",
    "EE",
    "ES",
    "FI",
    "FR",
    "GF",
    "GP",
    "GR",
    "HR",
    "IE",
    "IT",
    "LT",
    "LU",
    "LV",
    "MC",
    "ME",
    "MF",
    "MQ",
    "MT",
    "NL",
    "PM",
    "PT",
    "RE",
    "SI",
    "SK",
    "SM",
    "TF",
    "VA",
    "XK",
    "YT",
    "ZW"
  ],
  "FJD": [
    "FJ"
  ],
  "FKP": [
    "FK"
  ],
  "FOK": [
    "FO"
  ],
  "GBP": [
    "GB",
    "GG",
    "IM",
    "JE",
    "SH",
    "ZW"
  ],
  "GEL": [
    "GE"
  ],
  "GGP": [
    "GG"
  ],
  "GHS": [
    "GH"
  ],
  "GIP": [
    "GI"
  ],
  "GMD": [
    "GM"
  ],
  "GNF": [
    "GN"
  ],
  "GTQ": [
    "GT"
  ],
  "GYD": [
    "GY"
  ],
  "HKD": [
    "HK"
  ],
  "HNL": [
    "HN"
  ],
  "HTG": [
    "HT"
  ],
  "HUF": [
    "HU"
  ],
  "IDR": [
    "ID"
  ],
  "ILS": [
    "IL",
    "PS"
  ],
  "IMP": [
    "IM"
  ],
  "INR": [
    "BT",
    "IN",
    "ZW"
  ],
  "IQD": [
    "IQ"
  ],
  "IRR": [
    "IR"
  ],
  "ISK": [
    "IS"
  ],
  "JEP": [
    "JE"
  ],
  "JMD": [
    "JM"
  ],
  "JOD": [
    "JO",
    "PS"
  ],
  "JPY": [
    "JP",
    "ZW"
  ],
  "KES": [
    "KE"
  ],
  "KGS": [
    "KG"
  ],
  "KHR": [
    "KH"
  ],
  "KID": [
    "KI"
  ],
  "KMF": [
    "KM"
  ],
  "KPW": [
    "KP"
  ],
  "KRW": [
    "KR"
  ],
  "KWD": [
    "KW"
  ],
  "KYD": [
    "KY"
  ],
  "KZT": [
    "KZ"
  ],
  "LAK": [
    "LA"
  ],
  "LBP": [
    "LB"
  ],
  "LKR": [
    "LK"
  ],
  "LRD": [
    "LR"
  ],
  "LSL": [
    "LS"
  ],
  "LYD": [
    "LY"
  ],
  "MAD": [
    "EH",
    "MA"
  ],
  "MDL": [
    "MD"
  ],
  "MGA": [
    "MG"
  ],
  "MKD": [
    "MK"
  ],
  "MMK": [
    "MM"
  ],
  "MNT": [
    "MN"
  ],
  "MOP": [
    "MO"
  ],
  "MRU": [
    "EH",
    "MR"
  ],
  "MUR": [
    "MU"
  ],
  "MVR": [
    "MV"
  ],
  "MWK": [
    "MW"
  ],
  "MXN": [
    "MX"
  ],
  "MYR": [
    "MY"
  ],
  "MZN": [
    "MZ"
  ],
  "NAD": [
    "NA"
  ],
  "NGN": [
    "NG"
  ],
  "NIO": [
    "NI"
  ],
  "NOK": [
    "NO",
    "SJ"
  ],
  "NPR": [
    "NP"
  ],
  "NZD": [
    "CK",
    "NU",
    "NZ",
    "PN",
    "TK"
  ],
  "OMR": [
    "OM"
  ],
  "PAB": [
    "PA"
  ],
  "PEN": [
    "PE"
  ],
  "PGK": [
    "PG"
  ],
  "PHP": [
    "PH"
  ],
  "PKR": [
    "PK"
  ],
  "PLN": [
    "PL"
  ],
  "PYG": [
    "PY"
  ],
  "QAR": [
    "QA"
  ],
  "RON": [
    "RO"
  ],
  "RSD": [
    "RS"
  ],
  "RUB": [
    "RU"
  ],
  "RWF": [
    "RW"
  ],
  "SAR": [
    "SA"
  ],
  "SBD": [
    "SB"
  ],
  "SCR": [
    "SC"
  ],
  "SDG": [
    "SD"
  ],
  "SEK": [
    "SE"
  ],
  "SGD": [
    "BN",
    "SG"
  ],
  "SHP": [
    "GS",
    "SH"
  ],
  "SLL": [
    "SL"
  ],
  "SOS": [
    "SO"
  ],
  "SRD": [
    "SR"
  ],
  "SSP": [
    "SS"
  ],
  "STN": [
    "ST"
  ],
  "SYP": [
    "SY"
  ],
  "SZL": [
    "SZ"
  ],
  "THB": [
    "TH"
  ],
  "TJS": [
    "TJ"
  ],
  "TMT": [
    "TM"
  ],
  "TND": [
    "TN"
  ],
  "TOP": [
    "TO"
  ],
  "TRY": [
    "TR"
  ],
  "TTD": [
    "TT"
  ],
  "TVD": [
    "TV"
  ],
  "TWD": [
    "TW"
  ],
  "TZS": [
    "TZ"
  ],
  "UAH": [
    "UA"
  ],
  "UGX": [
    "UG"
  ],
  "USD": [
    "AS",
    "BQ",
    "BS",
    "EC",
    "GU",
    "IO",
    "KH",
    "MH",
    "MP",
    "PA",
    "PR",
    "PW",
    "SV",
    "TC",
    "TL",
    "UM",
    "US",
    "VG",
    "VI",
    "ZW"
  ],
  "UYU": [
    "UY"
  ],
  "UZS": [
    "UZ"
  ],
  "VES": [
    "VE"
  ],
  "VND": [
    "VN"
  ],
  "VUV": [
    "VU"
  ],
  "WST": [
    "WS"
  ],
  "XAF": [
    "CF",
    "CG",
    "CM",
    "GA",
    "GQ",
    "TD"
  ],
  "XCD": [
    "AG",
    "AI",
    "DM",
    "GD",
    "KN",
    "LC",
    "MS",
    "VC"
  ],
  "XOF": [
    "BF",
    "BJ",
    "CI",
    "GW",
    "ML",
    "NE",
    "SN",
    "TG"
  ],
  "XPF": [
    "NC",
    "PF",
    "WF"
  ],
  "YER": [
    "YE"
  ],
  "ZAR": [
    "LS",
    "NA",
    "SZ",
    "ZA",
    "ZW"
  ],
  "ZMW": [
    "ZM"
  ],
  "ZWB": [
    "ZW"
  ]
}
);
module.exports = { currency, default: currency };
