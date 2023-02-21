import styles from "../styles/Coins.module.css";
import Link from "next/link";
import React from "react";
import CoinGraph from "./CoinGraph";

const Coins = ({
  name,
  id,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  sparkline,
  oldPrice,
}) => {
  let bgColorClass;

  //quick flash of colour when price changes +/-
  if (priceChange < 0) {
    bgColorClass = styles.redbgchanged;
  } else if (priceChange > 0) {
    bgColorClass = styles.greenbgchanged;
  }

  return (
    <Link href={`/coin/${id}`}>
      <div className={`${styles.coin} ${bgColorClass}`}>
        <img src={image} alt={name} className={styles.coin__img} />

        <div className={styles.coin__details}>
          <p className={styles.coin__symbol}>{symbol}</p>
          {priceChange < 0 ? (
            <p className={(styles.coin__percent, styles.red)}>
              {priceChange.toFixed(2)}%
            </p>
          ) : (
            <p className={(styles.coin__percent, styles.green)}>
              {priceChange.toFixed(2)}%
            </p>
          )}
        </div>
        <div className={styles.coin__data}>
          {priceChange < 0 ? (
            <p className={(styles.coin__price, styles.red)}>${price}</p>
          ) : priceChange > 0 ? (
            <p className={(styles.coin__price, styles.green)}>${price}</p>
          ) : (
            <p className={styles.coin__price}>${price}</p>
          )}
        </div>

        <div>
          <CoinGraph data={sparkline} id={id} priceChange={priceChange} />
        </div>
      </div>
    </Link>
  );
};

export default Coins;
