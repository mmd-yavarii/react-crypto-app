import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './Layout.module.css';
import { CiUser } from 'react-icons/ci';
import { BiArrowBack } from 'react-icons/bi';

import { IsLoginContext } from '../contexts/IsLoginProvider';

function Layout({ children }) {
    const { isLogin } = useContext(IsLoginContext);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <header className={styles.header}>
                {location.pathname === '/' ? (
                    <>
                        <h3>Explore</h3>

                        {isLogin ? (
                            <button className={styles.dashboard}>
                                <CiUser fontSize="1.3rem" opacity="0.7" />
                            </button>
                        ) : (
                            <Link to="/login">
                                <button className={styles.logInBtn}>
                                    Login
                                </button>
                            </Link>
                        )}
                    </>
                ) : (
                    <BiArrowBack
                        fontSize="1.5rem"
                        onClick={() => navigate(-1)}
                    />
                )}
            </header>

            {children}
        </>
    );
}

export default Layout;
