import { createContext, useEffect, useState } from 'react';

export const IsLoginContext = createContext();

const initialState = JSON.parse(localStorage.getItem('isLogin')) || false;

function IsLoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState(initialState);

    useEffect(() => {
        localStorage.setItem('isLogin', JSON.stringify(isLogin));
    }, [isLogin]);

    return (
        <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </IsLoginContext.Provider>
    );
}

export default IsLoginProvider;
