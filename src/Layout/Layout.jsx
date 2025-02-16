import { CiUser } from 'react-icons/ci';

import styles from './Layout.module.css';

function Layout({ children, title, isLogin }) {
    return (
        <>
            <header className={styles.header}>
                <h3>{title}</h3>

                {isLogin ? (
                    <div className={styles.dashboard}>
                        <CiUser fontSize="1.2rem" opacity="0.8" />
                    </div>
                ) : (
                    <button className={styles.logInBtn}>Login</button>
                )}
            </header>

            {children}
        </>
    );
}

export default Layout;
