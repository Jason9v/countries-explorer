import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme-preference'

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)

      if (saved === 'dark' || saved === 'light') return saved
    } catch (error) {}

    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
      return 'dark'

    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement

    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch (error) {}
  }, [theme])

  const toggle = () => setTheme(theme => (theme === 'dark' ? 'light' : 'dark'))

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 px-3 py-1 rounded-md border bg-slate-100 
      hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}

export default ThemeToggle
