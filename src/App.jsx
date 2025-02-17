import axios from 'axios';
import { useEffect, useState } from 'react';

import { getCoinList, getCoin, currency } from './constant/apis.js';
import { autoDarkmoodHandler } from './constant/helper.js';

import Pagination from './components/Pagination/Pagination.jsx';
import Loading from './components/Loading/Loading.jsx';
import CoinList from './components/CoinList/CoinList.jsx';
import Searchbar from './components/Searchbar/Searchbar.jsx';
import Layout from './layout/Layout.jsx';
import Modal from './components/Modal/Modal.jsx';
import CoinPageInfo from './components/CoinPageInfo/CoinPageInfo.jsx';
import Loading2 from './components/Loading/Loading2.jsx';

function App() {
    const [coins, setCoins] = useState([]);

    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState({
        show: false,
        content: 'hello',
    });

    // get coins to show in main page
    useEffect(() => {
        const URL = getCoinList.concat(`&page=${page}`);
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
        setModal({ show: true, content: <Loading2 height="457px" /> });

        const response = await axios.get(getCoin(id));
        const data = response.data;

        setModal({ show: true, content: <CoinPageInfo info={data} /> });
    }

    // modal closer
    function modalCloser(e) {
        if (e.target.classList.contains('close')) {
            setModal({ show: false, content: '' });
        }
    }

    // set dark / light mood by system them
    autoDarkmoodHandler();

    return (
        <>
            <Layout>
                {showLoading && <Loading />}

                <Searchbar showCoinInfo={showCoinInfo} />

                <CoinList coins={coins} showCoinInfo={showCoinInfo} />

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
