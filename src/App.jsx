import { useState } from 'react';

import HomePage from './templates/homePage';
import Layout from './Layout/Layout';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
    const [currency, setCurrency] = useState({ type: 'usd', symbol: '$' });
    const [error, setError] = useState({
        show: false,
        message: '',
    });

    return (
        <>
            {error.show ? (
                <ErrorPage message={error.message} />
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
