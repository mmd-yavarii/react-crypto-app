import styles from './CoinList.module.css';

import axios from 'axios';

import { IoBookmarkOutline } from 'react-icons/io5';
import { IoBookmark } from 'react-icons/io5';

import Chart from '../Chart/Chart';
import Loading2 from '../Loading/Loading2.jsx';

import { useEffect, useState } from 'react';
import { getMarkeChart } from '../../services/apis.js';

function CoinList({ coins, showCoinInfo, currency }) {
    return (
        <>
            <h4 className="title">All Coins</h4>

            <div className={styles.itemContainer}>
                {coins.map((item) => (
                    <CoinCard
                        key={item.id}
                        info={item}
                        currency={currency}
                        showCoinInfo={showCoinInfo}
                    />
                ))}
            </div>
        </>
    );
}

export default CoinList;

// coin card
function CoinCard({ info, showCoinInfo, currency }) {
    const [chartData, setChartData] = useState([]);
    const [isSave, setIsSave] = useState();

    // store a coin
    function storeCoinHandler(event) {
        event.stopPropagation();

        setIsSave((pre) => !pre);
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
                {/* save btn */}
                <div className={styles.info}>
                    {isSave ? (
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
                    <Loading2 />
                )}
            </div>
        </div>
    );
}
