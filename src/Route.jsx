import { createBrowserRouter } from 'react-router';
// import ChatContainer from './components/Chat/root';
import ChatComponent from './components/Chat/Test';
import Dashboard from './components/Dashboard/Dashboard';
import { default as Kanban } from './components/Dashboard/Kanban';
import Authnication from './Pages/Authnication';
import Chat from './Pages/Chat';
import PrivateRoute from './Pages/Private/Private';
import ServerStatus from './Pages/Private/ServerStatus';
import Root from './Root';

let router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/kanban',
        element: <PrivateRoute><Kanban /></PrivateRoute>,
      },
      // {
      //   path: '/ChatContainer',
      //   element: <ChatContainer />,
      // },
    ],

  },
  {
    path: '/server-status',
    element: <ServerStatus />,  
  },  
  {
    path: '/user-credential',
    element: <Authnication />,  
  },  
  {
    path: '/test',
    element: <ChatComponent />,  
  },  
  
]);

export default router;
