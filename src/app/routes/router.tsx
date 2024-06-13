import { BaseLayout } from 'app/components';
import { NoMatch } from 'app/components/routes';
import { BoardPage, BoardsPage } from 'app/pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/boards', element: <BoardsPage /> },
      { path: '/boards/:id', element: <BoardPage /> },
    ]
  },
  { path: '*', element: <NoMatch /> }
]);

export default router;
