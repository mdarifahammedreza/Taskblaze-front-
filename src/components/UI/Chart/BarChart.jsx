import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskTimeChart = () => {
  // Fake data for tasks and times
  const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
  const taskDurations = [3, 5, 2, 6, 4]; // Task duration in hours
  const timeTaken = [4, 5.5, 1.5, 7, 3]; // Actual time taken to complete in hours

  // Data for the bar chart
  const data = {
    labels: tasks,
    datasets: [
      {
        label: 'Task Duration (hrs)',
        data: taskDurations,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Time Taken (hrs)',
        data: timeTaken,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Time Taken vs Task Duration',
      },
      tooltip: {
        mode: 'index',
        intersect: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-full h-full'>
      <h2 className='text-white text-center '>Task Duration vs Time Taken</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TaskTimeChart;
