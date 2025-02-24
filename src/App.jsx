import { setMetaThemColor } from './helpers/helper.js';

import HomePage from './templates/HomePage';
import Layout from './Layout/Layout';
import FavoritesProvider from './contexts/FavoritesProvider.jsx';
import CurrencyProvider from './contexts/CurrencyProvider.jsx';
import IsLoginProvider from './contexts/IsLoginProvider.jsx';

setMetaThemColor();
function App() {
    return (
        <IsLoginProvider>
            <Layout>
                <FavoritesProvider>
                    <CurrencyProvider>
                        <HomePage />
                    </CurrencyProvider>
                </FavoritesProvider>
            </Layout>
        </IsLoginProvider>
    );
}

export default App;
