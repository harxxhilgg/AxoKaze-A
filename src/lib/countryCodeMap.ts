export const countryToCode: Record<string, string> = {
  // countries where F1 takes place
  Bahrain: "bh",
  "Saudi Arabia": "sa",
  Australia: "au",
  Azerbaijan: "az",
  USA: "us",
  Italy: "it",
  Monaco: "mc",
  Spain: "es",
  Canada: "ca",
  Austria: "at",
  UK: "gb",
  "United Kingdom": "gb",
  Hungary: "hu",
  Belgium: "be",
  Netherlands: "nl",
  Singapore: "sg",
  Japan: "jp",
  Qatar: "qa",
  Mexico: "mx",
  Brazil: "br",
  UAE: "ae",
  "United Arab Emirates": "ae",
  China: "cn",
  France: "fr",
  Germany: "de",
  Portugal: "pt",
  Turkey: "tr",
  Russia: "ru",
  India: "in",
  Argentina: "ar",
  "South Africa": "za",
  Malaysia: "my",
  Korea: "kr",
  "South Korea": "kr",
};

export const getCountryCode = (country: string): string => {
  return countryToCode[country] || "xx";
};

export const getFlagUrl = (country: string, size: number = 640): string => {
  const code = getCountryCode(country);

  return `https://flagcdn.com/w${size}/${code}.png`;
};
