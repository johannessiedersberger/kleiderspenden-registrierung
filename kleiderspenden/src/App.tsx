import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from './components/frontpages/FrontPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { ChakraProvider } from '@chakra-ui/react'
import Imprint from './components/legalpages/Imprint';
import FormPage from './components/formpages/FormPage';
import { persist, devtools } from 'zustand/middleware';
import create from 'zustand';
import ConfirmationPage from './components/formpages/ConfirmationPage';

interface DonationState {
  donation: Object | null,
  setDonation: (currentDonation: []) => void,
  removeDonation: () => void
}

export const useStore = create<DonationState>()(
  devtools(
    persist(
      (set) => ({
        donation: Object,
        setDonation: (currentDonation) => set({ donation: currentDonation }),
        removeDonation: () => set({ donation: null })
      }), {
      name: 'donation', // name of the item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    })
  )
);

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/impressum" element={<Imprint />} />
          <Route path="/spenden" element={<FormPage />} />
          <Route path="/bestaetigung" element={<ConfirmationPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
