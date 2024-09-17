import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore
} from 'react';
import { KWStore, makeKWStore } from '../core/storage';
import { KWStorage } from '../core/types';

export type KWStorageContextValue = {
  store: KWStore;
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

const KWStorageContext = createContext<KWStorageContextValue>({
  store: FALLBACK_STORE as KWStore
});

export const useKWStore = () => {
  const context = useContext(KWStorageContext);
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

type KWStorageProviderProps = {
  children?: ReactNode;
  storage: KWStorage;
};

const KWStorageProvider = ({ storage, children }: KWStorageProviderProps) => {
  const store = useMemo(() => makeKWStore(storage), [storage]);
  const contextValue = useMemo(() => ({ store }), [store]);

  return (
    <KWStorageContext.Provider value={contextValue}>{children}</KWStorageContext.Provider>
  );
};

export default KWStorageProvider;
