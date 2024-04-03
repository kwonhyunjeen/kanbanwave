import { useCallback, useState } from 'react';

const useToggle = (initialChecked: boolean = false): [boolean, () => void] => {
  const [checked, setChecked] = useState(initialChecked);
  const toggleChecked = useCallback(() => {
    setChecked(checked => !checked);
  }, []);
  return [checked, toggleChecked];
};

export default useToggle;
