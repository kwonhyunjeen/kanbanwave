// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import clsx, { type ClassValue } from 'clsx';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { twMerge } from 'tailwind-merge';

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}
