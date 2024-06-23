import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore
} from 'react';
import {
  BoardStore,
  BoardViewStore,
  makeBoardStore,
  makeBoardViewStore
} from './storage';
import { KanbanwaveStorage } from './types';

export type KanbanStorageContextValue = {
  board: BoardStore;
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
  board: FALLBACK_STORE as BoardStore,
  boardView: FALLBACK_STORE as BoardViewStore
});

export const useKanbanBoard = () => {
  const context = useContext(KanbanStorageContext);
  const store = context.board;
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
  const boardExternalStore = useMemo(() => makeBoardStore(storage), [storage]);
  const boardViewExternalStore = useMemo(
    () => makeBoardViewStore(storage),
    [storage]
  );
  const contextValue = useMemo(
    () => ({
      board: boardExternalStore,
      boardView: boardViewExternalStore
    }),
    [boardExternalStore, boardViewExternalStore]
  );

  return (
    <KanbanStorageContext.Provider value={contextValue}>
      {children}
    </KanbanStorageContext.Provider>
  );
};

export default KanbanStorageProvider;
