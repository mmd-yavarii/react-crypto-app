import styles from './ErrorPage.module.css';

function ErrorPage({ error }) {
    function reloader() {
        window.location.reload();
    }

    return (
        <div className={styles.container}>
            <img src="./error.webp" alt="Error occurred" />

            <h1>Opps !</h1>
            <p>{error || 'An unexpected error occurred.'}</p>
            <button onClick={reloader}>Reload App</button>
        </div>
    );
}

export default ErrorPage;
