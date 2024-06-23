import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore
} from 'react';
import {
  BoardCollectionStore,
  BoardViewStore,
  makeBoardCollectionStore,
  makeBoardViewStore
} from './storage';
import { KanbanwaveStorage } from './types';

export type KanbanStorageContextValue = {
  boardCollection: BoardCollectionStore;
  boardView: BoardViewStore;
};

const FALLBACK_STORE = new Proxy(
  {},
  {
    get: () => {
      throw new Error(
        'The useKanban* hooks must be used within a KanbanStorageProvider context. Please ensure that the component is wrapped in a KanbanStorageProvider.'
      );
    }
  }
);

const KanbanStorageContext = createContext<KanbanStorageContextValue>({
  boardCollection: FALLBACK_STORE as BoardCollectionStore,
  boardView: FALLBACK_STORE as BoardViewStore
});

export const useKanbanBoardCollection = () => {
  const context = useContext(KanbanStorageContext);
  const store = context.boardCollection;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return useMemo(() => {
    const { subscribe, getSnapshot, ...methods } = store;
    return {
      ...snapshot,
      ...methods
    };
  }, [snapshot, store]);
};

export const useKanbanBoardView = () => {
  const context = useContext(KanbanStorageContext);
  const store = context.boardView;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return useMemo(() => {
    const { subscribe, getSnapshot, ...methods } = store;
    return {
      ...snapshot,
      ...methods
    };
  }, [snapshot, store]);
};

type KanbanStorageProviderProps = {
  children?: ReactNode;
  storage: KanbanwaveStorage;
};

const KanbanStorageProvider = ({ storage, children }: KanbanStorageProviderProps) => {
  const boardCollectionExternalStore = useMemo(() => makeBoardCollectionStore(storage), [storage]);
  const boardViewExternalStore = useMemo(
    () => makeBoardViewStore(storage),
    [storage]
  );
  const contextValue = useMemo(
    () => ({
      boardCollection: boardCollectionExternalStore,
      boardView: boardViewExternalStore
    }),
    [boardCollectionExternalStore, boardViewExternalStore]
  );

  return (
    <KanbanStorageContext.Provider value={contextValue}>
      {children}
    </KanbanStorageContext.Provider>
  );
};

export default KanbanStorageProvider;
