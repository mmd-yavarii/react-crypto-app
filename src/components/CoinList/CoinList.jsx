import styles from './CoinList.module.css';

function CoinList({ coins, showCoinInfo }) {
    return (
        <>
            <h4 className="title">All Coins</h4>

            <div className={styles.itemContainer}>
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
                                <p>{item.symbol.toUpperCase()}</p>
                            </div>
                        </div>

                        <div className={styles.price}>
                            <p>{item.current_price.toLocaleString()} $</p>
                            <p
                                className={
                                    item.price_change_percentage_24h > 0
                                        ? 'priceChangeGreen'
                                        : 'priceChangeRed'
                                }
                            >
                                {item.price_change_percentage_24h.toFixed(2)} %
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CoinList;
