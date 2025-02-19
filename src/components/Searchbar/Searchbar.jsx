import { useEffect, useState } from 'react';

import { IoSearch } from 'react-icons/io5';

import styles from './Searchbar.module.css';
import Loading from '../Loading/Loading';
import ErrorPage from '../ErrorPage/ErrorPage.jsx';

import { search } from '../../services/apis.js';

function Searchbar({ showCoinInfo, setCurrency }) {
    const [response, setResponse] = useState([]);
    const [showSearchPage, setShowSearchPage] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [inp, setInp] = useState('');

    const [error, setError] = useState({
        show: false,
        error: '',
    });

    // get data
    useEffect(() => {
        const blocker = new AbortController();
        setShowLoading(true);

        (async () => {
            try {
                const res = await fetch(search(inp), {
                    signal: blocker.signal,
                });
                const json = await res.json();

                if (json.coins.length) {
                    setResponse(json.coins);
                } else {
                    setShowSearchPage(false);
                }
            } catch (error) {
                if (error.name != 'AbortError') {
                    setError({ show: true, error: error });
                }
            } finally {
                setShowLoading(false);
            }
        })();

        return () => blocker.abort();
    }, [inp]);

    // search handler
    function searchHandler(event) {
        setInp(event.target.value);
        if (event.target.value.length) {
            setShowSearchPage(true);
        } else {
            setShowSearchPage(false);
        }
    }

    // close search page after click out of it
    function closePageHandler() {
        setInp('');
        setShowSearchPage(false);
    }

    return (
        <>
            {showSearchPage && (
                <div
                    className={styles.backPage}
                    onClick={closePageHandler}
                ></div>
            )}

            <div className={styles.container}>
                <div className={styles.nav}>
                    <div className={styles.searchInp}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={inp}
                            onChange={searchHandler}
                        />

                        <IoSearch opacity="0.5" />
                    </div>

                    <select
                        onChange={(event) =>
                            setCurrency(JSON.parse(event.target.value))
                        }
                    >
                        <option
                            value={JSON.stringify({ type: 'usd', symbol: '$' })}
                        >
                            usd
                        </option>
                        <option
                            value={JSON.stringify({ type: 'eur', symbol: '€' })}
                        >
                            eur
                        </option>
                        <option
                            value={JSON.stringify({ type: 'jpy', symbol: '¥' })}
                        >
                            jpy
                        </option>
                    </select>
                </div>

                {/* show search page */}
                {showSearchPage && (
                    <div className={styles.saerchResult}>
                        {/* show loading */}
                        {showLoading && <Loading />}

                        {/* show search response page */}
                        {!!response.length &&
                            !error.show &&
                            !showLoading &&
                            response.map((item) => (
                                <div
                                    key={item.id}
                                    className={styles.responseItm}
                                    onClick={() => showCoinInfo(item.id)}
                                >
                                    <img src={item.thumb} alt={item.symbol} />
                                    <p>{item.name}</p>
                                </div>
                            ))}

                        {error.show && !showLoading && (
                            <ErrorPage error={error.error} />
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Searchbar;
