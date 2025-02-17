import styles from './CoinPageInfo.module.css';

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className={styles.chartInfo}>
                <p>
                    date :{' '}
                    {new Date(payload[0].payload.date).toLocaleDateString()}
                </p>
                <p>price : {payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
}

function Chart({ chartData, chartType, color }) {
    return (
        <div
            style={{
                width: '100%',
                height: '250px',
                margin: '1em auto',
            }}
        >
            <ResponsiveContainer
                width="100%"
                height="100%"
                style={{
                    margin: '1em 0',
                }}
            >
                <LineChart data={chartData}>
                    <CartesianGrid stroke="transparent" />
                    <YAxis dataKey={chartType} domain={['auto', 'auto']} hide />
                    <XAxis dataKey="date" hide />
                    <Legend />

                    <Tooltip content={<CustomTooltip />} />

                    <Line
                        type="monotone"
                        dataKey={chartType}
                        stroke={color}
                        strokeWidth="2px"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;
