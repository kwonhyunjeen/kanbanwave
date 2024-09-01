import type { KanbanwaveStorage } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrap<Fn extends (...args: any[]) => any>(
  fn: Fn
): (...args: Parameters<Fn>) => ReturnType<Fn> {
  return (...args: Parameters<Fn>): ReturnType<Fn> => fn(...args);
}

export const makeKanbanwaveStore = (storage: KanbanwaveStorage) => {
  let snapshot = {
    getBoards: wrap(storage.getBoards),
    getBoardContent: wrap(storage.getBoardContent),
    getCard: wrap(storage.getCard)
  };
  let listeners: Array<() => void> = [];

  const emitChanges = (changes: Array<keyof typeof snapshot>) => {
    snapshot = { ...snapshot };
    changes.forEach(key => {
      snapshot = {
        ...snapshot,
        [key]: wrap(storage[key])
      };
    });
    for (const listener of listeners) {
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
    async createBoard(...args: Parameters<typeof storage.createBoard>) {
      await storage.createBoard(...args);
      emitChanges(['getBoards']);
    },
    async updateBoard(...args: Parameters<typeof storage.updateBoard>) {
      await storage.updateBoard(...args);
      emitChanges(['getBoards', 'getBoardContent']);
    },
    async deleteBoard(...args: Parameters<typeof storage.deleteBoard>) {
      await storage.deleteBoard(...args);
      emitChanges(['getBoards', 'getBoardContent']);
    },
    async createList(...args: Parameters<typeof storage.createList>) {
      await storage.createList(...args);
      emitChanges(['getBoardContent']);
    },
    async updateList(...args: Parameters<typeof storage.updateList>) {
      await storage.updateList(...args);
      emitChanges(['getBoardContent']);
    },
    async deleteList(...args: Parameters<typeof storage.deleteList>) {
      await storage.deleteList(...args);
      emitChanges(['getBoardContent']);
    },
    async reorderList(...args: Parameters<typeof storage.reorderList>) {
      await storage.reorderList(...args);
      emitChanges(['getBoardContent']);
    },
    async createCard(...args: Parameters<typeof storage.createCard>) {
      await storage.createCard(...args);
      emitChanges(['getBoardContent']);
    },
    async updateCard(...args: Parameters<typeof storage.updateCard>) {
      await storage.updateCard(...args);
      emitChanges(['getBoardContent', 'getCard']);
    },
    async deleteCard(...args: Parameters<typeof storage.deleteCard>) {
      await storage.deleteCard(...args);
      emitChanges(['getBoardContent', 'getCard']);
    },
    async reorderCard(...args: Parameters<typeof storage.reorderCard>) {
      await storage.reorderCard(...args);
      emitChanges(['getBoardContent', 'getCard']);
    }
  };
};

export type KanbanwaveStore = ReturnType<typeof makeKanbanwaveStore>;
