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
  Legend,
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
  Legend,
  Tooltip,
  Filler
);

const CoinGraph = ({ data, id }) => {
  const [chart, setChart] = useState(null);

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
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };

      if (chart) {
        chart.destroy();
      }
      const newChart = new ChartJS(ctx, chartConfig);
      setChart(newChart);
    }
  }, [data]);

  return <canvas id={`${id}-chart`} width="100" height="100" />;
};

export default CoinGraph;
