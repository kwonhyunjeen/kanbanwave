import { MutableRefObject } from 'react';

const setRef = <T>(
  ref: MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  value: T | null
) => {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
};

export default setRef;
