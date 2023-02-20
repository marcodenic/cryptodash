import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
// import Chart  from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Filler
);

const CoinGraph = ({ data, id, priceChange }) => {
  const [chart, setChart] = useState(null);

  let bgColorClass;
  let borderColorClass;
  if (priceChange < 0) {
    borderColorClass = "#f00606";
    bgColorClass = "rgba(240, 6, 6, 0.2)";
  } else if (priceChange > 0) {
    borderColorClass = "#13c783";
    bgColorClass = "rgba(19, 199, 131, 0.2)";
  }

  useEffect(() => {
    if (data && data.price) {
      const ctx = document.getElementById(`${id}-chart`);
      const chartConfig = {
        type: "line",
        data: {
          labels: data.price.map((_, index) => index + 1),
          datasets: [
            {
              label: "Price",
              data: data.price,
              borderColor: borderColorClass,
              backgroundColor: bgColorClass,
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
        },
      };

      if (chart) {
        chart.destroy();
      }
      const newChart = new ChartJS(ctx, chartConfig);
      setChart(newChart);
    }
  }, [data]);

  return <canvas id={`${id}-chart`} width="100" height="50" />;
};

export default CoinGraph;
