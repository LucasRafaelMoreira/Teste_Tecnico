import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import Home from './pages/Home.js'
import Movie from './pages/Movie.tsx'
import Search from './pages/Search.tsx'
import Favorites from './pages/Favorites.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='movie/:id' element={<Movie />} />
          <Route path='search' element={<Search />} />
          <Route path='favorites' element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
