import { setMetaThemColor } from './helpers/helper.js';

import HomePage from './pages/HomePage.jsx';
import Layout from './Layout/Layout';
import FavoritesProvider from './contexts/FavoritesProvider.jsx';
import CurrencyProvider from './contexts/CurrencyProvider.jsx';
import IsLoginProvider from './contexts/IsLoginProvider.jsx';

import LoginPage from './pages/LoginOrSignup/LoginPage.jsx';
import { ImRocket } from 'react-icons/im';

setMetaThemColor();
function App() {
    return (
        <IsLoginProvider>
            {/* <Layout>
                <FavoritesProvider>
                    <CurrencyProvider>
                        <HomePage />
                    </CurrencyProvider>
                </FavoritesProvider>
            </Layout> */}

            <LoginPage />
        </IsLoginProvider>
    );
}

export default App;
