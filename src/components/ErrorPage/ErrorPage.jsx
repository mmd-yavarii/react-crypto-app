import styles from './ErrorPage.module.css';

function ErrorPage({ error }) {
    function reloader() {
        window.location.reload();
    }

    return (
        <div className={styles.container}>
            <img
                src="https://static.vecteezy.com/system/resources/previews/019/782/468/non_2x/3d-icon-internet-cyber-crime-error-file-free-png.png"
                alt="Error occurred"
            />

            <h1>Opps !</h1>
            <p>{error?.message || 'An unexpected error occurred.'}</p>
            <button onClick={reloader}>Reload App</button>
        </div>
    );
}

export default ErrorPage;
