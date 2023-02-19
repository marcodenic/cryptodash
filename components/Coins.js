import styles from "../styles/Coins.module.css";
import Link from "next/link";
import React from "react";

const Coins = ({
  name,
  id,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  hasChanged,
  oldPrice,
}) => {
  let bgColorClass;
  let tempBgColorClass;

  if (hasChanged) {
    console.log(name + "has changed. OLD:" + oldPrice + " NEW:" + price);
  }

  if (priceChange < 0) {
    if (hasChanged) {
      bgColorClass = styles.redbgchanged;
    } else {
      bgColorClass = styles.redbg;
    }
  } else {
    if (!hasChanged) {
      bgColorClass = styles.greenbgchanged;
    } else {
      bgColorClass = styles.greenbg;
    }
  }

  return (
    <Link href={`/coin/${id}`}>
      <a>
        <div className={`${styles.coin} ${bgColorClass}`}>
          <img src={image} alt={name} className={styles.coin__img} />

          <div className={styles.coin__details}>
            <p className={styles.coin__symbol}>{symbol}</p>
            {priceChange < 0 ? (
              <p className={(styles.coin__percent, styles.red)}>
                {priceChange.toFixed(2)}
              </p>
            ) : (
              <p className={(styles.coin__percent, styles.green)}>
                {priceChange.toFixed(2)}
              </p>
            )}
          </div>
          <div className={styles.coin__data}>
            <p className={styles.coin__price}>${price}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Coins;
