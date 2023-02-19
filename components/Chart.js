import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7'
      );
      const chartData = {
        labels: response.data.prices.map((price) => new Date(price[0]).toLocaleDateString()),
        datasets: [
          {
            label: 'Bitcoin Price',
            data: response.data.prices.map((price) => price[1]),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      };
      setChartData(chartData);
    };

    fetchData();
  }, []);

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default Chart;
