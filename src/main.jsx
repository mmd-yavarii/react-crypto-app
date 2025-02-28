import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import IsLoginProvider from './contexts/IsLoginProvider.jsx';
import FavoritesProvider from './contexts/FavoritesProvider.jsx';
import CurrencyProvider from './contexts/CurrencyProvider.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StrictMode>
            <IsLoginProvider>
                <FavoritesProvider>
                    <CurrencyProvider>
                        <App />
                    </CurrencyProvider>
                </FavoritesProvider>
            </IsLoginProvider>
        </StrictMode>
    </BrowserRouter>,
);
