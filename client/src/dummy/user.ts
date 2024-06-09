import { KWUser } from 'types';
import * as chance from './chance';

export const makeUser = (id: string, name: string, email: string): KWUser => ({
  id,
  name,
  email
});

export const makeRandomUser = () =>
  makeUser(chance.randomUUID(), chance.randomName(), chance.randomEmail());
