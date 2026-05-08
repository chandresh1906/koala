import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();
export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  // Default to Australian Dollars
  const [currency, setCurrency] = useState('AUD');

  // Dummy exchange rates (Assuming your db.json prices are in AUD)
  // Example: 1 AUD = 0.65 USD, 1 AUD = 98 JPY
  const exchangeRates = {
    AUD: 1,
    USD: 0.65,
    JPY: 98,
  };

  const currencySymbols = {
    AUD: 'A$',
    USD: 'US$',
    JPY: '¥',
  };

  // This magic function takes your db.json price and formats it perfectly
  const formatPrice = (basePriceAUD) => {
    // 1. Calculate the new price based on the selected currency
    const convertedPrice = basePriceAUD * exchangeRates[currency];

    // 2. Format it nicely (JPY doesn't use decimal cents)
    if (currency === 'JPY') {
      return `${currencySymbols[currency]}${Math.round(convertedPrice).toLocaleString()}`;
    }
    
    // For AUD and USD, show 2 decimal places if needed, or round numbers
    return `${currencySymbols[currency]}${convertedPrice.toLocaleString(undefined, { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 2 
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};