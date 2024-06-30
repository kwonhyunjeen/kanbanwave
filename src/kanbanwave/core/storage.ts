import type { KanbanwaveStorage } from './types';

export const makeBoardCollectionStore = (storage: KanbanwaveStorage) => {
  let snapshot = {
    getBoards: (...args: Parameters<typeof storage.getBoards>) =>
      storage.getBoards(...args),
    getBoardContent: (...args: Parameters<typeof storage.getBoardContent>) =>
      storage.getBoardContent(...args)
  };
  let listeners: Array<() => void> = [];

  const emitChange = () => {
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
      emitChange();
    },
    updateBoard(...args: Parameters<typeof storage.updateBoard>) {
      storage.updateBoard(...args);
      emitChange();
    },
    deleteBoard(...args: Parameters<typeof storage.deleteBoard>) {
      storage.deleteBoard?.(...args);
      emitChange();
    }
  };
};

export type BoardCollectionStore = ReturnType<typeof makeBoardCollectionStore>;

export const makeBoardViewStore = (storage: KanbanwaveStorage) => {
  let snapshot = {
    getBoardContent: (...args: Parameters<typeof storage.getBoardContent>) =>
      storage.getBoardContent(...args)
  };
  let listeners: Array<() => void> = [];

  const emitChange = () => {
    snapshot = {
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
    updateBoard(...args: Parameters<typeof storage.updateBoard>) {
      storage.updateBoard(...args);
      emitChange();
    },
    deleteBoard(...args: Parameters<typeof storage.deleteBoard>) {
      storage.deleteBoard(...args);
      emitChange();
    },
    createList(...args: Parameters<typeof storage.createList>) {
      storage.createList(...args);
      emitChange();
    },
    updateList(...args: Parameters<typeof storage.updateList>) {
      storage.updateList(...args);
      emitChange();
    },
    deleteList(...args: Parameters<typeof storage.deleteList>) {
      storage.deleteList(...args);
      emitChange();
    },
    reorderList(...args: Parameters<typeof storage.reorderList>) {
      storage.reorderList(...args);
      emitChange();
    },
    getCard(...args: Parameters<typeof storage.getCard>) {
      storage.getCard(...args);
      emitChange();
    },
    createCard(...args: Parameters<typeof storage.createCard>) {
      storage.createCard(...args);
      emitChange();
    },
    updateCard(...args: Parameters<typeof storage.updateCard>) {
      storage.updateCard(...args);
      emitChange();
    },
    deleteCard(...args: Parameters<typeof storage.deleteCard>) {
      storage.deleteCard(...args);
      emitChange();
    },
    reorderCard(...args: Parameters<typeof storage.reorderCard>) {
      storage.reorderCard(...args);
      emitChange();
    }
  };
};

export type BoardViewStore = ReturnType<typeof makeBoardViewStore>;
