export type CardUUID = string;
export type ListUUID = string;
export type BoardUUID = string;

export type KWUser = {
  id: string;
  name: string;
  email: string;
};

export type KWCard = {
  id: CardUUID;
  title: string;
  writer?: KWUser;
  description?: string;
  startDate?: string;
  dueDate?: string;
  relativeDate?: string | null;
};

export type KWList = {
  id: ListUUID;
  title: string;
  cards?: CardUUID[];
};

export type KWBoard = {
  id: BoardUUID;
  title: string;
  lists?: ListUUID[];
};

export const KWItemType = {
  CARD: 'card',
  LIST: 'list'
} as const;
export type KWItemType = (typeof KWItemType)[keyof typeof KWItemType];
