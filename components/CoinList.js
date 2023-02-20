import Coins from "./Coins";

const CoinList = ({ coinsData }) => {
  return (
    <>
      {/* {console.log(coinsData)} */}
      {coinsData &&
        coinsData.map((coin) => {
          return (
            <Coins
              key={coin.id}
              name={coin.name}
              id={coin.id}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              volume={coin.total_volume}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
              sparkline={coin.sparkline_in_7d}
            />
          );
        })}
    </>
  );
};

export default CoinList;
