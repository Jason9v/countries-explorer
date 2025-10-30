import { Link } from 'react-router'

import Country from '../types/Country'

type CountryCardProps = {
  country: Country
}

const CountryCard = ({ country }: CountryCardProps) => {
  const { cca3, name, flags, population, region, capital } = country

  const info = [
    { label: 'Population', value: population.toLocaleString() },
    { label: 'Region', value: region },
    { label: 'Capital', value: capital?.join(', ') },
  ]

  return (
    <Link
      to={`/countries/${cca3}`}
      className="bg-slate-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-gray-700 rounded-lg shadow-sm"
    >
      <div className="w-full sm:h-36 h-76 overflow-hidden rounded-sm">
        <img
          src={flags?.svg ?? flags?.png}
          alt={flags?.alt}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 mb-4">
        <h2 className="text-md font-semibold mb-3">{name.common}</h2>

        {info.map(({ label, value }) => (
          <p key={label} className="text-sm mt-1">
            <span className="font-semibold">{label}:&nbsp;</span>
            <span>{value || 'None'}</span>
          </p>
        ))}
      </div>
    </Link>
  )
}

export default CountryCard
