import axios from 'axios';

import { useEffect, useState } from 'react';

import { getCoinList, getCoin } from '../services/apis.js';

import Pagination from '../components/Pagination/Pagination.jsx';
import Loading from '../components/Loading/Loading.jsx';
import CoinList from '../components/CoinList/CoinList.jsx';
import Searchbar from '../components/Searchbar/Searchbar.jsx';
import Modal from '../components/Modal/Modal.jsx';
import CoinPageInfo from '../components/CoinPageInfo/CoinPageInfo.jsx';
import Loading2 from '../components/Loading/Loading2.jsx';
import SuggestedCoins from '../components/SuggestedCoins/SuggestedCoins.jsx';
import ErrorPage from '../components/ErrorPage/ErrorPage.jsx';

function HomePage({ currency, setCurrency, savedCoins, setError }) {
    const [coins, setCoins] = useState([]);

    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1);
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
                setError({
                    show: true,
                    message: error.message,
                });
            } finally {
                setShowLoading(false);
            }
        })();
    }, [page, currency.type]);

    // show coin info in modal
    async function showCoinInfo(id) {
        // set loading
        setModal({
            show: true,
            content: (
                <>
                    <Loading2 height="170px" />
                    <Loading2 height="50px" />
                    <Loading2 height="150px" />
                    <Loading2 height="39px" />
                    <Loading2 height="50px" />
                </>
            ),
        });
        try {
            const response = await axios.get(getCoin(id));
            const data = response.data;

            setModal({
                show: true,
                content: <CoinPageInfo info={data} currency={currency} />,
            });
        } catch (err) {
            setModal({
                show: true,
                content: <ErrorPage error={err} />,
            });
        }
    }

    // modal closer
    function modalCloser(e) {
        if (e.target.classList.contains('close')) {
            setModal({ show: false, content: '' });
        }
    }

    return (
        <>
            {showLoading && <Loading />}

            <Searchbar showCoinInfo={showCoinInfo} setCurrency={setCurrency} />

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

            <Pagination setPage={setPage} />
        </>
    );
}

export default HomePage;
