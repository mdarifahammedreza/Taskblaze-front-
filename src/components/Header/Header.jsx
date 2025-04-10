import { useContext, useState } from "react";
import { LuMessageCircleCode } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../Pages/Private/Auth";
import { UserContext } from "../../Pages/Private/AuthProvider";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user,logout } = useContext(UserContext);
console.log(user?.photoURL);
  const  handlelogout = () => {
    logout();
    logOut();
    closeSidebar();
  }

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="navbar shadow-sm bg-gray-800">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity ${
          isSidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-1/2 md:w-64  bg-gray-800 text-white z-50 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={closeSidebar}
        >
          &times;
        </button>

        {/* Sidebar Links */}
        <div className="p-4 mt-12">
          {user && (
            <div className="flex flex-col items-center mb-4">
              <img
                src={user?.photoURL}
                alt="user image"
                className="rounded-full w-20 h-20"
              />
              <h2 className="text-lg font-semibold mt-2">{user.displayName}</h2>
            </div>
          )}

          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 hover:text-cyan-400 ${
                isActive ? "text-blue-400" : ""
              }`
            }
            onClick={closeSidebar}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/Kanban"
            className={({ isActive }) =>
              `block py-2 hover:text-cyan-400 ${
                isActive ? "text-blue-400" : ""
              }`
            }
            onClick={closeSidebar}
          >
            Task
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `block py-2 hover:text-cyan-400 ${
                isActive ? "text-blue-400" : ""
              }`
            }
            onClick={closeSidebar}
          >
            Chat
          </NavLink>
          <NavLink
            onClick ={()=>handlelogout()}
            className={({ isActive }) =>
              `block py-2 hover:text-cyan-400 ${
                isActive ? "text-blue-400" : ""
              }`
            }
            
          >
            Logout
          </NavLink>
        </div>
      </div>

      {/* Hamburger Menu Button (Visible on Mobile) */}
      <div className="flex-none ">
        <button
          className="py-2 px-3 text-white hover:text-cyan-400 hover:bg-gray-700 rounded-lg"
          onClick={openSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Brand Logo */}
      <div className="flex-1">
        <NavLink
          to="/"
          className="p-2 rounded-lg text-xl text-cyan-400 hover:bg-gray-700"
        >
          TaskBlaze
        </NavLink>
      </div>

      {/* Message Icon (Visible on Desktop) */}
      <div className="flex-none hidden lg:block relative">
        <Link to="/chat">
          <button className="p-2 rounded-full text-cyan-400 hover:cursor-pointer hover:bg-gray-700 text-2xl flex items-center justify-center">
            <LuMessageCircleCode />
            {/* Custom Badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              3
            </span>
          </button>
        </Link>
      </div>

      {/* Message Icon (Visible on Mobile) */}
      <div className="flex-none lg:hidden relative">
        <button className="p-2 rounded-full text-cyan-400 hover:cursor-pointer hover:bg-gray-700 text-2xl flex items-center justify-center">
          <LuMessageCircleCode />
          {/* Custom Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            3
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
