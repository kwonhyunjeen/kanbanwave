import type { KanbanwaveStorage } from './types';

export const makeKanbanwaveStore = (storage: KanbanwaveStorage) => {
  let snapshot = {
    getBoards: (...args: Parameters<typeof storage.getBoards>) =>
      storage.getBoards(...args),
    getBoardContent: (...args: Parameters<typeof storage.getBoardContent>) =>
      storage.getBoardContent(...args)
  };
  let listeners: Array<() => void> = [];

  const emitChanges = () => {
    snapshot = {
      getBoards: (...args: Parameters<typeof storage.getBoards>) =>
        storage.getBoards(...args),
      getBoardContent: (...args: Parameters<typeof storage.getBoardContent>) =>
        storage.getBoardContent(...args)
    };
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
    createBoard(...args: Parameters<typeof storage.createBoard>) {
      storage.createBoard(...args);
      emitChanges();
    },
    updateBoard(...args: Parameters<typeof storage.updateBoard>) {
      storage.updateBoard(...args);
      emitChanges();
    },
    deleteBoard(...args: Parameters<typeof storage.deleteBoard>) {
      storage.deleteBoard(...args);
      emitChanges();
    },
    createList(...args: Parameters<typeof storage.createList>) {
      storage.createList(...args);
      emitChanges();
    },
    updateList(...args: Parameters<typeof storage.updateList>) {
      storage.updateList(...args);
      emitChanges();
    },
    deleteList(...args: Parameters<typeof storage.deleteList>) {
      storage.deleteList(...args);
      emitChanges();
    },
    reorderList(...args: Parameters<typeof storage.reorderList>) {
      storage.reorderList(...args);
      emitChanges();
    },
    getCard(...args: Parameters<typeof storage.getCard>) {
      storage.getCard(...args);
      emitChanges();
    },
    createCard(...args: Parameters<typeof storage.createCard>) {
      storage.createCard(...args);
      emitChanges();
    },
    updateCard(...args: Parameters<typeof storage.updateCard>) {
      storage.updateCard(...args);
      emitChanges();
    },
    deleteCard(...args: Parameters<typeof storage.deleteCard>) {
      storage.deleteCard(...args);
      emitChanges();
    },
    reorderCard(...args: Parameters<typeof storage.reorderCard>) {
      storage.reorderCard(...args);
      emitChanges();
    }
  };
};

export type KanbanwaveStore = ReturnType<typeof makeKanbanwaveStore>;
