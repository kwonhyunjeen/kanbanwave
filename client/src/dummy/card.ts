import { Card, User } from 'store/commonTypes';

export const makeCard = (
  uuid: string,
  writer: User,
  title: string,
  description: string,
  date: string,
  relativeDate: string | null
): Card => ({ uuid, writer, title, description, date, relativeDate });
