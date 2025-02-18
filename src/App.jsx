import { useState } from 'react';

import HomePage from './templates/homePage';

function App() {
    const [currency, setCurrency] = useState({ type: 'usd', symbol: '$' });

    return (
        <>
            <HomePage currency={currency} setCurrency={setCurrency} />
        </>
    );
}

export default App;
