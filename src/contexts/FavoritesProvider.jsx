import { createContext, useEffect, useReducer } from 'react';

export const FavoritesContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload];

        case 'REMOVE':
            return state.filter((i) => i.id != action.payload);

        default:
            throw new Error('Invalid Action (FavoritesContext)');
    }
}

const initialState = JSON.parse(localStorage.getItem('favoriteCoins')) || [];

function FavoritesProvider({ children }) {
    const [favoriteCoins, dispatchFavoriteCoins] = useReducer(
        reducer,
        initialState,
    );

    useEffect(() => {
        localStorage.setItem('favoriteCoins', JSON.stringify(favoriteCoins));
    }, [favoriteCoins]);

    return (
        <FavoritesContext.Provider
            value={{ favoriteCoins, dispatchFavoriteCoins }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesProvider;
