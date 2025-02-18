import styles from './SuggestedCoins.module.css';

function SuggestedCoins({ coins, showCoinInfo }) {
    return (
        <>
            <h4 className="title">Suggested Coins</h4>

            <div className={styles.container}>
                {coins.map((item) => (
                    <Coin
                        key={item.id}
                        info={item}
                        showCoinInfo={showCoinInfo}
                    />
                ))}
            </div>
        </>
    );
}

export default SuggestedCoins;

function Coin({ info, showCoinInfo }) {
    return (
        <div className={styles.coins} onClick={() => showCoinInfo(info.id)}>
            <div className={styles.symbol}>
                <img src={info.image} alt="" />
                <p>
                    {info.symbol.toUpperCase()}{' '}
                    <span className={styles.name}>{info.name}</span>
                </p>
            </div>

            <div className={styles.priceInfo}>
                <p>{info.current_price.toFixed(2)} $</p>
                <p
                    className={
                        info.price_change_percentage_24h > 0
                            ? 'priceChangeGreen'
                            : 'priceChangeRed'
                    }
                >
                    {info.price_change_percentage_24h.toFixed(2)} %
                </p>
            </div>
        </div>
    );
}
