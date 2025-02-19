import { useState } from 'react';

import { setMetaThemColor } from './service/helper.js';

import HomePage from './templates/HomePage';
import Layout from './Layout/Layout';
import ErrorPage from './components/ErrorPage/ErrorPage';

setMetaThemColor();

function App() {
    const [currency, setCurrency] = useState({ type: 'usd', symbol: '$' });
    const [error, setError] = useState({
        show: false,
        message: '',
    });

    return (
        <>
            {error.show ? (
                <div style={{ height: '100dvh' }}>
                    <ErrorPage error={error} />
                </div>
            ) : (
                <Layout>
                    <HomePage
                        currency={currency}
                        setCurrency={setCurrency}
                        error={error}
                        setError={setError}
                    />
                </Layout>
            )}
        </>
    );
}

export default App;
