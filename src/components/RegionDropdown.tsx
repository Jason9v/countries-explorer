import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react'

type RegionDropdownProps = {
  region: string
  setRegion: Dispatch<SetStateAction<string>>
}

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const RegionDropdown = ({ region, setRegion }: RegionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
        setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setIsOpen])

  const handleSelect = (selectedRegion: string) => {
    setRegion(selectedRegion)
    setIsOpen(false)
  }

  const renderMenuItem = (value: string, label?: string) => (
    <a
      href="#"
      key={value}
      onClick={() => handleSelect(value)}
      className={`block px-4 py-3 text-sm text-gray-900 dark:text-white ${
        region === value ? 'bg-slate-100 dark:bg-slate-700' : ''
      }`}
    >
      {label ?? value}
    </a>
  )

  return (
    <div className="inline-block relative" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex w-56 h-12 justify-between items-center gap-x-1.5 rounded-lg 
        bg-slate-50 dark:bg-slate-800 px-4 text-sm text-gray-900 dark:text-white shadow-xs"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {region || 'Filter by region'}

        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          data-slot="icon"
          aria-hidden="true"
          className={`-mr-1 size-5 text-gray-900 dark:text-white transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <path
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md 
          bg-slate-50 dark:bg-slate-800 shadow-lg ring-1 ring-black/5 ${
            isOpen ? 'block' : 'hidden'
          } transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 
           data-closed:transform data-closed:opacity-0 data-enter:duration-100 
           data-enter:ease-out data-leave:duration-75 data-leave:ease-in`}
      >
        <div role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
          {renderMenuItem('', 'All regions')}
          {REGIONS.map(regionName => renderMenuItem(regionName))}
        </div>
      </div>
    </div>
  )
}

export default RegionDropdown
