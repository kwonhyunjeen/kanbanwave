import { RefObject, useEffect } from 'react';

export const useBackdropClick = (
  ref: RefObject<HTMLElement>,
  callback?: (event: Event) => void,
  backdrop?: boolean
) => {
  useEffect(() => {
    const handleBackdropClick = (e: Event): void => {
      if (!backdrop || ref.current === null || ref.current.contains(e.target as Node)) {
        return;
      }
      callback?.(e);
    };
    window.addEventListener('mousedown', handleBackdropClick);
    return () => {
      window.removeEventListener('mousedown', handleBackdropClick);
    };
  }, [ref, callback, backdrop]);
};
