import styles from "../styles/Searchbar.module.css";

// const Searchbar = ({ ...rest }) => {
//     return (
//         <div className={styles.coin__search}>
//             <input className={styles.coin__input} {...rest} />
//         </div>
//     )
// }

import { useState, useEffect } from "react";

const Searchbar = ({ onCoinSelect }) => {
  const [coinList, setCoinList] = useState([]);
  const [filteredCoinList, setFilteredCoinList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCoinList() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/list"
      );
      const data = await response.json();
      setCoinList(data);
      setFilteredCoinList(data);
    }
    fetchCoinList();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredCoins = coinList.filter((coin) => {
      return coin.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilteredCoinList(filteredCoins);
  };

  const handleCoinSelect = (coinId) => {
    onCoinSelect(coinId);
  };

  return (
    <div className="coin-dropdown">
      <input
        type="text"
        placeholder="Search coins..."
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      {filteredCoinList.length > 0 && (
        <ul>
          {filteredCoinList.map((coin) => (
            <li key={coin.id} onClick={() => handleCoinSelect(coin.id)}>
              <img
                src={`https://coingecko.com/coins/${coin.id}/thumb`}
                alt={coin.name}
              />
              <span>{coin.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// export default CoinDropdown;

export default Searchbar;
