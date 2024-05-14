import { User } from 'store/commonTypes';
import * as chance from './chance';

export const makeUser = (id: string, name: string, email: string): User => ({
  id,
  name,
  email
});

export const makeRandomUser = () =>
  makeUser(chance.randomUUID(), chance.randomName(), chance.randomEmail());
