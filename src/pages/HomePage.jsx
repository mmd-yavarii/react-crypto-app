import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useEffect, useReducer, useState, useContext } from 'react';
import { CurrencyContext } from '../contexts/CurrencyProvider.jsx';

import { getCoinList, getCoin } from '../services/apis.js';

import Pagination from '../components/Pagination/Pagination.jsx';
import PageLoading from '../components/Loading/PageLoading.jsx';
import CoinList from '../components/CoinList/CoinList.jsx';
import Searchbar from '../components/Searchbar/Searchbar.jsx';
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

function HomePage({ showCoinInfo }) {
    const [coins, dispachCoins] = useReducer(coinsReducer, initialCoinsState);
    const { currency, setCurrency } = useContext(CurrencyContext);

    // const [page, setPage] = useState(1);
    const params = useParams();
    const page = params.page || 1;

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

                <Pagination />
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
