import styles from '../styles/Contacts.module.css';

function Contact({ info }) {
    return (
        <div className={styles.container}>
            <p className={styles.userImg}>{info.name[0]}</p>
            <div>
                <p className={styles.name}>{info.name}</p>
                <p className={styles.txt}>{info.phoneNumber}</p>
                <p className={styles.txt}>{info.email}</p>
            </div>
        </div>
    );
}

export default Contact;
