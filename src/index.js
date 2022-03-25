import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './components/Calculator';
import TemperatureInput from "./components/TemperatureInput";
import BoilingVerdict from "./components/BoilingVerdict";

ReactDOM.render(
  <React.StrictMode>
    <Calculator/>
  </React.StrictMode>,
  document.getElementById('root')
);

