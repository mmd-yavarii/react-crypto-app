import styles from './Loading.module.css';

function Loading({ height }) {
    return <div style={{ height: height }} className={styles.loader}></div>;
}

export default Loading;
