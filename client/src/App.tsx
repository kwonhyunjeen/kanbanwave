import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';
import { Provider as ReduxProvider } from 'react-redux';
import { useStore } from 'store/useStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { KanbanStorageProvider } from 'components';

function App() {
  const store = useStore();
  return (
    <ReduxProvider store={store}>
      <KanbanStorageProvider>
        <DndProvider backend={HTML5Backend}>
          <RouterProvider router={router} />
        </DndProvider>
      </KanbanStorageProvider>
    </ReduxProvider>
  );
}

export default App;
