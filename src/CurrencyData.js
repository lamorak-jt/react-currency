import React from 'react';
import { json, checkStatus } from './utils';

const fetchData = (baseCurrency) => {   
  let currencyData = {
    dropdownOptions: [],
    rates: {},
  };

  fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log(data.rates);
      console.log(Object.keys(data.rates));
      currencyData.rates = data.rates;
      currencyData.dropdownOptions = Object.keys(data.rates);        
    })
    .catch((error) => {
      console.log(error);
      currencyData.error = error.message;          
    })
  
  console.log(currencyData.dropdownOptions)
  return currencyData;
}

export default fetchData
