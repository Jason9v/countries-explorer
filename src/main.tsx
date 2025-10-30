import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'

import Layout from './Layout'

// @ts-ignore: Cannot find module or type declarations for side-effect import of './index.css'.
import './index.css'

import { Home, CountryPage } from './pages'

const queryClient = new QueryClient()

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/countries-explorer">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/countries/:code" element={<CountryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
