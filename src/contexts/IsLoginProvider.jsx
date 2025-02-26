import { createContext, useEffect, useState } from 'react';

export const IsLoginContext = createContext();

const initialState = localStorage.getItem('isLogin') || '';

function IsLoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState(initialState);

    function changeLogin(remember, token) {
        setIsLogin(token);
        if (remember) {
            localStorage.setItem('isLogin', token);
        }
    }

    return (
        <IsLoginContext.Provider value={{ isLogin, changeLogin }}>
            {children}
        </IsLoginContext.Provider>
    );
}

export default IsLoginProvider;
