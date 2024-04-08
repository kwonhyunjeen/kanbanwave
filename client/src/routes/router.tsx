import { BaseLayout } from 'components';
import { Board } from 'pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [{ path: '/board/:id/:title', element: <Board /> }]
  }
]);

export default router;
