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

function Chart({ chartData, chartType, color }) {
    return (
        <div
            style={{
                width: '100%',
                height: '250px',
                margin: '1em auto',
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid stroke="transparent" />
                    <YAxis dataKey={chartType} domain={['auto', 'auto']} hide />
                    <XAxis dataKey="date" hide />
                    <Legend />

                    {/* Tooltip with custom styles */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'black',
                            border: 'none',
                        }}
                        labelStyle={{ color: 'white' }}
                    />

                    <Line
                        type="monotone"
                        dataKey={chartType}
                        stroke={color}
                        strokeWidth="1px"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;
