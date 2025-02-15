import { useEffect, useState } from 'react';

import Pagination from './components/Pagination/Pagination.jsx';

const API_KEY = 'CG-Cumz7nKQNwKdLJquCWVCq6BY';
let PER_PAGE = 10;

function App() {
    const [page, setPage] = useState(1);

    useEffect(() => {
        const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${PER_PAGE}&page=${page}&x_cg_demo_api_key=${API_KEY}`;

        fetch(URL, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((json) => console.log(json));
    }, [page]);

    return (
        <>
            <Pagination setPage={setPage} page={page} />
        </>
    );
}

export default App;

('api-');
