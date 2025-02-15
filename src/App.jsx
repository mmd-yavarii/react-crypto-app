import { useEffect, useState } from 'react';

import Pagination from './components/Pagination/Pagination.jsx';
import Loading from './components/Loading/Loading.jsx';
import CoinList from './components/CoinList/CoinList.jsx';

// api config
const API_KEY = 'CG-Cumz7nKQNwKdLJquCWVCq6BY';
let PER_PAGE = 10;

function App() {
    const [coins, setCoins] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1);

    // get data from api
    useEffect(() => {
        const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${PER_PAGE}&page=${page}&x_cg_demo_api_key=${API_KEY}`;
        setShowLoading(true);

        (async () => {
            try {
                const res = await fetch(URL);
                const json = await res.json();
                setCoins(json);
            } catch (error) {
                alert(error);
            } finally {
                setShowLoading(false);
            }
        })();
    }, [page]);

    return (
        <>
            {showLoading && <Loading />}

            <CoinList coins={coins} />

            <Pagination setPage={setPage} page={page} />
        </>
    );
}

export default App;

('api-');
