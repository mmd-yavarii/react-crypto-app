import { createContext, useEffect, useState } from 'react';

export const IsLoginContext = createContext();

const initialState = JSON.parse(localStorage.getItem('isLogin')) || '';

function IsLoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState(initialState);

    return (
        <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </IsLoginContext.Provider>
    );
}

export default IsLoginProvider;
