import styles from './CoinPageInfo.module.css';

function TimeRange({ timeRange, dispatch }) {
    return (
        <div className={styles.timeBaseContainer}>
            <button
                onClick={() => dispatch('24h')}
                className={
                    timeRange == 1 ? styles.timeSelected : styles.timeButton
                }
            >
                24H
            </button>
            <button
                onClick={() => dispatch('1w')}
                className={
                    timeRange == 7 ? styles.timeSelected : styles.timeButton
                }
            >
                1W
            </button>
            <button
                onClick={() => dispatch('1m')}
                className={
                    timeRange == 30 ? styles.timeSelected : styles.timeButton
                }
            >
                1M
            </button>
            <button
                onClick={() => dispatch('3m')}
                className={
                    timeRange == 90 ? styles.timeSelected : styles.timeButton
                }
            >
                3M
            </button>
            <button
                onClick={() => dispatch('6m')}
                className={
                    timeRange == 180 ? styles.timeSelected : styles.timeButton
                }
            >
                6M
            </button>
            <button
                onClick={() => dispatch('1y')}
                className={
                    timeRange == 365 ? styles.timeSelected : styles.timeButton
                }
            >
                1Y
            </button>
        </div>
    );
}

export default TimeRange;
