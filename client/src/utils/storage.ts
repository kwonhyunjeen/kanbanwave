import { useSyncExternalStore } from 'react';
import { KWBoard, BoardUUID, KWCard, CardUUID, KWList, ListUUID } from 'store';

export type KanbanStorageUnit = {
  getAll: (...args: any[]) => unknown;
  getOrders: (...args: any[]) => unknown;
  create: (...args: any[]) => unknown;
  delete: (...args: any[]) => unknown;
  reorder?: (...args: any[]) => unknown;
};

export type KanbanBoardStorage = {
  getAll: () => KWBoard[];
  getOrders: () => BoardUUID[];
  create: (board: KWBoard) => void;
  delete: (boardId: BoardUUID) => void;
};

export type KanbanListStorage = {
  getAll: (boardId: BoardUUID) => KWList[];
  getOrders: (boardId: BoardUUID) => ListUUID[];
  create: (boardId: BoardUUID, list: KWList) => void;
  delete: (boardId: BoardUUID, listId: ListUUID) => void;
  reorder: (
    boardId: BoardUUID,
    draggedListId: ListUUID,
    droppedListIndex: number
  ) => void;
};

export type KanbanCardStorage = {
  getAll: (listId: ListUUID) => KWCard[];
  getOrders: (listId: ListUUID) => CardUUID[];
  create: (listId: ListUUID, card: KWCard) => void;
  delete: (listId: ListUUID, cardId: CardUUID) => void;
  reorder: (
    fromListId: ListUUID,
    toListId: ListUUID,
    draggedCardId: CardUUID,
    droppedCardIndex: number
  ) => void;
};

export type KanbanStorage = {
  board: KanbanBoardStorage;
  list: KanbanListStorage;
  card: KanbanCardStorage;
};

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
