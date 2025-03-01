import { GrNext } from 'react-icons/gr';
import { GrPrevious } from 'react-icons/gr';

import styles from './Pagination.module.css';
import { Link, useParams } from 'react-router-dom';

function Pagination({}) {
    const { page } = useParams();

    return (
        <div className={styles.container}>
            <Link
                to={`/explore/${+page - 1}`}
                className={page <= 1 ? styles.disabled : null}
            >
                <GrPrevious />
            </Link>

            {page > 2 && (
                <>
                    <Link to={`/explore/${1}`}>1</Link>
                </>
            )}

            <div className={styles.selected}>{page}</div>

            {page != 10 && (
                <>
                    <p>...</p>
                    <Link to={`/explore/${10}`}>10</Link>
                </>
            )}

            <Link
                to={`/explore/${+page + 1}`}
                className={page >= 10 ? styles.disabled : null}
            >
                <GrNext />
            </Link>
        </div>
    );
}

export default Pagination;
