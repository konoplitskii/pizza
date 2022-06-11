import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import { Header } from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Pizza from './pages/Pizza';

import './scss/app.scss';


type GlobalContext = {
  searchValue:string,
  setSearchValue:React.Dispatch<React.SetStateAction<string>>
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
              <Route path="/pizza/:id" element={<Pizza />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </searchContext.Provider>
      </div>
    </div>
  );
}

export default App;
