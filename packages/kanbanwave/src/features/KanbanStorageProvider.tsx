import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore
} from 'react';
import { KanbanwaveStore, makeKanbanwaveStore } from '../core/storage';
import { KanbanwaveStorage } from '../core/types';

export type KanbanStorageContextValue = {
  store: KanbanwaveStore;
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
  store: FALLBACK_STORE as KanbanwaveStore
});

export const useKanbanwaveStore = () => {
  const context = useContext(KanbanStorageContext);
  const store = context.store;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const store = useMemo(() => makeKanbanwaveStore(storage), [storage]);
  const contextValue = useMemo(() => ({ store }), [store]);

  return (
    <KanbanStorageContext.Provider value={contextValue}>
      {children}
    </KanbanStorageContext.Provider>
  );
};

export default KanbanStorageProvider;
