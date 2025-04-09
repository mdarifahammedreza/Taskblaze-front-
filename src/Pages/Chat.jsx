import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- needed for navigation
import ChatUI from "../components/Chat/ChatUI";
import { UserContext } from "./Private/AuthProvider";
import PrivateRoute from "./Private/Private";

const Chat = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // <-- hook for navigation

  useEffect(() => {
    if (user === null) {
      navigate("/user-credential");
    }
  }, [user, navigate]); // <-- add dependencies to useEffect

  return (
    <div>
      <PrivateRoute>
        <ChatUI />
      </PrivateRoute>
    </div>
  );
};

export default Chat;
