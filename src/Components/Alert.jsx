import styles from '../styles/Alert.module.css';

function Alert({ message, type }) {
    return (
        <div
            className={`${styles.container} ${
                type ? styles.success : styles.error
            }`}
        >
            <p>{message}</p>
        </div>
    );
}

export default Alert;
