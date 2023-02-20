import { useState, useEffect } from "react";
// import Chart from "chart.js";
import { Line } from "react-chartjs-2";

const CoinGraph = ({ data }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data && data.prices) {
      const ctx = document.getElementById("coin-chart");
      const chartConfig = {
        type: "line",
        data: {
          labels: data.prices.map((p) => new Date(p[0]).toLocaleDateString()),
          datasets: [
            {
              label: "Price",
              data: data.prices.map((p) => p[1]),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255, 255, 255, 0.7)",
                },
                gridLines: {
                  color: "rgba(255, 255, 255, 0.1)",
                  zeroLineColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255, 255, 255, 0.7)",
                },
                gridLines: {
                  color: "rgba(255, 255, 255, 0.1)",
                  zeroLineColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            ],
          },
        },
      };

      const newChart = new Chart(ctx, chartConfig);
      setChart(newChart);
    }
  }, [data]);

  return <canvas id="coin-chart" />;
};

export default CoinGraph;
