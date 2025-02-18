import styles from './Pagination.module.css';

function Pagination({ setPage, page }) {
    // scroll to the top of the page after change page
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <div className={styles.container}>
            <button
                onClick={
                    page > 1
                        ? () => {
                              setPage((pre) => pre - 1);
                              scrollToTop();
                          }
                        : () => {}
                }
            >
                Previous
            </button>

            <p>Page {page}</p>

            <button
                onClick={() => {
                    setPage((pre) => pre + 1);
                    scrollToTop();
                }}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
