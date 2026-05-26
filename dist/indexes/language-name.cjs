"use strict";
const languageName = Object.assign(Object.create(null), {
  "afrikaans": [
    "NA",
    "ZA"
  ],
  "albanian": [
    "AL",
    "XK"
  ],
  "amharic": [
    "ET"
  ],
  "arabic": [
    "AE",
    "BH",
    "DJ",
    "DZ",
    "EG",
    "ER",
    "IL",
    "IQ",
    "JO",
    "KM",
    "KW",
    "LB",
    "LY",
    "MA",
    "MR",
    "OM",
    "PS",
    "QA",
    "SA",
    "SD",
    "SO",
    "SY",
    "TD",
    "TN",
    "YE"
  ],
  "aramaic": [
    "IQ"
  ],
  "armenian": [
    "AM"
  ],
  "austro bavarian german": [
    "AT"
  ],
  "aymara": [
    "BO",
    "PE"
  ],
  "azerbaijani": [
    "AZ"
  ],
  "belarusian": [
    "BY"
  ],
  "belizean creole": [
    "BZ"
  ],
  "bengali": [
    "BD"
  ],
  "berber": [
    "EH",
    "MA"
  ],
  "bislama": [
    "VU"
  ],
  "bosnian": [
    "BA"
  ],
  "bulgarian": [
    "BG"
  ],
  "burmese": [
    "MM"
  ],
  "carolinian": [
    "MP"
  ],
  "catalan": [
    "AD"
  ],
  "chamorro": [
    "GU",
    "MP"
  ],
  "chewa": [
    "MW",
    "ZW"
  ],
  "chibarwe": [
    "ZW"
  ],
  "chinese": [
    "CN",
    "HK",
    "MO",
    "SG",
    "TW"
  ],
  "comorian": [
    "KM"
  ],
  "cook islands maori": [
    "CK"
  ],
  "croatian": [
    "BA",
    "HR"
  ],
  "czech": [
    "CZ"
  ],
  "danish": [
    "DK",
    "FO"
  ],
  "dari": [
    "AF"
  ],
  "dutch": [
    "AW",
    "BE",
    "BQ",
    "CW",
    "NL",
    "SR",
    "SX"
  ],
  "dzongkha": [
    "BT"
  ],
  "english": [
    "AG",
    "AI",
    "AS",
    "AU",
    "BB",
    "BM",
    "BQ",
    "BS",
    "BW",
    "BZ",
    "CA",
    "CC",
    "CK",
    "CM",
    "CW",
    "CX",
    "DM",
    "ER",
    "FJ",
    "FK",
    "FM",
    "GB",
    "GD",
    "GG",
    "GH",
    "GI",
    "GM",
    "GS",
    "GU",
    "GY",
    "HK",
    "HM",
    "IE",
    "IM",
    "IN",
    "IO",
    "JE",
    "JM",
    "KE",
    "KI",
    "KN",
    "KY",
    "LC",
    "LR",
    "LS",
    "MH",
    "MP",
    "MS",
    "MT",
    "MU",
    "MW",
    "MY",
    "NA",
    "NF",
    "NG",
    "NR",
    "NU",
    "NZ",
    "PG",
    "PH",
    "PK",
    "PN",
    "PR",
    "PW",
    "RW",
    "SB",
    "SC",
    "SD",
    "SG",
    "SH",
    "SL",
    "SS",
    "SX",
    "SZ",
    "TC",
    "TK",
    "TO",
    "TT",
    "TV",
    "TZ",
    "UG",
    "UM",
    "US",
    "VC",
    "VG",
    "VI",
    "VU",
    "WS",
    "ZA",
    "ZM",
    "ZW"
  ],
  "estonian": [
    "EE"
  ],
  "faroese": [
    "FO"
  ],
  "fiji hindi": [
    "FJ"
  ],
  "fijian": [
    "FJ"
  ],
  "filipino": [
    "PH"
  ],
  "finnish": [
    "FI"
  ],
  "french": [
    "BE",
    "BF",
    "BI",
    "BJ",
    "BL",
    "CA",
    "CD",
    "CF",
    "CG",
    "CH",
    "CI",
    "CM",
    "DJ",
    "FR",
    "GA",
    "GF",
    "GG",
    "GN",
    "GP",
    "GQ",
    "HT",
    "JE",
    "KM",
    "LB",
    "LU",
    "MC",
    "MF",
    "MG",
    "ML",
    "MQ",
    "MU",
    "NC",
    "NE",
    "PF",
    "PM",
    "RE",
    "RW",
    "SC",
    "SN",
    "SX",
    "TD",
    "TF",
    "TG",
    "VU",
    "WF",
    "YT"
  ],
  "georgian": [
    "GE"
  ],
  "german": [
    "BE",
    "DE",
    "LI",
    "LU",
    "NA"
  ],
  "gilbertese": [
    "KI"
  ],
  "greek": [
    "CY",
    "GR"
  ],
  "greenlandic": [
    "GL"
  ],
  "guarani": [
    "AR",
    "BO",
    "PY"
  ],
  "guernesiais": [
    "GG"
  ],
  "haitian creole": [
    "HT"
  ],
  "hassaniya": [
    "EH"
  ],
  "hebrew": [
    "IL"
  ],
  "herero": [
    "NA"
  ],
  "hindi": [
    "IN"
  ],
  "hiri motu": [
    "PG"
  ],
  "hungarian": [
    "HU"
  ],
  "icelandic": [
    "IS"
  ],
  "indonesian": [
    "ID"
  ],
  "irish": [
    "IE"
  ],
  "italian": [
    "CH",
    "IT",
    "SM",
    "VA"
  ],
  "jamaican patois": [
    "JM"
  ],
  "japanese": [
    "JP"
  ],
  "jerriais": [
    "JE"
  ],
  "kalanga": [
    "ZW"
  ],
  "kazakh": [
    "KZ"
  ],
  "khmer": [
    "KH"
  ],
  "khoekhoe": [
    "NA"
  ],
  "khoisan": [
    "ZW"
  ],
  "kikongo": [
    "CD",
    "CG"
  ],
  "kinyarwanda": [
    "RW"
  ],
  "kirundi": [
    "BI"
  ],
  "korean": [
    "KP",
    "KR"
  ],
  "kwangali": [
    "NA"
  ],
  "kyrgyz": [
    "KG"
  ],
  "lao": [
    "LA"
  ],
  "latin": [
    "VA"
  ],
  "latvian": [
    "LV"
  ],
  "lingala": [
    "CD",
    "CG"
  ],
  "lithuanian": [
    "LT"
  ],
  "lozi": [
    "NA"
  ],
  "luxembourgish": [
    "LU"
  ],
  "macedonian": [
    "MK"
  ],
  "malagasy": [
    "MG"
  ],
  "malay": [
    "BN",
    "MY",
    "SG"
  ],
  "maldivian": [
    "MV"
  ],
  "maltese": [
    "MT"
  ],
  "manx": [
    "IM"
  ],
  "maori": [
    "NZ"
  ],
  "marshallese": [
    "MH"
  ],
  "mauritian creole": [
    "MU"
  ],
  "moldavian": [
    "MD"
  ],
  "mongolian": [
    "MN"
  ],
  "montenegrin": [
    "ME"
  ],
  "nauru": [
    "NR"
  ],
  "ndau": [
    "ZW"
  ],
  "ndonga": [
    "NA"
  ],
  "nepali": [
    "NP"
  ],
  "new zealand sign language": [
    "NZ"
  ],
  "niuean": [
    "NU"
  ],
  "norfuk": [
    "NF"
  ],
  "northern ndebele": [
    "ZW"
  ],
  "northern sotho": [
    "ZA"
  ],
  "norwegian": [
    "BV",
    "SJ"
  ],
  "norwegian bokmal": [
    "NO"
  ],
  "norwegian nynorsk": [
    "NO"
  ],
  "palauan": [
    "PW"
  ],
  "papiamento": [
    "AW",
    "BQ",
    "CW"
  ],
  "pashto": [
    "AF"
  ],
  "persian farsi": [
    "IR"
  ],
  "polish": [
    "PL"
  ],
  "portuguese": [
    "AO",
    "BR",
    "CV",
    "GQ",
    "GW",
    "MO",
    "MZ",
    "PT",
    "ST",
    "TL"
  ],
  "quechua": [
    "BO",
    "PE"
  ],
  "romanian": [
    "RO"
  ],
  "romansh": [
    "CH"
  ],
  "russian": [
    "AZ",
    "BY",
    "KG",
    "KZ",
    "RU",
    "TJ",
    "TM",
    "UZ"
  ],
  "sami": [
    "NO"
  ],
  "samoan": [
    "AS",
    "TK",
    "WS"
  ],
  "sango": [
    "CF"
  ],
  "serbian": [
    "BA",
    "RS",
    "XK"
  ],
  "seychellois creole": [
    "SC"
  ],
  "shona": [
    "ZW"
  ],
  "sinhala": [
    "LK"
  ],
  "slovak": [
    "CZ",
    "SK"
  ],
  "slovene": [
    "SI"
  ],
  "somali": [
    "SO"
  ],
  "sorani": [
    "IQ"
  ],
  "sotho": [
    "LS",
    "ZW"
  ],
  "southern ndebele": [
    "ZA"
  ],
  "southern sotho": [
    "ZA"
  ],
  "spanish": [
    "AR",
    "BO",
    "BZ",
    "CL",
    "CO",
    "CR",
    "CU",
    "DO",
    "EC",
    "EH",
    "ES",
    "GQ",
    "GT",
    "GU",
    "HN",
    "MX",
    "NI",
    "PA",
    "PE",
    "PR",
    "PY",
    "SV",
    "UY",
    "VE"
  ],
  "swahili": [
    "CD",
    "KE",
    "TZ",
    "UG"
  ],
  "swazi": [
    "SZ",
    "ZA"
  ],
  "swedish": [
    "AX",
    "FI",
    "SE"
  ],
  "swiss german": [
    "CH"
  ],
  "tajik": [
    "TJ"
  ],
  "tamil": [
    "IN",
    "LK",
    "SG"
  ],
  "tetum": [
    "TL"
  ],
  "thai": [
    "TH"
  ],
  "tigrinya": [
    "ER"
  ],
  "tok pisin": [
    "PG"
  ],
  "tokelauan": [
    "TK"
  ],
  "tonga": [
    "ZW"
  ],
  "tongan": [
    "TO"
  ],
  "tshiluba": [
    "CD"
  ],
  "tsonga": [
    "ZA",
    "ZW"
  ],
  "tswana": [
    "BW",
    "NA",
    "ZA",
    "ZW"
  ],
  "turkish": [
    "CY",
    "TR"
  ],
  "turkmen": [
    "AF",
    "TM"
  ],
  "tuvaluan": [
    "TV"
  ],
  "ukrainian": [
    "UA"
  ],
  "upper guinea creole": [
    "GW"
  ],
  "urdu": [
    "PK"
  ],
  "uzbek": [
    "UZ"
  ],
  "venda": [
    "ZA",
    "ZW"
  ],
  "vietnamese": [
    "VN"
  ],
  "xhosa": [
    "ZA",
    "ZW"
  ],
  "zimbabwean sign language": [
    "ZW"
  ],
  "zulu": [
    "ZA"
  ]
}
);
module.exports = { languageName, default: languageName };
