import CoinList from "../components/CoinList";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import useSWR from "swr";

export default function Home({ coinsData }) {
  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=true&price_change_percentage=24h";
  const [search, setSearch] = useState("");
  const {
    data: coinsApiData,
    isValidating,
    mutate,
  } = useSWR(API_URL, {
    revalidateOnFocus: false,
    refreshWhenonline: true,
    shouldRetryOnError: true,
    useSuspense: true,
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  //add search back in later, this just filters, need to actually pull the full list off coingecko and then filter.
  // plan would be to save the desired list of favourited coins in local storage or to a cookie and then just provide that list to the API.
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
      const response = await fetch(API_URL);

      const newData = await response.json();

      //log the time and data
      console.log(new Date(), newData);
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
