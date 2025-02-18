import axios from 'axios';
import { useEffect, useState } from 'react';

import { getCoinList, getCoin } from './services/apis.js';

import Pagination from './components/Pagination/Pagination.jsx';
import Loading from './components/Loading/Loading.jsx';
import CoinList from './components/CoinList/CoinList.jsx';
import Searchbar from './components/Searchbar/Searchbar.jsx';
import Layout from './layout/Layout.jsx';
import Modal from './components/Modal/Modal.jsx';
import CoinPageInfo from './components/CoinPageInfo/CoinPageInfo.jsx';
import Loading2 from './components/Loading/Loading2.jsx';
import SuggestedCoins from './components/SuggestedCoins/SuggestedCoins.jsx';

function App() {
    const [coins, setCoins] = useState([]);

    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState({ type: 'usd', symbol: '$' });
    const [modal, setModal] = useState({
        show: false,
        content: 'hello',
    });

    // get coins to show in main page
    useEffect(() => {
        const URL = getCoinList(currency.type, page);
        setShowLoading(true);

        (async () => {
            try {
                const response = await axios.get(URL);
                setCoins(response.data);
            } catch (error) {
                alert(error);
            } finally {
                setShowLoading(false);
            }
        })();
    }, [page]);

    // show a coin info page
    async function showCoinInfo(id) {
        // set loading
        setModal({
            show: true,
            content: (
                <>
                    <Loading2 height="45px" />
                    <Loading2 height="40px" />
                    <Loading2 height="220px" />
                    <Loading2 height="31px" />
                </>
            ),
        });
        const response = await axios.get(getCoin(id));
        const data = response.data;

        setModal({
            show: true,
            content: <CoinPageInfo info={data} currency={currency} />,
        });
    }

    // modal closer
    function modalCloser(e) {
        if (e.target.classList.contains('close')) {
            setModal({ show: false, content: '' });
        }
    }

    return (
        <>
            <Layout>
                {showLoading && <Loading />}

                <Searchbar showCoinInfo={showCoinInfo} />

                {page == 1 && (
                    <SuggestedCoins
                        coins={coins.slice(Math.floor(Math.random() * 5), 8)}
                        showCoinInfo={showCoinInfo}
                        currency={currency}
                    />
                )}

                <CoinList
                    coins={coins}
                    showCoinInfo={showCoinInfo}
                    currency={currency}
                />

                {modal.show && (
                    <Modal
                        content={modal.content}
                        closeModalHandler={modalCloser}
                    />
                )}

                <Pagination setPage={setPage} page={page} />
            </Layout>
        </>
    );
}

export default App;
