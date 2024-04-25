import { User } from 'store/commonTypes';
import * as chance from './chance';

export const makeUser = (uuid: string, name: string, email: string): User => ({
  uuid,
  name,
  email
});

export const makeRandomUser = () =>
  makeUser(chance.randomUUID(), chance.randomName(), chance.randomEmail());
