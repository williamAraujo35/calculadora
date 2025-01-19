import React from 'react';
import ReactDOM from 'react-dom/client';
import Calculator from './main/calculator';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <h1>Calculadora</h1>
    <Calculator />
  </React.Fragment>
);

