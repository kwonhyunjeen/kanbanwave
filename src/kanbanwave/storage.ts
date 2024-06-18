import { useSyncExternalStore } from 'react';
import type { KanbanStorageUnit } from './types';

export type KanbanExternalStore<T extends KanbanStorageUnit> = {
  subscribe: Parameters<typeof useSyncExternalStore<unknown>>[0];
  getSnapshot: () => { getAll: T['getAll']; getOrders: T['getOrders'] };
  create: (...args: Parameters<T['create']>) => ReturnType<T['create']>;
  delete: (...args: Parameters<T['delete']>) => ReturnType<T['delete']>;
  reorder: (
    ...args: Parameters<NonNullable<T['reorder']>>
  ) => ReturnType<NonNullable<T['reorder']>>;
};

export const makeKanbanExternalStore = <T extends KanbanStorageUnit>(
  storageUnit: T
): KanbanExternalStore<T> => {
  let snapshot = { getAll: storageUnit.getAll, getOrders: storageUnit.getOrders };
  let listeners: Array<() => void> = [];
  const emitChange = () => {
    snapshot = { getAll: storageUnit.getAll, getOrders: storageUnit.getOrders };
    for (let listener of listeners) {
      listener();
    }
  };
  return {
    subscribe(listener: () => void) {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter(it => it !== listener);
      };
    },
    getSnapshot() {
      return snapshot;
    },
    create(...args: unknown[]) {
      storageUnit.create(...args);
      emitChange();
    },
    delete(...args: unknown[]) {
      storageUnit.delete(...args);
      emitChange();
    },
    reorder(...args: unknown[]) {
      storageUnit.reorder?.(...args);
      emitChange();
    }
  } as unknown as KanbanExternalStore<T>;
};
