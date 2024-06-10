import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore
} from 'react';
import {
  KanbanBoardStorage,
  KanbanCardStorage,
  KanbanExternalStore,
  KanbanListStorage,
  KanbanStorage,
  makeKanbanExternalStore
} from 'app/utils';

export type KanbanStorageContextValue = {
  board: KanbanExternalStore<KanbanBoardStorage>;
  list: KanbanExternalStore<KanbanListStorage>;
  card: KanbanExternalStore<KanbanCardStorage>;
};

const FALLBACK_FN = () => {
  throw new Error(
    'The useKanban* hooks must be used within a KanbanStorageProvider context. Please ensure that the component is wrapped in a KanbanStorageProvider.'
  );
};
const FALLBACK_KANBAN_STORAGE_UNIT = {
  getAll: FALLBACK_FN,
  getOrders: FALLBACK_FN,
  create: FALLBACK_FN,
  delete: FALLBACK_FN,
  reorder: FALLBACK_FN
};
const FALLBACK_KANBAN_STORAGE: KanbanStorage = {
  board: FALLBACK_KANBAN_STORAGE_UNIT,
  list: FALLBACK_KANBAN_STORAGE_UNIT,
  card: FALLBACK_KANBAN_STORAGE_UNIT
};
const FALLBACK_CONTEXT_VALUE: KanbanStorageContextValue = {
  board: makeKanbanExternalStore(FALLBACK_KANBAN_STORAGE.board),
  list: makeKanbanExternalStore(FALLBACK_KANBAN_STORAGE.list),
  card: makeKanbanExternalStore(FALLBACK_KANBAN_STORAGE.card)
};

const KanbanStorageContext =
  createContext<KanbanStorageContextValue>(FALLBACK_CONTEXT_VALUE);

export const useKanbanBoard = () => {
  const context = useContext(KanbanStorageContext);
  const store = context.board;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);
  return useMemo(
    () => ({
      getAll: snapshot.getAll,
      getOrders: snapshot.getOrders,
      create: store.create,
      delete: store.delete,
      reorder: store.reorder
    }),
    [snapshot, store]
  );
};

export const useKanbanList = () => {
  const context = useContext(KanbanStorageContext);
  const store = context.list;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);
  return useMemo(
    () => ({
      getAll: snapshot.getAll,
      getOrders: snapshot.getOrders,
      create: store.create,
      delete: store.delete,
      reorder: store.reorder
    }),
    [snapshot, store]
  );
};

export const useKanbanCard = () => {
  const context = useContext(KanbanStorageContext);
  const store = context.card;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);
  return useMemo(
    () => ({
      getAll: snapshot.getAll,
      getOrders: snapshot.getOrders,
      create: store.create,
      delete: store.delete,
      reorder: store.reorder
    }),
    [snapshot, store]
  );
};

type KanbanStorageProviderProps = {
  children?: ReactNode;
  storage: KanbanStorage;
};

const KanbanStorageProvider = ({ storage, children }: KanbanStorageProviderProps) => {
  const boardExternalStore = useMemo(
    () => makeKanbanExternalStore(storage.board),
    [storage.board]
  );
  const listExternalStore = useMemo(
    () => makeKanbanExternalStore(storage.list),
    [storage.list]
  );
  const cardExternalStore = useMemo(
    () => makeKanbanExternalStore(storage.card),
    [storage.card]
  );
  const contextValue = useMemo<KanbanStorageContextValue>(
    () => ({
      board: boardExternalStore,
      list: listExternalStore,
      card: cardExternalStore
    }),
    [boardExternalStore, listExternalStore, cardExternalStore]
  );

  return (
    <KanbanStorageContext.Provider value={contextValue}>
      {children}
    </KanbanStorageContext.Provider>
  );
};

export default KanbanStorageProvider;
