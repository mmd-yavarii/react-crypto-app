import CoinCard from '../CoinCard/CoinCard';

function CoinList({ coins, showCoinInfo, currency, savedCoins }) {
    return (
        <>
            <h4 className="title">All Coins</h4>

            <div>
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
