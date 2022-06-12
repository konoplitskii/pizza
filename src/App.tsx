import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, useState } from 'react';

import { Header } from './components/Header';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Pizza = React.lazy(() => import('./pages/Pizza'));


type GlobalContext = {
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const searchContext = React.createContext<GlobalContext>({} as GlobalContext);


function App() {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className="App">
      <div className="wrapper">
        <searchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pizza/:id" element={<Suspense fallback="Идёт загрузка страницы..."><Pizza /></Suspense>} />
              <Route path="/cart" element={<Suspense fallback="Идёт загрузка корзины..."><Cart /></Suspense>} />
              <Route path="*" element={<Suspense fallback="Идёт загрузка страницы..."><NotFound /></Suspense>} />
            </Routes>
          </div>
        </searchContext.Provider>
      </div>
    </div>
  );
}

export default App;
