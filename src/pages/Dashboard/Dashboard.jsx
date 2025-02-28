import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';

import { CiUser } from 'react-icons/ci';

import CoinCard from '../../components/CoinCard/CoinCard';
import { useNavigate } from 'react-router-dom';

function Dashboard({ showCoinInfo }) {
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('favoriteCoins')) || [],
    );

    return (
        <div className={styles.container}>
            <header>
                <div className={styles.profileImage}>
                    <CiUser fontSize="2rem" opacity="0.5" />
                </div>
                <div>
                    <h4>Mohammad Yavarii</h4>
                    <p>eve.holt@reqres.in</p>
                </div>
            </header>

            <main>
                <p className="title">favorited coins</p>

                {favorites.length ? (
                    favorites.map((item) => (
                        <CoinCard
                            info={item}
                            key={item.id}
                            showCoinInfo={showCoinInfo}
                        />
                    ))
                ) : (
                    <p className={styles.noCoinFound}>No bookmarked coin :(</p>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
