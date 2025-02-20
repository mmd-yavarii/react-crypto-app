import styles from './CoinPageInfo.module.css';

import Chart from '../Chart/Chart.jsx';
import Loading2 from '../Loading/Loading2.jsx';

function CoinChart({ info, chartData, chartType, setChartType }) {
    // set chart type
    function changeChartHandler(e) {
        const value = e.target.innerText.replace(' ', '_');
        setChartType(value);
    }

    return (
        <>
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
                    height="160px"
                    showChartInfo={true}
                />
            ) : (
                <div style={{ height: '250px' }}>
                    <Loading2 />
                </div>
            )}
            <div className={styles.buttonsContainer}>
                <button
                    onClick={changeChartHandler}
                    className={`${chartType == 'prices' && styles.seleced} btn`}
                >
                    prices
                </button>
                <button
                    onClick={changeChartHandler}
                    className={`${
                        chartType == 'market_caps' && styles.seleced
                    } btn`}
                >
                    market caps
                </button>
                <button
                    onClick={changeChartHandler}
                    className={`${
                        chartType == 'total_volumes' && styles.seleced
                    } btn`}
                >
                    total volumes
                </button>
            </div>
        </>
    );
}

export default CoinChart;
