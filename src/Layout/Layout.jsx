import { Link } from 'react-router-dom';

import styles from './Layout.module.css';
import { CiUser } from 'react-icons/ci';

import { useContext } from 'react';
import { IsLoginContext } from '../contexts/IsLoginProvider';

function Layout({ children }) {
    const { isLogin } = useContext(IsLoginContext);

    return (
        <>
            <header className={styles.header}>
                <h3>Explore</h3>

                {/* log in or dashboard button */}
                {isLogin ? (
                    <button className={styles.dashboard}>
                        <CiUser fontSize="1.3rem" opacity="0.7" />
                    </button>
                ) : (
                    <Link to={'/login'}>
                        <button className={styles.logInBtn}>Login</button>
                    </Link>
                )}
            </header>

            {children}
        </>
    );
}

export default Layout;
