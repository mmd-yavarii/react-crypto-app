import { FaArrowTrendUp } from 'react-icons/fa6';
import { FaArrowTrendDown } from 'react-icons/fa6';

import styles from './CoinPageInfo.module.css';

function CoinInfoSection({ info, currency }) {
    return (
        <>
            {/* show coin info */}
            <div className={styles.info}>
                <img src={info.image.large} alt={info.name} />
                <h4>
                    {info.name} / {info.symbol.toUpperCase()}
                </h4>
            </div>
            {/* show price and change price percent */}
            <div className={styles.priceInfo}>
                <div>
                    <p>
                        {/* Price :{' '} */}
                        {currency.symbol}{' '}
                        {info.market_data.current_price.bmd.toLocaleString()}{' '}
                    </p>
                    <p>
                        <span
                            className={
                                info.market_data.price_change_percentage_24h > 0
                                    ? 'priceChangeGreen'
                                    : 'priceChangeRed'
                            }
                        >
                            {/* change price percent :{' '} */}
                            {
                                info.market_data.price_change_percentage_24h
                            } %{' '}
                        </span>
                    </p>
                </div>
                {/* other coin's info */}

                <p className={styles.otherInfo}>
                    <span>
                        <FaArrowTrendUp opacity="0.5" /> {' / '}
                        {info.market_data.high_24h[
                            currency.type
                        ].toLocaleString()}{' '}
                        {currency.symbol}
                    </span>
                    <span>
                        <FaArrowTrendDown opacity="0.5" /> {' / '}
                        {info.market_data.low_24h[
                            currency.type
                        ].toLocaleString()}{' '}
                        {currency.symbol}
                    </span>
                </p>

                <p className={styles.otherInfo}>
                    Market Cap /{' '}
                    {info.market_data.market_cap_change_24h.toLocaleString()}
                </p>
            </div>
        </>
    );
}

export default CoinInfoSection;
