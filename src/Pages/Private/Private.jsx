import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { UserContext } from "./AuthProvider";


const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();
console.log("User in PrivateRoute: ", user); // Debugging line
  if (!user) {
    // Redirect to login and store the current path
    return <Navigate to="/user-credential" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
