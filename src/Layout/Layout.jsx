import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './Layout.module.css';
import { CiUser } from 'react-icons/ci';
import { BiArrowBack } from 'react-icons/bi';

import { IsLoginContext } from '../contexts/IsLoginProvider';

function Layout({ children }) {
    const { isLogin, changeLogin } = useContext(IsLoginContext);
    const location = useLocation();
    const navigate = useNavigate();

    // log out
    function logOutHandler() {
        const confirmation = confirm('Are you sure you want to log out?');
        if (confirmation) {
            localStorage.removeItem('isLogin');
            changeLogin(false);
            navigate('/');
        }
    }

    return (
        <>
            <header className={styles.header}>
                {location.pathname === '/' ? (
                    <>
                        <h3>Explore</h3>

                        {isLogin ? (
                            <Link to="/dashboard">
                                <button className={styles.dashboard}>
                                    <CiUser fontSize="1.3rem" opacity="0.7" />
                                </button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <button className={styles.logInBtn}>
                                    Login
                                </button>
                            </Link>
                        )}
                    </>
                ) : (
                    <>
                        <BiArrowBack
                            className={styles.backArrow}
                            fontSize="1.5rem"
                            onClick={() => navigate(-1)}
                        />
                        {location.pathname === '/dashboard' && (
                            <button
                                onClick={logOutHandler}
                                className={styles.logOut}
                            >
                                Logout
                            </button>
                        )}
                    </>
                )}
            </header>

            {children}
        </>
    );
}

export default Layout;
