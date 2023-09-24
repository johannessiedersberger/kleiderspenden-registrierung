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

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/impressum" element={<Imprint />} />
          <Route path="/spenden" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
