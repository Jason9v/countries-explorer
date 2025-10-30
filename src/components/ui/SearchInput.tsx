import { Dispatch, SetStateAction } from 'react'

type SearchInputProps = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

const SearchInput = ({ searchTerm, setSearchTerm }: SearchInputProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
        <svg
          className="w-3 h-3 text-slate-600 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      <input
        type="search"
        id="default-search"
        className="block md:w-96 w-80 h-12 p-3 ps-10 text-sm rounded-lg shadow-sm outline-none
          bg-slate-50 dark:bg-slate-800 placeholder-slate-500 dark:placeholder-white"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        required
      />
    </div>
  )
}

export default SearchInput
