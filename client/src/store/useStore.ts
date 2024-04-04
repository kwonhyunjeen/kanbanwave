import { configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';

const initializeStore = () => {
  const store = configureStore({ reducer: {} });
  return store;
};

export function useStore() {
  const store = useMemo(() => initializeStore(), []);
  return store;
}
