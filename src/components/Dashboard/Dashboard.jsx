import { useState } from "react";
import PrivateRoute from "../../Pages/Private/Private";
import TaskTimeChart from "../UI/Chart/BarChart";
import TaskChartUI from "../UI/Chart/TaskChartUI";

const Dashboard = () => {
  const groupName = ["Design", "Development", "Marketing", "Management"];

  const [task, setTask] = useState({
    category: "",
    group: "",
    content: "",
    description: "",
    rating: 0,
    deadline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
      start: new Date().toISOString(), // Set start date to current date and time
    });
  };

  const handleRatingChange = (rating) => {
    setTask({
      ...task,
      rating: rating,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit task data (this could involve calling an API or updating state)
    alert(`Task submitted: ${JSON.stringify(task)}`);
    setTask({
      category: "",
      group: "",
      content: "",
      description: "",
      rating: 0,
      deadline: "",
    });
  };

  return (
    <PrivateRoute>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-800 py-6 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-screen-xl mb-6">
          <div className="border-2 border-gray-700 rounded-lg overflow-hidden">
            <TaskChartUI />
          </div>
          <div className="border-2 border-gray-700 rounded-lg overflow-hidden">
            <TaskTimeChart />
          </div>
        </section>

        <section className="w-full max-w-screen-xl  bg-gray-800 rounded-lg shadow-lg text-white flex flex-col md:flex-row justify-center items-center gap-7">
          <div className="text-center w-full md:w-1/2 border-2 border-gray-700 rounded-lg overflow-hidden h-[43rem] overflow-y-auto relative">
            <p className="text-justify p-4 border-b-2 border-gray-700  text-gray-300 bg-gray-900 sticky top-0 z-10">
              Pending Tasks
            </p>
            <ul className="list-decimal list-inside text-left mt-4 p-4   space-y-4">
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
              <li className=" border-2 border-gray-700  rounded-lg px-2 py-1">
                {" "}
                <span>Track your tasks and time spent. </span>{" "}
                <span className="flex justify-end gap-2 font-semibold">
                  {" "}
                  <button className="btn p-1 bg-cyan-400 border-none rounded text-white">
                    Edit
                  </button>
                  <button className="btn p-1 bg-white text-red-600 rounded">
                    Delete
                  </button>
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2  m p-6 rounded-lg shadow-lg  text-white bg-gray-900 h-[43rem]">
            <h2 className="text-2xl font-semibold text-center text-gray-100 mb-4">
              Create New Task
            </h2>
            <p className="text-center  ">
              Configure your task and time management with TaskBlaze.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-300"
                >
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={task.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ribg-cyan-400"
                  placeholder="e.g. Design, Development, Marketing"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="group"
                  className="block text-sm font-medium text-gray-300"
                >
                  Select Group
                </label>
                <select
                  id="group"
                  name="group"
                  value={task.group}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                >
                  <option value="" disabled>
                    Select a group
                  </option>
                  {groupName.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-300"
                >
                  Task Title
                </label>
                <input
                  id="content"
                  name="content"
                  type="text"
                  value={task.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ribg-cyan-400"
                  placeholder="e.g. Create a new logo for the website"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={task.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ribg-cyan-400"
                  placeholder="Task description"
                  rows="4"
                  required
                />
              </div>

              <div className="flex gap-4 justify-between">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Priority
                  </label>
                  <div className="rating rating-xs">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <input
                        key={rating}
                        type="radio"
                        name={`rating-${task.id || "priority"}`} // fallback if task.id doesn't exist
                        className="mask mask-star-2 bg-yellow-400 hover:cursor-pointer"
                        aria-label={`${rating} star`}
                        checked={task.rating === rating}
                        onChange={() => handleRatingChange(rating)}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Deadline Date & Time
                  </label>
                  <input
                    id="deadline"
                    name="deadline"
                    type="datetime-local"
                    value={task.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-cyan-400 rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  Submit Task
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
