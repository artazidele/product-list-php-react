// import './App.css';
import './style.scss';
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AllProducts } from './components/AllProducts';
import { AddProduct } from './components/AddProduct';
import { Footer } from './components/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllProducts />}/>
          <Route path="/add-product" element={<AddProduct />}/>
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
};

export default App;