import { ReactNode, createContext, useContext } from 'react';
import { KanbanStorage, dummyStorage } from 'utils';

const KanbanStorageContext = createContext<KanbanStorage>(dummyStorage);

type KanbanStorageProviderProps = {
  children?: ReactNode;
  storage?: KanbanStorage;
};

const KanbanStorageProvider = ({
  storage = dummyStorage,
  children
}: KanbanStorageProviderProps) => {
  return (
    <KanbanStorageContext.Provider value={storage}>
      {children}
    </KanbanStorageContext.Provider>
  );
};

export default KanbanStorageProvider;

export const useKanbanStorage = () => useContext(KanbanStorageContext);
