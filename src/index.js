import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import AuthProvider from './context/authContext';
import MenuProvider from './context/menuContext'
import CartProvider from './context/cartContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <MenuProvider>
    <CartProvider>
  
    <App />
    </CartProvider>
    </MenuProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


