import { useEffect, useState } from 'react';

import { CiSearch } from 'react-icons/ci';

import styles from './Searchbar.module.css';
import Loading from '../Loading/Loading';
import { search } from '../../services/apis.js';

function Searchbar({ showCoinInfo }) {
    const [response, setResponse] = useState([]);
    const [showSearchPage, setShowSearchPage] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [inp, setInp] = useState('');

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
                <input
                    type="text"
                    placeholder="Search..."
                    value={inp}
                    onChange={searchHandler}
                />

                <CiSearch />

                {/* show search page */}
                {showSearchPage && (
                    <div className={styles.saerchResult}>
                        {/* show loading */}
                        {showLoading && <Loading />}

                        {/* show response */}
                        {!!response.length &&
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
                    </div>
                )}
            </div>
        </>
    );
}

export default Searchbar;
