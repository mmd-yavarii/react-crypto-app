import { createContext, useReducer } from 'react';

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

function FavoritesProvider({ children }) {
    const [favoriteCoins, dispatchFavoriteCoins] = useReducer(reducer, []);

    return (
        <FavoritesContext.Provider
            value={{ favoriteCoins, dispatchFavoriteCoins }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesProvider;
