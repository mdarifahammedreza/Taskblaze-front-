"use client";
import { useState } from "react";

// Initial data for the Kanban board
const initialColumns = {
  todo: {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "task-1", content: "Design the Kanban board" },
      { id: "task-2", content: "Implement responsive design" },
    ],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    tasks: [{ id: "task-3", content: "Write documentation" }],
  },
  done: {
    id: "done",
    title: "Done",
    tasks: [{ id: "task-4", content: "Set up the project" }],
  },
};

const gradientColors = [
  "bg-gradient-to-r from-blue-600 to-blue-700",
  "bg-gradient-to-r from-green-600 to-green-700",
  "bg-gradient-to-r from-yellow-600 to-yellow-700",
  "bg-gradient-to-r from-red-600 to-red-700",
];

const backgroundColors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500"];

const hoverColors = [
  "hover:bg-blue-600",
  "hover:bg-green-600",
  "hover:bg-yellow-600",
  "hover:bg-red-600",
];

const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);

  // Function to handle "View Details" button click
  const handleViewDetails = (taskId) => {
    alert(`Viewing details for task: ${taskId}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <section className="flex flex-col justify-center items-center text-white mb-8">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <p className="text-gray-400 max-w-2xl text-center mt-2">
          You can review the entire task workflow of your project.
        </p>
      </section>

      <section className="flex flex-col md:flex-row gap-6">
        {Object.values(columns).map((column, colIndex) => (
          <div
            key={column.id}
            className="flex-1 bg-gray-800 rounded-lg shadow-lg hover:cursor-pointer hover:shadow-xl transition-shadow"
          >
            <h3
              className={`p-4 text-lg font-semibold text-white ${backgroundColors[colIndex]} hover:brightness-110 transition-all`}
            >
              {column.title}
            </h3>
            <div className="p-4">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 mb-4 rounded-lg shadow-md ${gradientColors[colIndex]} hover:scale-105 hover:shadow-lg transition-all`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p
                      className={`text-xs font-medium text-gray-300 px-3 py-1 rounded-full ${backgroundColors[colIndex]} hover:brightness-110 transition-all`}
                    >
                      Category
                    </p>
                    <div className="rating rating-xs">
                      {[...Array(5)].map((_, i) => (
                        <input
                          key={i}
                          type="radio"
                          name={`rating-${task.id}`}
                          className="mask mask-star-2 bg-yellow-400 hover:cursor-pointer"
                          aria-label={`${i + 1} star`}
                        />
                      ))}
                    </div>
                  </div>
                  <h2 className="text-white text-lg font-semibold mb-2 hover:text-cyan-400 transition-colors">
                    {task.content}
                  </h2>
                  <p className="text-gray-300 text-sm hover:text-gray-200 transition-colors">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-4 text-sm text-gray-300 hover:text-gray-200 transition-colors">
                      <p>Doing: 5</p>
                      <p>Done: 7</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className={`text-xs p-2  md:text-xs lg:px-4 lg:py-2 lg:text-base rounded-lg bg-gray-700 text-white ${hoverColors[colIndex]} hover:cursor-pointer transition-colors`}
                      >
                        Start
                      </button>
                      <button
                        className="text-xs  p-2 md:text-xs lg:px-4 lg:py-2 lg:text-base rounded-lg bg-gray-700 text-white hover:bg-gray-600 hover:text-cyan-400 hover:cursor-pointer transition-colors"
                        onClick={() => handleViewDetails(task.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Kanban;