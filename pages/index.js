import CoinList from "../components/CoinList";
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

  // Show the loader until the data is loaded
  return isDataLoaded ? (
    <div className="coin__grid">
      <CoinList coinsData={coinsApiData} />
    </div>
  ) : (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  );
}
