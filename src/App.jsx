import { setMetaThemColor } from './helpers/helper.js';

import HomePage from './templates/HomePage';
import Layout from './Layout/Layout';
import FavoritesProvider from './contexts/FavoritesProvider.jsx';
import CurrencyProvider from './contexts/CurrencyProvider.jsx';

setMetaThemColor();
function App() {
    return (
        <Layout>
            <FavoritesProvider>
                <CurrencyProvider>
                    <HomePage />
                </CurrencyProvider>
            </FavoritesProvider>
        </Layout>
    );
}

export default App;
