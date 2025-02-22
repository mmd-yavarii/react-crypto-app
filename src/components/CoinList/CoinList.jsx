import styles from './CoinList.module.css';

import CoinCard from './CoinCard';

function CoinList({ coins, showCoinInfo, currency, savedCoins }) {
    return (
        <>
            <h4 className="title">All Coins</h4>

            <div className={styles.itemContainer}>
                {coins.map((item) => (
                    <CoinCard
                        key={item.id}
                        info={item}
                        currency={currency}
                        showCoinInfo={showCoinInfo}
                    />
                ))}
            </div>
        </>
    );
}

export default CoinList;
