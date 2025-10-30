import { Outlet } from 'react-router'

import { ThemeToggle } from './components'

const Layout = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-semibold">Where in the world?</h1>

        <ThemeToggle />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
