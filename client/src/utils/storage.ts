import { Board, BoardUUID, Card, CardUUID, List, ListUUID } from 'store';

export const dummyStorage = {
  board: {
    getAll: (): Board[] => [],
    getOrders: (): BoardUUID[] => [],
    create: (board: Board): void => undefined,
    delete: (boardId: BoardUUID): void => undefined,
    reorder: (boardIds: BoardUUID[]): void => undefined
  },
  list: {
    getAll: (boardId: BoardUUID): List[] => [],
    getOrders: (boardId: BoardUUID): ListUUID[] => [],
    create: (boardId: BoardUUID, list: List): void => undefined,
    delete: (boardId: BoardUUID, listId: ListUUID): void => undefined,
    reorder: (boardId: BoardUUID, listIds: ListUUID[]): void => undefined
  },
  card: {
    getAll: (listId: ListUUID): Card[] => [],
    getOrders: (listId: ListUUID): CardUUID[] => [],
    create: (listId: ListUUID, card: Card): void => undefined,
    delete: (listId: ListUUID, cardId: CardUUID): void => undefined,
    reorder: (listId: ListUUID, cardIds: CardUUID[]): void => undefined
  }
};

export type KanbanStorage = typeof dummyStorage;
