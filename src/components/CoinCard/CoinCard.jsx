import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import styles from './CoinCard.module.css';

import { IoBookmarkOutline } from 'react-icons/io5';
import { IoBookmark } from 'react-icons/io5';

import Chart from '../Chart/Chart.jsx';
import Loading from '../Loading/Loading.jsx';

import { useEffect, useState, useContext } from 'react';
import { getMarkeChart } from '../../services/apis.js';
import { IsLoginContext } from '../../contexts/IsLoginProvider.jsx';

import { CurrencyContext } from '../../contexts/CurrencyProvider.jsx';
import { FavoritesContext } from '../../contexts/FavoritesProvider.jsx';

function CoinCard({ info, showCoinInfo }) {
    const { currency } = useContext(CurrencyContext);
    const { isLogin } = useContext(IsLoginContext);
    const { favoriteCoins, dispatchFavoriteCoins } =
        useContext(FavoritesContext);

    const [chartData, setChartData] = useState([]);

    const isCoinInclude = favoriteCoins.some((i) => i.id == info.id);
    const [isSave, setIsSave] = useState(isCoinInclude);
    const navigate = useNavigate();

    // save coin as favorite
    function storeCoinHandler(event) {
        event.stopPropagation();

        if (isLogin) {
            if (!isSave) {
                dispatchFavoriteCoins({ type: 'ADD', payload: info });
            } else {
                dispatchFavoriteCoins({ type: 'REMOVE', payload: info.id });
            }

            setIsSave((pre) => !pre);
        } else {
            navigate('/login');
        }
    }

    const {
        id,
        image,
        symbol,
        name,
        current_price: price,
        price_change_percentage_24h: priceChange,
        market_cap_change_24h: marketCap,
    } = info;

    // get coin chart
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    getMarkeChart(id, 1, currency.type),
                );

                // convert data for show in chart
                const converted = response.data.prices.map((item) => {
                    return {
                        date: item[0],
                        price: item[1],
                    };
                });

                setChartData(converted);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        })();
    }, [id, currency.type]);

    return (
        <div className={styles.container} onClick={() => showCoinInfo(id)}>
            <div className={styles.coinInformation}>
                <div className={styles.info}>
                    {/* save btn */}
                    {isLogin && isSave ? (
                        <IoBookmark
                            opacity="0.8"
                            fontSize="1.3rem"
                            onClick={storeCoinHandler}
                        />
                    ) : (
                        <IoBookmarkOutline
                            opacity="0.8"
                            fontSize="1.3rem"
                            onClick={storeCoinHandler}
                        />
                    )}

                    {/* image and coin name  */}
                    <img src={image} alt={symbol} />
                    <div>
                        <p>{symbol.toUpperCase()}</p>
                        <p>{name}</p>
                    </div>
                </div>
                <p className={styles.marketCap}>
                    maket cap {Math.floor(marketCap)}
                </p>

                {/* price and change price info */}
                <div className={styles.price}>
                    <p>
                        {price.toLocaleString()} {currency.symbol}
                    </p>
                    <p
                        className={
                            priceChange > 0
                                ? 'priceChangeGreen'
                                : 'priceChangeRed'
                        }
                    >
                        {priceChange.toFixed(2)} %
                    </p>
                </div>
            </div>

            {/* Chart with updated chartData */}
            <div
                className={`${styles.chart} ${
                    priceChange > 0 ? styles.greenChart : styles.redChart
                }`}
            >
                {chartData.length ? (
                    <Chart
                        width="100%"
                        height="100%"
                        chartType="price"
                        chartData={chartData}
                        color={priceChange > 0 ? '#0fc97f' : '#F6465D'}
                        showChartInfo={false}
                    />
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}
export default CoinCard;
