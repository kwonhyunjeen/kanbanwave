import { useEffect, useState } from 'react';
import useCallbackRef from './useCallbackRef';

function useDerivedState<T>(
  state: T,
  factory?: (state: T, item: T) => T
): [T, (item: T) => void];
function useDerivedState<T, I>(
  state: T,
  factory: (state: T, item: I) => T
): [T, (item: I) => void];
function useDerivedState<T, I>(state: T, factory?: (state: T, item: T | I) => T) {
  const [derivedState, setDerivedState] = useState(state);

  const dispatch = useCallbackRef((item: T | I) => {
    const fallbackFactory = () => item as T;
    const fn = factory ?? fallbackFactory;
    setDerivedState(prevState => fn(prevState, item));
  });

  useEffect(() => {
    setDerivedState(state);
  }, [state]);

  return [derivedState, dispatch];
}

export default useDerivedState;
