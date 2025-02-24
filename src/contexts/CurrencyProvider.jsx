import { createContext, useState } from 'react';

export const CurrencyContext = createContext();

function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState({ type: 'usd', symbol: '$' });

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export default CurrencyProvider;
