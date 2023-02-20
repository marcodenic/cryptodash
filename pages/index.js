import CoinList from "../components/CoinList";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import useSWR from "swr";

export default function Home({ coinsData }) {
  const [search, setSearch] = useState("");
  const {
    data: coinsApiData,
    isValidating,
    mutate,
  } = useSWR(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false",
    {
      revalidateOnFocus: false,
      refreshWhenonline: true,
      shouldRetryOnError: true,
      useSuspense: true,
    }
  );
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // const filteredCoins = coinsData.filter((coin) =>
  //   coin.name.toLowerCase().includes(search.toLowerCase())
  // );

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };

  // This runs when the page first loads
  useEffect(() => {
    const fetchCoinsData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=1h"
      );

      const newData = await response.json();

      //log the time and data
      console.log(new Date(), newData);
      // console.log();
      mutate(newData);
      setIsDataLoaded(true);
    };

    fetchCoinsData();
    const intervalId = setInterval(fetchCoinsData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="coin__grid">
      {/* <SearchBar type="text" placeholder="Search" onChange={handleChange} /> */}
      <CoinList coinsData={coinsApiData} />
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const res = await fetch(
//     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
//   );

//   const coinsData = await res.json();

//   return {
//     props: {
//       coinsData,
//     },
//   };
// };
