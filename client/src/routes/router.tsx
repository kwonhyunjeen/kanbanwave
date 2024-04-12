import { BaseLayout } from 'components';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />
  }
]);

export default router;
