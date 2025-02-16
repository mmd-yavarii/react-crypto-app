import styles from './CoinList.module.css';

function CoinList({ coins, showCoinInfo }) {
    return (
        <div>
            {coins.map((item) => (
                <div
                    key={item.id}
                    className={styles.container}
                    onClick={() => showCoinInfo(item.id)}
                >
                    <div className={styles.info}>
                        <img src={item.image} alt={item.symbol} />
                        <div>
                            <p>{item.name}</p>
                            <p>{item.symbol}</p>
                        </div>
                    </div>

                    <div className={styles.price}>
                        <p>{item.current_price.toFixed(2)} $</p>
                        <p
                            className={
                                item.price_change_percentage_24h < 0
                                    ? styles.decrease
                                    : styles.increase
                            }
                        >
                            {item.price_change_percentage_24h.toFixed(2)} %
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CoinList;
