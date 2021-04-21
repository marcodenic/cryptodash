import styles from '../../styles/Coin.module.css';

const Coin = ({ coin }) => {
    return (
        <div className={styles.coin__page}>
            <div className={styles.coin__container}>
                <img
                    src={coin.image.large}
                    alt={coin.name}
                    className={styles.coin__image}
                />
                <h1 className={styles.coin__name}>{coin.name}</h1>
                <p className={styles.coin__ticker}>{coin.symbol}</p>
                <p className={styles.coin__current}>
                    {coin.market_data.current_price.usd}
                </p>
            </div>
        </div>
    );
};

export default Coin;

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}
    `);
    const data = await res.json();

    return {
        props: {
            coin: data
        }
    };
}