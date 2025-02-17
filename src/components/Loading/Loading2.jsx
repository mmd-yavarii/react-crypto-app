import styles from './Loading2.module.css';

function Loading2({ height }) {
    return <div style={{ height: height }} className={styles.loader}></div>;
}

export default Loading2;
