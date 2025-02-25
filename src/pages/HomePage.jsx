import axios from 'axios';

import { useEffect, useReducer, useState, useContext } from 'react';
import { CurrencyContext } from '../contexts/CurrencyProvider.jsx';

import { getCoinList, getCoin } from '../services/apis.js';

import Pagination from '../components/Pagination/Pagination.jsx';
import PageLoading from '../components/Loading/PageLoading.jsx';
import CoinList from '../components/CoinList/CoinList.jsx';
import Searchbar from '../components/Searchbar/Searchbar.jsx';
import Modal from '../components/Modal/Modal.jsx';
import CoinPageInfo from '../components/CoinPageInfo/CoinPageInfo.jsx';
import Loading from '../components/Loading/Loading.jsx';
import SuggestedCoins from '../components/SuggestedCoins/SuggestedCoins.jsx';
import ErrorPage from '../components/ErrorPage/ErrorPage.jsx';

// set coin reducer
const initialCoinsState = {
    isLoading: true,
    coins: [],
    error: '',
};
function coinsReducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return { ...state, isLoading: true };

        case 'SUCCESS':
            return { isLoading: false, coins: action.payload, error: '' };

        case 'FAILED':
            return { isLoading: false, coins: [], error: action.payload };

        default:
            throw new Error('Invalid Action Type');
    }
}

function HomePage({}) {
    const [coins, dispachCoins] = useReducer(coinsReducer, initialCoinsState);
    const { currency, setCurrency } = useContext(CurrencyContext);

    const [page, setPage] = useState(1);
    const [modal, setModal] = useState({
        show: false,
        content: 'hello',
    });

    // get coins to show in main page
    useEffect(() => {
        const URL = getCoinList(currency.type, page);
        dispachCoins({ type: 'LOADING' });

        (async () => {
            try {
                const response = await axios.get(URL);
                dispachCoins({ type: 'SUCCESS', payload: response.data });
            } catch (error) {
                dispachCoins({ type: 'FAILED', payload: error.message });
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
                    <Loading height="170px" />
                    <Loading height="50px" />
                    <Loading height="150px" />
                    <Loading height="39px" />
                    <Loading height="50px" />
                </>
            ),
        });
        try {
            const response = await axios.get(getCoin(id));
            const data = response.data;

            setModal({
                show: true,
                content: <CoinPageInfo info={data} />,
            });
        } catch (err) {
            setModal({
                show: true,
                content: <ErrorPage error={err.message} />,
            });
        }
    }

    // modal closer
    function modalCloser(e) {
        if (e.target.classList.contains('close')) {
            setModal({ show: false, content: '' });
        }
    }

    if (!coins.error) {
        return (
            <>
                {coins.isLoading && <PageLoading />}

                <Searchbar
                    isLoading={coins.isLoading}
                    showCoinInfo={showCoinInfo}
                    setCurrency={setCurrency}
                />

                {page == 1 && (
                    <SuggestedCoins
                        coins={coins.coins.slice(
                            Math.floor(Math.random() * 5),
                            8,
                        )}
                        showCoinInfo={showCoinInfo}
                    />
                )}

                <CoinList coins={coins.coins} showCoinInfo={showCoinInfo} />

                {modal.show && (
                    <Modal
                        content={modal.content}
                        closeModalHandler={modalCloser}
                    />
                )}

                <Pagination setPage={setPage} />
            </>
        );
    } else {
        return (
            <div style={{ height: '80dvh' }}>
                <ErrorPage error={coins.error} />
            </div>
        );
    }
}

export default HomePage;
