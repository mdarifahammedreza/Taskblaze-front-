import { createBrowserRouter } from 'react-router-dom';
import ChatContainer from './components/Chat/root';
import Dashboard from './components/Dashboard/Dashboard';
import { default as Kanban } from './components/Dashboard/Kanban';
import Chat from './Pages/Chat';
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
        element: <Kanban />,
      },
      {
        path: '/ChatContainer',
        element: <ChatContainer />,
      },
    ],

  },
  {
    path: '/ServerStatus',
    element: <ServerStatus />,  
  },  
  
]);

export default router;
