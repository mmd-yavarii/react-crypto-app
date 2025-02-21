import axios from 'axios';
import { getMarkeChart } from '../../services/apis.js';

import styles from './CoinPageInfo.module.css';

import { useEffect, useReducer, useState } from 'react';

// CoinPageInfo

import Info from './Info.jsx';
import TimeRange from './TimeRange.jsx';
import CoinChart from './CoinChart.jsx';

// set base time for chart
function reducer(state, action) {
    switch (action) {
        case '24h':
            return 1;

        case '1w':
            return 7;

        case '1m':
            return 30;

        case '3m':
            return 90;

        case '6m':
            return 180;

        case '1y':
            return 365;
    }
}

function CoinPageInfo({ info, currency }) {
    const [timeRange, dispatch] = useReducer(reducer, 1);

    const [chartType, setChartType] = useState('prices');
    const [chartData, setChartData] = useState([]);

    // get market chart price
    useEffect(() => {
        (async () => {
            const response = await axios.get(
                getMarkeChart(info.id, timeRange, currency.type),
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
    }, [timeRange, chartType]);

    return (
        <div className={styles.container}>
            <Info info={info} currency={currency} />

            {/* timer range buttons */}
            <TimeRange timeRange={timeRange} dispatch={dispatch} />

            {/* get price time base */}
            <CoinChart
                info={info}
                chartData={chartData}
                chartType={chartType}
                setChartType={setChartType}
            />

            <a
                href={`https://www.binance.com/en/price/${
                    info.id
                }/${currency.type.toUpperCase()}`}
                target="_blank"
                className={styles.exchangeBtn}
            >
                Exchange
            </a>
        </div>
    );
}

export default CoinPageInfo;
