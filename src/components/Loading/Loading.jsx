import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={styles.loader}>
            <span className={styles.element}></span>
            <span className={styles.element}></span>
            <span className={styles.element}></span>
        </div>
    );
}

export default Loading;
