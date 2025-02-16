import axios from 'axios';
import { getMarkeChart } from '../../constant/apis.js';
import Chart from './Chart.jsx';

import styles from './CoinPageInfo.module.css';
import { useEffect, useState } from 'react';

function CoinPageInfo({ info }) {
    const [chartType, setChartType] = useState('prices');
    const [chartData, setChartData] = useState([]);

    const days = 7;

    // get market chart
    useEffect(() => {
        (async () => {
            const response = await axios.get(getMarkeChart(info.id, days));

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

    // set chart type (market_caps, prices, total_volumes)
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
                    {info.name} / {info.symbol}
                </h4>
            </div>

            {/* show price and change price percent */}
            <div className={styles.priceInfo}>
                <p>price : {info.market_data.current_price.bmd} $</p>
                <p>
                    price change :{' '}
                    {info.market_data.price_change_percentage_24h}
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
                />
            ) : (
                <p style={{ textAlign: 'center', margin: '1em 0' }}>
                    Loading...
                </p>
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
