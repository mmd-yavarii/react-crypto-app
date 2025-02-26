import { Link } from 'react-router-dom';

import styles from './404.module.css';

function PageNotFound() {
    return (
        <div className={styles.container}>
            <img src="../../public/error.webp" alt="404" />
            <h1>404 !</h1>
            <h4>Page Not Found :(</h4>
            <Link to="/">Go To Home Page</Link>
        </div>
    );
}

export default PageNotFound;
