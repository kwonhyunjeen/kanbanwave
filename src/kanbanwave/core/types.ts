export type KWCardUUID = string;
export type KWListUUID = string;
export type KWBoardUUID = string;

export const KWItemType = {
  BOARD: 'board',
  CARD: 'card',
  LIST: 'list'
} as const;
export type KWItemType = (typeof KWItemType)[keyof typeof KWItemType];

/** @todo app에서 선언하도록 리팩토링 */
export type KWUser = {
  id: string;
  name: string;
  email: string;
};

export type KWBoard<T extends object = object> = T & {
  id: KWBoardUUID;
  title: string;
};
export type KWBoardForm<T extends object = object> = Omit<KWBoard<T>, 'id'> &
  Partial<Pick<KWBoard<T>, 'id'>>;

export type KWList<T extends object = object> = T & {
  id: KWListUUID;
  boardId: KWBoardUUID;
  title: string;
};
export type KWListForm<T extends object = object> = Omit<KWList<T>, 'id' | 'boardId'> &
  Partial<Pick<KWList<T>, 'id' | 'boardId'>>;

/** @todo id, title을 제외한 프로퍼티는 app에서 generic으로 받도록 리팩토링 */
export type KWCard<T extends object = object> = T & {
  id: KWCardUUID;
  listId: KWListUUID;
  boardId: KWBoardUUID;
  title: string;
  writer?: KWUser;
  description?: string;
  startDate?: string;
  dueDate?: string;
};
export type KWCardForm<T extends object = object> = Omit<
  KWCard<T>,
  'id' | 'boardId' | 'listId'
> &
  Partial<Pick<KWCard<T>, 'id' | 'boardId' | 'listId'>>;

export type KWBoardContent<T extends object = object> = KWBoard<T> & {
  lists: KWListContent[];
};

export type KWListContent<T extends object = object> = KWList<T> & {
  cards: KWCard[];
};

export type KanbanwaveStorage = {
  getBoards: () => KWBoard[] | Promise<KWBoard[]>;
  getBoardContent: (boardId: KWBoardUUID) => KWBoardContent | Promise<KWBoardContent>;

  createBoard: (board: KWBoardForm) => void;
  updateBoard: (board: KWBoard) => void;
  deleteBoard: (boardId: KWBoardUUID) => void;

  createList: (boardId: KWBoardUUID, list: KWListForm) => void;
  updateList: (boardId: KWBoardUUID, list: KWList) => void;
  deleteList: (boardId: KWBoardUUID, listId: KWListUUID) => void;
  reorderList: (
    boardId: KWBoardUUID,
    draggedListId: KWListUUID,
    droppedListIndex: number
  ) => void;

  /** @todo getCard API 필요 여부 검토 */
  getCard: (boardId: KWBoardUUID, listId: KWListUUID, cardId: KWCardUUID) => Promise<KWCard>;
  createCard: (boardId: KWBoardUUID, listId: KWListUUID, card: KWCardForm) => void;
  updateCard: (boardId: KWBoardUUID, listId: KWListUUID, card: KWCard) => void;
  deleteCard: (boardId: KWBoardUUID, listId: KWListUUID, cardId: KWCardUUID) => void;
  reorderCard: (
    boardId: KWBoardUUID,
    fromListId: KWListUUID,
    toListId: KWListUUID,
    draggedCardId: KWCardUUID,
    droppedCardIndex: number
  ) => void;
};
