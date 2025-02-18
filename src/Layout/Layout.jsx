import styles from './Layout.module.css';

function Layout({ children }) {
    return (
        <>
            <header className={styles.header}>
                <h3>Explore</h3>
            </header>

            {children}
        </>
    );
}

export default Layout;
