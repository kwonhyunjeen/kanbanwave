import { BaseLayout } from 'components';
import { Board, Workspace } from 'pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/board/:id/:title', element: <Board /> },
      { path: '/workspace/:id', element: <Workspace /> }
    ]
  }
]);

export default router;
