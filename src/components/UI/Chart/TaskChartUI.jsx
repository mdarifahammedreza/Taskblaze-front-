import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
// Import chartjs-plugin-annotation
import annotationPlugin from 'chartjs-plugin-annotation';

// Register chart.js plugins
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, annotationPlugin);

export default function TaskChartUI() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 4", deadline: "2025-04-10", finishDate: "2025-04-12" },
    { id: 2, name: "Task 5", deadline: "2025-04-15", finishDate: "2025-04-14" },
    { id: 3, name: "Task 6", deadline: "2025-04-20", finishDate: "2025-04-19" },
    { id: 4, name: "Task 7", deadline: "2025-04-10", finishDate: "2025-04-14" },
    { id: 5, name: "Task 8 ", deadline: "2025-04-20", finishDate: "2025-04-14" },
  ]);

  const [activeness, setActiveness] = useState(0);

  useEffect(() => {
    calculateActiveness();
  }, [tasks]);

  const calculateActiveness = () => {
    let activeTasks = 0;
    tasks.forEach((task) => {
      const deadline = new Date(task.deadline);
      const finishDate = new Date(task.finishDate);
      if (finishDate <= deadline) {
        activeTasks += 1;
      }
    });

    const activenessPercent = (activeTasks / tasks.length) * 100;
    setActiveness(activenessPercent);
  };

  // Chart Data
  const chartData = {
    labels: tasks.map((task) => task.name),
    datasets: [
      {
        label: "Finishing Date vs Deadline",
        data: tasks.map((task) => {
          const deadline = new Date(task.deadline);
          const finishDate = new Date(task.finishDate);
          return finishDate - deadline; // Difference in milliseconds
        }),
        borderColor: "rgb(75, 192, 192)",
        // backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: .4,
        borderWidth: 2,
        pointStyle: "circle",
        pointBackgroundColor: tasks.map((task) => {
          const deadline = new Date(task.deadline);
          const finishDate = new Date(task.finishDate);
          return finishDate < deadline ? "#013220" : finishDate > deadline ? "#8B0000" : "yellow"; // Early: Green, Delayed: Red, On Time: Yellow
        }),
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Task Finishing Date vs Deadline",
      },
      annotation: {
        annotations: {
          line: {
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "gray",
            borderWidth: 1,
            label: {
              content: "On Time",
              enabled: true,
              position: "center",
              font: { size: 14, style: "italic" },
              color: "black",
            },
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          callback: (value) => {
            if (value === 0) return "On time";
            return value > 0 ? `Delayed by ${Math.floor(value / (1000 * 60 * 60 * 24))} days` : "Early";
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-2  text-white">
      <div className="flex flex-col items-center">
        <h1 className="text-xl  mb-2 lg:mb-5">Task Completion Activeness</h1>
        <div className="w-full mb-10">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="text-center">
          <h2 className="text-xl">Activeness: {activeness.toFixed(2)}%</h2>
          <p className="mt-2 text-gray-300">
            This is the percentage of tasks completed on or before their deadline.
          </p>
        </div>
      </div>
    </div>
  );
}
