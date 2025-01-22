import styles from '../styles/Contacts.module.css';

function Contact({ info, deleteHandler }) {
    return (
        <div className={styles.container}>
            <p className={styles.userImg}>{info.name[0]}</p>
            <div>
                <p className={styles.name}>{info.name}</p>
                <p className={styles.txt}>{info.phoneNumber}</p>
                <p className={styles.txt}>{info.email}</p>
            </div>
            <button className={styles.deleteBtn} onClick={deleteHandler}>
                <img
                    width="19"
                    height="19"
                    src="https://img.icons8.com/3d-plastilina/69/cancel--v2.png"
                    alt="cancel--v2"
                />
            </button>
        </div>
    );
}

export default Contact;
