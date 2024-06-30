import type { KanbanwaveStorage } from './types';

function wrap<Fn extends (...args: any[]) => any>(
  fn: Fn
): (...args: Parameters<Fn>) => ReturnType<Fn> {
  return (...args: Parameters<Fn>): ReturnType<Fn> => fn(...args);
}

export const makeKanbanwaveStore = (storage: KanbanwaveStorage) => {
  let snapshot = {
    getBoards: wrap(storage.getBoards),
    getBoardContent: wrap(storage.getBoardContent)
  };
  let listeners: Array<() => void> = [];

  const emitChanges = (changes: Array<keyof typeof snapshot>) => {
    snapshot = { ...snapshot };
    changes.forEach(key => {
      // snapshot[key]에 값(타입)을 올바르게 할당할 수 없어, 잘못된 로직이 들어갈 위험이 있음
      // 그래서 fn 변수를 선언해, 타입을 미리 검증
      const fn = wrap(storage[key]) as (typeof snapshot)[typeof key];
      snapshot[key] = fn as any;
    });
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
      emitChanges(['getBoards']);
    },
    updateBoard(...args: Parameters<typeof storage.updateBoard>) {
      storage.updateBoard(...args);
      emitChanges(['getBoards', 'getBoardContent']);
    },
    deleteBoard(...args: Parameters<typeof storage.deleteBoard>) {
      storage.deleteBoard(...args);
      emitChanges(['getBoards', 'getBoardContent']);
    },
    createList(...args: Parameters<typeof storage.createList>) {
      storage.createList(...args);
      emitChanges(['getBoardContent']);
    },
    updateList(...args: Parameters<typeof storage.updateList>) {
      storage.updateList(...args);
      emitChanges(['getBoardContent']);
    },
    deleteList(...args: Parameters<typeof storage.deleteList>) {
      storage.deleteList(...args);
      emitChanges(['getBoardContent']);
    },
    reorderList(...args: Parameters<typeof storage.reorderList>) {
      storage.reorderList(...args);
      emitChanges(['getBoardContent']);
    },
    getCard(...args: Parameters<typeof storage.getCard>) {
      storage.getCard(...args);
      emitChanges(['getBoardContent']);
    },
    createCard(...args: Parameters<typeof storage.createCard>) {
      storage.createCard(...args);
      emitChanges(['getBoardContent']);
    },
    updateCard(...args: Parameters<typeof storage.updateCard>) {
      storage.updateCard(...args);
      emitChanges(['getBoardContent']);
    },
    deleteCard(...args: Parameters<typeof storage.deleteCard>) {
      storage.deleteCard(...args);
      emitChanges(['getBoardContent']);
    },
    reorderCard(...args: Parameters<typeof storage.reorderCard>) {
      storage.reorderCard(...args);
      emitChanges(['getBoardContent']);
    }
  };
};

export type KanbanwaveStore = ReturnType<typeof makeKanbanwaveStore>;
