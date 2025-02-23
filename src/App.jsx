import { useState } from 'react';

import { setMetaThemColor } from './helpers/helper.js';

import HomePage from './templates/HomePage';
import Layout from './Layout/Layout';
import ErrorPage from './components/ErrorPage/ErrorPage';

setMetaThemColor();

// // exchange coin with currency
// function exhange(amount) {
//     const coinPrice = info.market_data.current_price.bmd;
//     console.log(amount * coinPrice);
// }

// save coins in favorite list
const savedCoins = JSON.parse(localStorage.getItem('savedCoins')) || [];

function App() {
    const [currency, setCurrency] = useState({ type: 'usd', symbol: '$' });

    return (
        <>
            <Layout>
                <HomePage currency={currency} setCurrency={setCurrency} />
            </Layout>
        </>
    );
}

export default App;
