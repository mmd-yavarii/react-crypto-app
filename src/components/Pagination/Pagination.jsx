import styles from './Pagination.module.css';

function Pagination({ setPage, page }) {
    return (
        <div className={styles.container}>
            <button onClick={() => setPage((pre) => pre - 1)}>Previous</button>

            <p>Page {page}</p>

            <button onClick={() => setPage((pre) => pre + 1)}>Next</button>
        </div>
    );
}

export default Pagination;
