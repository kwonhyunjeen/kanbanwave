import { RefObject, useEffect } from 'react';

const useOnOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback?: (event?: Event) => void
) => {
  useEffect(() => {
    const handleOutsideClick = (e: Event): void => {
      if (ref.current === null || ref.current.contains(e.target as Node)) {
        return;
      }
      callback?.(e);
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref, callback]);
};

export default useOnOutsideClick;
