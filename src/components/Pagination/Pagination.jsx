import { GrNext } from 'react-icons/gr';
import { GrPrevious } from 'react-icons/gr';

import { useEffect, useReducer } from 'react';
import styles from './Pagination.module.css';

function reducer(state, action) {
    switch (action.type) {
        case 'next':
            if (state < 10) return state + 1;
            return 10;

        case 'prev':
            if (state > 1) return state - 1;
            return 1;

        case 'pageNumber':
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

    // scroll to the top of the page after change page
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    // click handler
    function clickHandler(type, payLoad = 0) {
        scrollToTop();

        switch (type) {
            case 'next':
                dispatch({ type: 'next', payload: '' });
                return;
            case 'prev':
                dispatch({ type: 'prev', payload: '' });
                return;
            case 'pageNumber':
                dispatch({ type: 'pageNumber', payload: +payLoad });
                return;
        }
    }

    return (
        <div className={styles.container}>
            <button onClick={() => clickHandler('prev')}>
                <GrPrevious />
            </button>

            {page > 2 && (
                <>
                    <button
                        onClick={(e) =>
                            clickHandler('pageNumber', e.target.innerText)
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
                        onClick={(e) =>
                            clickHandler('pageNumber', e.target.innerText)
                        }
                    >
                        10
                    </button>
                </>
            )}

            <button onClick={() => clickHandler('next')}>
                <GrNext />
            </button>
        </div>
    );
}

export default Pagination;
