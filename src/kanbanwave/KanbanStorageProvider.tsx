import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore
} from 'react';
import {
  BoardStore,
  BoardContentStore,
  makeBoardStore,
  makeBoardContentStore
} from './storage';
import { KanbanwaveStorage } from './types';

export type KanbanStorageContextValue = {
  board: BoardStore;
  boardContent: BoardContentStore;
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
  boardContent: FALLBACK_STORE as BoardContentStore
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

export const useKanbanBoardContent = () => {
  const context = useContext(KanbanStorageContext);
  const store = context.boardContent;
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
  const boardContentExternalStore = useMemo(
    () => makeBoardContentStore(storage),
    [storage]
  );
  const contextValue = useMemo(
    () => ({
      board: boardExternalStore,
      boardContent: boardContentExternalStore
    }),
    [boardExternalStore, boardContentExternalStore]
  );

  return (
    <KanbanStorageContext.Provider value={contextValue}>
      {children}
    </KanbanStorageContext.Provider>
  );
};

export default KanbanStorageProvider;
