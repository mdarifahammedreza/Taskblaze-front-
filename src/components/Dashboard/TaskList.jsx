import React, { useEffect, useState } from "react";

const TasksList = ({task}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [taskToEdit, setTaskToEdit] = useState(null); // Task to edit

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.stsTokenManager?.accessToken;

        if (!token) {
          setError('User is not authenticated');
          setLoading(false);
          return;
        }

        const res = await fetch('http://localhost:5000/api/tasks', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        
        setTasks(data);
        console.log(data)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [task]);

  // Handle task deletion
  const deleteTask = async (taskId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.stsTokenManager?.accessToken;

      if (!token) {
        setError('User is not authenticated');
        return;
      }

      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete task');
      
      // Remove the deleted task from the state
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditModal = (task) => {
    setTaskToEdit(task); // Set the task to be edited
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setTaskToEdit(null); // Clear the task being edited
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskToEdit({ ...taskToEdit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.stsTokenManager?.accessToken;

      if (!token) {
        setError('User is not authenticated');
        return;
      }

      const res = await fetch(`http://localhost:5000/api/tasks/${taskToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskToEdit),
      });

      if (!res.ok) throw new Error('Failed to update task');

      // Update the task list after editing
      setTasks(
        tasks.map((task) =>
          task._id === taskToEdit._id ? { ...taskToEdit } : task
        )
      );

      closeModal(); // Close the modal after successful submission
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
       
        <ul className="list-decimal list-inside text-left mt-4 p-4 space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="border-2 border-gray-700 rounded-lg px-2 py-1">
              <span>{task.content}</span>
              <span className="flex justify-end gap-2 font-semibold">
                <button
                  className="btn p-1 bg-cyan-400 border-none rounded text-white"
                  onClick={() => openEditModal(task)} // Open the modal with the task to edit
                >
                  Edit
                </button>
                <button
                  className="btn p-1 bg-white text-red-600 rounded"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl text-white mb-4">Edit Task</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300" htmlFor="category">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={taskToEdit?.category || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="e.g. Design, Development, Marketing"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300" htmlFor="group">
                  Select Group
                </label>
                <select
                  id="group"
                  name="group"
                  value={taskToEdit?.group || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                >
                  <option value="" disabled>Select a group</option>
                  {/* Add groups dynamically */}
                  {["Design", "Development", "Marketing", "Management"].map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300" htmlFor="content">
                  Task Title
                </label>
                <input
                  id="content"
                  name="content"
                  type="text"
                  value={taskToEdit?.content || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="e.g. Create a new logo for the website"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={taskToEdit?.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Task description"
                  rows="4"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300" htmlFor="deadline">
                  Deadline
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  value={taskToEdit?.deadline || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  className="px-6 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-cyan-400 rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksList;
