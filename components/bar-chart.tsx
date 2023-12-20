"use client";
import { Issue } from "@prisma/client";
import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({
  issues,
  indexAxis,
}: {
  issues: Issue[];
  indexAxis: "x" | "y";
}) {
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: ["Open", "Closed"],
    datasets: [
      {
        label: "Issues",
        backgroundColor: ["#FF5733", "#33FF57"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [0, 0],
      },
    ],
  });

  useEffect(() => {
    const fetchData = () => {
      try {
        let openIssuesCount = 0;
        let closedIssuesCount = 0;

        issues.forEach((issue) => {
          if (issue.status === "OPEN") {
            openIssuesCount++;
          } else if (issue.status === "CLOSED") {
            closedIssuesCount++;
          }
        });
        const data: ChartData<"bar"> = {
          labels: ["Open", "Closed"],
          datasets: [
            {
              label: "Issues",
              backgroundColor: ["#bec3ff", "#ffafaf"],
              borderColor: ["#7f92fc", "#b62929"], // Add darker border colors here
              borderWidth: 2,
              data: [openIssuesCount, closedIssuesCount],
            },
          ],
        };

        setChartData(data as any);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [issues]);

  return <Bar data={chartData} options={{ indexAxis }} />;
}

export default BarChart;
