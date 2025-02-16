import { useEffect, useState } from 'react';

import { BASE_URL, API_KEY, PER_PAGE } from './constant/helper.js';
import Pagination from './components/Pagination/Pagination.jsx';
import Loading from './components/Loading/Loading.jsx';
import CoinList from './components/CoinList/CoinList.jsx';
import Searchbar from './components/Searchbar/Searchbar.jsx';
import Layout from './layout/Layout.jsx';

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [coins, setCoins] = useState([]);

    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1);

    // get data from api
    useEffect(() => {
        const URL = `${BASE_URL}/coins/markets?vs_currency=usd&per_page=${PER_PAGE}&page=${page}&x_cg_demo_api_key=${API_KEY}`;
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

    // show a coin info page
    function showCoinInfo(id) {
        console.log(`${BASE_URL}/coins/${id}?x_cg_demo_api_key=${API_KEY}`);
    }

    return (
        <>
            <Layout title="Explore" isLogin={isLogin}>
                {showLoading && <Loading />}

                <Searchbar showCoinInfo={showCoinInfo} />
                <CoinList coins={coins} showCoinInfo={showCoinInfo} />

                <Pagination setPage={setPage} page={page} />
            </Layout>
        </>
    );
}

export default App;

('api-');
