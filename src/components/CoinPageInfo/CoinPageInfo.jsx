import axios from 'axios';
import { getMarkeChart } from '../../services/apis.js';
import Chart from '../Chart/Chart.jsx';

import styles from './CoinPageInfo.module.css';
import { useEffect, useState } from 'react';
import Loading2 from '../Loading/Loading2.jsx';

function CoinPageInfo({ info, currency }) {
    const [chartType, setChartType] = useState('prices');
    const [chartData, setChartData] = useState([]);

    const days = 7;

    // get market chart price
    useEffect(() => {
        (async () => {
            const response = await axios.get(
                getMarkeChart(info.id, days, currency.type),
            );

            // convert data for show in chart
            const converted = response.data[chartType].map((item) => {
                return {
                    date: item[0],
                    [chartType]: item[1],
                };
            });

            setChartData(converted);
        })();
    }, [days, chartType]);

    function changeChartHandler(e) {
        const value = e.target.innerText.replace(' ', '_');
        setChartType(value);
    }

    return (
        <div className={styles.container}>
            {/* show coin info */}
            <div className={styles.info}>
                <img src={info.image.large} alt={info.name} />
                <h4>
                    {info.name} / {info.symbol.toUpperCase()}
                </h4>
            </div>
            {/* show price and change price percent */}
            <div className={styles.priceInfo}>
                <p>
                    {/* Price :{' '} */}
                    {info.market_data.current_price.bmd.toLocaleString()}{' '}
                    {currency.symbol}
                </p>
                <p>
                    Price Change :{' '}
                    <span
                        className={
                            info.market_data.price_change_percentage_24h > 0
                                ? 'priceChangeGreen'
                                : 'priceChangeRed'
                        }
                    >
                        {info.market_data.price_change_percentage_24h} %
                    </span>
                </p>
            </div>
            {/* show chart */}
            {chartData.length > 0 ? (
                <Chart
                    chartData={chartData}
                    chartType={chartType}
                    color={
                        info.market_data.price_change_percentage_24h > 0
                            ? '#2b913f'
                            : '#f32419'
                    }
                    width="100%"
                    height="250px"
                    showChartInfo={true}
                />
            ) : (
                <div style={{ height: '250px' }}>
                    <Loading2 />
                </div>
            )}
            <div className={styles.buttonsContainer}>
                <button
                    className={`${chartType == 'prices' && styles.seleced} btn`}
                    onClick={changeChartHandler}
                >
                    prices
                </button>
                <button
                    className={`${
                        chartType == 'market_caps' && styles.seleced
                    } btn`}
                    onClick={changeChartHandler}
                >
                    market caps
                </button>
                <button
                    className={`${
                        chartType == 'total_volumes' && styles.seleced
                    } btn`}
                    onClick={changeChartHandler}
                >
                    total volumes
                </button>
            </div>
        </div>
    );
}

export default CoinPageInfo;
