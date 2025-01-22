import styles from '../styles/AddPage.module.css';

function AddPage({ inpHandler, btnHandler }) {
    return (
        <div className={styles.page} id="page">
            <div>
                <input
                    type="text"
                    placeholder="Name..."
                    className={styles.inputs}
                    onChange={inpHandler}
                    name="name"
                />
                <input
                    type="number"
                    placeholder="Phone Number..."
                    className={styles.inputs}
                    onChange={inpHandler}
                    name="phoneNumber"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className={styles.inputs}
                    onChange={inpHandler}
                    name="email"
                />
            </div>

            <button className={styles.addBtn} onClick={btnHandler}>
                add
            </button>
        </div>
    );
}

export default AddPage;
