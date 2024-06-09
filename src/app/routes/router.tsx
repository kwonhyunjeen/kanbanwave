import { BaseLayout } from 'app/components';
import { NoMatch } from 'app/components/routes';
import { Board, Workspace } from 'app/pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/board/:id/:title', element: <Board /> },
      { path: '/workspace/:id', element: <Workspace /> }
    ]
  },
  { path: '*', element: <NoMatch /> }
]);

export default router;
