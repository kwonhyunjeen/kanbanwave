import { forwardRef, useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

const StrictModeDroppable = forwardRef<
  React.ComponentRef<typeof Droppable>,
  React.ComponentPropsWithoutRef<typeof Droppable>
>((props, ref) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable ref={ref} {...props} />;
});

StrictModeDroppable.displayName = 'StrictModeDroppable';

export default StrictModeDroppable;
