import styles from './ErrorPage.module.css';

function ErrorPage({ message }) {
    function reloader() {
        location.reload();
    }

    return (
        <div className={styles.container}>
            <h1>Opps</h1>
            <p>{message}</p>
            <button onClick={reloader}>Reload</button>
        </div>
    );
}

export default ErrorPage;
