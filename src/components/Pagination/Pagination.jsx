import { GrNext } from 'react-icons/gr';
import { GrPrevious } from 'react-icons/gr';

import { useEffect, useReducer } from 'react';
import styles from './Pagination.module.css';

// scroll to the top of the page after change page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

function reducer(state, action) {
    switch (action.type) {
        case 'next':
            if (state < 10) {
                scrollToTop();
                return state + 1;
            }
            return 10;

        case 'prev':
            if (state > 1) {
                scrollToTop();
                return state - 1;
            }
            return 1;

        case 'pageNumber':
            scrollToTop();
            return action.payload;

        default:
            throw new Error('Action is not valied');
    }
}

function Pagination({ setPage }) {
    const [page, dispatch] = useReducer(reducer, 1);

    useEffect(() => {
        setPage(page);
    }, [page]);

    return (
        <div className={styles.container}>
            <button
                className={page <= 1 ? styles.disabled : null}
                onClick={() => dispatch({ type: 'prev' })}
            >
                <GrPrevious />
            </button>

            {page > 2 && (
                <>
                    <button
                        onClick={() =>
                            dispatch({ type: 'pageNumber', payload: 1 })
                        }
                    >
                        1
                    </button>
                </>
            )}

            <div className={styles.selected}>{page}</div>

            {page != 10 && (
                <>
                    <p>...</p>
                    <button
                        onClick={() =>
                            dispatch({ type: 'pageNumber', payload: 10 })
                        }
                    >
                        10
                    </button>
                </>
            )}

            <button
                className={page >= 10 ? styles.disabled : null}
                onClick={() => dispatch({ type: 'next' })}
            >
                <GrNext />
            </button>
        </div>
    );
}

export default Pagination;
