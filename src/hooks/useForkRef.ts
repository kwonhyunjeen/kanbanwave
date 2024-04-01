import { Ref, RefCallback, useCallback } from 'react';
import { setRef } from 'utils';

const useForkRef = <Instance>(
  ...refs: Array<Ref<Instance> | undefined>
): RefCallback<Instance> => {
  return useCallback(instance => {
    refs.forEach(ref => {
      setRef(ref, instance);
    });
  }, refs);
};

export default useForkRef;
