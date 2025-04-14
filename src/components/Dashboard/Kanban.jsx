"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Pages/Private/AuthProvider";

const gradientColors = [
  "bg-gradient-to-r from-blue-600 to-blue-700",
  "bg-gradient-to-r from-green-600 to-green-700",
  "bg-gradient-to-r from-yellow-600 to-yellow-700",
  "bg-gradient-to-r from-red-600 to-red-700",
];

const backgroundColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
];

const hoverColors = [
  "hover:bg-blue-600",
  "hover:bg-green-600",
  "hover:bg-yellow-600",
  "hover:bg-red-600",
];

const Kanban = () => {
  const { user, work } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({});
  const [error, setError] = useState(null);
// const [statusUpdate, setStatusUpdate] = useState(null);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = user?.stsTokenManager?.accessToken;
        if (!token) {
          setError("User is not authenticated");
          return;
        }

        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, [user, work]);

  const pendingTasks = tasks.filter(task => task.status?.pending?.isActive);
  const doingTasks = tasks.filter(task => task.status?.doing?.isActive);
  const doneTasks = tasks.filter(task => task.status?.done?.isActive);

  useEffect(() => {
    const newColumns = {
      todo: {
        id: "todo",
        title: "To Do",
        tasks: pendingTasks.map(task => ({
          ...task,
          type: "todo",
          doing: task.status?.pending?.count || 0,
          done: task.status?.doing?.count || 0,
        })),
      },
      inProgress: {
        id: "inProgress",
        title: "In Progress",
        tasks: doingTasks.map(task => ({
          ...task,
          type: "inProgress",
          doing: task.status?.doing?.count || 0,
          done: task.status?.done?.count || 0,
        })),
      },
      done: {
        id: "done",
        title: "Done",
        tasks: doneTasks.map(task => ({
          ...task,
          type: "done",
          doing: 0,
          done: task.status?.done?.count || 0,
        })),
      },
    };

    setColumns(newColumns);
  }, [tasks]);

  const handlestatus = async (task) => {

    console.log("Task ID:", task._id); // Log the task ID to the console
    console.log("Task Type:", task.type); // Log the task type to the console
    console.log("Task Type:", task); // Log the task type to the console
    try {
      const token = user?.stsTokenManager?.accessToken;
      if (!token) {
        setError("User is not authenticated");
        return;
      }
  
      // Determine the new status
      let statusUpdate;
  
      if (task.type === "todo") {
        statusUpdate = {
          category: task.category,
          group: task.group,
          content: task.content,
          description: task.description,
          rating: task.rating,
          deadline: task.deadline,
          createdBy: task.createdBy,
          createdAt: task.createdAt,
          updatedAt: new Date().toISOString(),
  
          status: {
            pending: {
              isActive: false,
              count: task.status.pending?.count ? task.status.pending.count - 1 : 0,
            },
            doing: {
              isActive: true,
              count: task.status.doing?.count ? task.status.doing.count + 1 : 1,
            },
            done: {
              isActive: false,
              count: task.status.done?.count || 0,
            },
          },
        };
      } else if (task.type === "inProgress") {
        statusUpdate = {
          category: task.category,
          group: task.group,
          content: task.content,
          description: task.description,
          rating: task.rating,
          deadline: task.deadline,
          createdBy: task.createdBy,
          createdAt: task.createdAt,
          updatedAt: new Date().toISOString(),
  
          status: {
            pending: {
              isActive: false,
              count: task.status.pending?.count || 0,
            },
            doing: {
              isActive: false,
              count: task.status.doing?.count ? task.status.doing.count - 1 : 0,
            },
            done: {
              isActive: true,
              count: task.status.done?.count ? task.status.done.count + 1 : 1,
            },
          },
        };
      } else {
        setError("Invalid task type");
        return;
      }
  
      // PATCH request to update the task
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(statusUpdate),
      });
      console.log("Response:", res); // Log the response to the console
      if (!res.ok) throw new Error("Failed to update task status");
  
      const updatedTask = await res.json();
  
      // Update tasks in state
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <section className="flex flex-col justify-center items-center text-white mb-8">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <p className="text-gray-400 max-w-2xl text-center mt-2">
          You can review the entire task workflow of your project.
        </p>
      </section>

      {error && <div className="text-red-400 text-center mb-4">Error: {error}</div>}

      <section className="flex flex-col md:flex-row gap-6">
        {Object.values(columns).map((column, colIndex) => (
          <div key={column.id} className="flex-1 bg-gray-800 rounded-lg shadow-lg">
            <h3 className={`p-4 text-lg font-semibold text-white ${backgroundColors[colIndex]} hover:brightness-110`}>
              {column.title}
            </h3>
            <div className="p-4">
              {column.tasks.map((task) => (
                <div
                  key={task._id}
                  className={`p-4 mb-4 rounded-lg shadow-md ${gradientColors[colIndex]} hover:scale-105 transition-all`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className={`text-xs font-medium text-gray-300 px-3 py-1 rounded-full ${backgroundColors[colIndex]}`}>
                      {task.category}
                    </p>
                    <div className="rating rating-xs">
                      {[...Array(5)].map((_, i) => (
                        <input
                          key={i}
                          type="radio"
                          name={`rating-${task._id}`}
                          className="mask mask-star-2 bg-yellow-400"
                          aria-label={`${i + 1} star`}
                          checked={i + 1 === task.rating}
                          readOnly
                        />
                      ))}
                    </div>
                  </div>
                  <h2 className="text-white text-lg font-semibold mb-2">
                    {task.content}
                  </h2>
                  <p className="text-gray-300 text-sm">{task.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-4 text-sm text-gray-300">
                      {task?.doing > 0 && <p>Doing: {task.doing}</p>}
                      {task?.done > 0 && <p>Done: {task.done}</p>}
                    </div>
                    {task.type !== "done" && (
                      <button
                        className={`text-xs p-2 rounded-lg bg-gray-700 text-white ${hoverColors[colIndex]}`}
                        onClick={() => handlestatus(task)}
                      >
                        {task.type === "todo" ? "Start" : "Finish"}
                      </button>
                    )}
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
