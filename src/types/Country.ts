type Country = {
  cca3: string
  flags?: { png: string; svg: string; alt?: string }
  name: CountryName
  tld?: string[]
  currencies?: Currencies
  capital?: string[]
  region: string
  subregion?: string
  languages?: Languages
  borders?: string[]
  population: number,
}

type CountryName = {
  common: string
  official: string
  nativeName?: Record<string, LocalizedName>
}

export type NativeName = Record<string, LocalizedName>

type LocalizedName = {
  official: string
  common: string
}

export type Currencies = Record<string, CurrencyInfo>
export type Languages = Record<string, string>

type CurrencyInfo = {
  name: string
  symbol?: string
}

export default Country
