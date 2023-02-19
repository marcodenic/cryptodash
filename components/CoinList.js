import Coins from "./Coins";

const CoinList = ({ coinsData }) => {
  let oldPrice;

  return (
    <>
      {/* {console.log(coinsData)} */}
      {coinsData &&
        coinsData.map((coin) => {
          oldPrice = coin.current_price;
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
              hasChanged={oldPrice !== coin.current_price}
              oldPrice={oldPrice}
            />
          );
        })}
    </>
  );
};

export default CoinList;
