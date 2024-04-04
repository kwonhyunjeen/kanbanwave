import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';
import { Provider as ReduxProvider } from 'react-redux';
import { useStore } from 'store/useStore';

function App() {
  const store = useStore();
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}

export default App;
