import { Card, User } from 'store/commonTypes';

export const makeCard = (
  id: string,
  writer: User,
  title: string,
  description: string,
  startDate: string,
  dueDate: string,
  relativeDate: string | null
): Card => ({ id, writer, title, description, startDate, dueDate, relativeDate });
