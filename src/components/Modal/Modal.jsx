import styles from './Modal.module.css';

function Modal({ closeModalHandler, content }) {
    return (
        <div
            className={`close ${styles.backgroumd}`}
            onClick={closeModalHandler}
        >
            <div className={styles.conainer}>{content}</div>
        </div>
    );
}

export default Modal;
