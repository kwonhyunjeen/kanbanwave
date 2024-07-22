import { useEffect, useMemo, useRef } from 'react';

function useCallbackRef<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args: any[]) => callbackRef.current?.(...args)) as T, []);
}

export default useCallbackRef;
