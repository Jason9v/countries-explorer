import { useParams } from 'react-router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import Country, { Currencies, Languages, NativeName } from '../types/Country'

import { BackButton } from '../components'

type Field = { label: string; content?: string | string[]; column?: 1 | 2 }

const fetchCountry = async (code: string) => {
  const params = new URLSearchParams({
    fields: [
      'flags',
      'name',
      'nativeName',
      'population',
      'region',
      'subregion',
      'capital',
      'tld',
      'currencies',
      'languages',
      'borders',
    ].join(','),
  }).toString()

  const response = await axios.get<Country>(
    `https://restcountries.com/v3.1/alpha/${code}?${params}`
  )

  return response.data
}

const getNativeCommon = (nativeName?: NativeName) => {
  const first = nativeName && Object.values(nativeName)[0]

  return first?.common && first?.official
}

const getCurrencyNames = (currencies?: Currencies) =>
  Object.values(currencies ?? {})
    .map(currency => currency?.name)
    .join(', ')

const getLanguageNames = (languages?: Languages) => Object.values(languages ?? {}).join(', ')

const CountryPage = () => {
  let { code } = useParams()

  if (!code) return

  const {
    data: country,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['country', code],
    queryFn: () => fetchCountry(code),
  })

  const renderContent = () => {
    if (error) return <p className="text-sm text-red-400">{error.message}</p>

    if (isLoading) return <p className="text-sm">Loading...</p>

    if (!country) return <p className="text-sm">Country not found.</p>

    const {
      flags,
      name,
      population,
      region,
      subregion,
      capital,
      tld,
      currencies,
      languages,
      borders,
    } = country

    const fields: Field[] = [
      { label: 'Native Name', content: getNativeCommon(name?.nativeName), column: 1 },
      { label: 'Population', content: population?.toLocaleString(), column: 1 },
      { label: 'Region', content: region, column: 1 },
      { label: 'Subregion', content: subregion, column: 1 },
      { label: 'Capital', content: capital?.join(', '), column: 1 },
      { label: 'Top Level Domain', content: tld?.join(', '), column: 2 },
      { label: 'Currencies', content: getCurrencyNames(currencies), column: 2 },
      { label: 'Languages', content: getLanguageNames(languages), column: 2 },
      { label: 'Border Countries', content: borders },
    ]

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-10 lg:gap-x-20 items-center">
        <div className="w-full lg:h-80 lg:h-30 h-30 overflow-hidden rounded-sm">
          <img
            src={flags?.svg ?? flags?.png}
            alt={flags?.alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">{name?.common}</h2>

          {renderFields(fields)}
        </div>
      </div>
    )
  }

  const renderFields = (fields: Field[]) => {
    const leftColumnFields = fields.filter(field => field.column === 1)
    const rightColumnFields = fields.filter(field => field.column === 2)
    const fullWidthFields = fields.filter(field => field.column === undefined)

    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12">
          <div className="flex flex-col gap-y-2">
            {leftColumnFields.map((field, idx) => renderField(field, idx))}
          </div>

          <div className="flex flex-col gap-y-2">
            {rightColumnFields.map((field, idx) => renderField(field, idx))}
          </div>
        </div>

        <div className="lg:col-span-2 mt-12">
          {fullWidthFields.map((field, idx) => (
            <div key={`full-${field.label}-${idx}`}>{renderField(field, idx, 'full')}</div>
          ))}
        </div>
      </>
    )
  }

  const renderField = (field: Field, idx: number, variant: 'full' | 'grid' = 'grid') => {
    const isFull = variant === 'full'

    const rawContent = field.content ?? []
    const contentArray = Array.isArray(rawContent) ? rawContent.flat() : [rawContent]
    const values = contentArray.length ? contentArray : ['None']

    return (
      <p
        key={idx}
        className={`text-sm ${isFull ? 'lg:flex lg:items-center lg:flex-row flex-col' : ''}`}
      >
        <span className="font-semibold whitespace-nowrap">{field.label}: </span>

        <span
          className={`${isFull ? 'lg:ml-2 ml-0 mt-4 lg:mt-0 min-w-0 flex flex-wrap gap-2' : ''} break-words`}
        >
          {values.map((value, i) => (
            <span
              key={i} 
              className={`${isFull ? 'py-1 px-4 shadow-md rounded-md bg-slate-50 dark:bg-slate-800' : ''}`}
            >
              {value}
            </span>
          ))}
        </span>
      </p>
    )
  }

  return (
    <>
      <BackButton />

      {renderContent()}
    </>
  )
}

export default CountryPage
