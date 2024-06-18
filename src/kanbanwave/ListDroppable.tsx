import { KWItemType } from './types';
import StrictModeDroppable from './StrictModeDroppable';
import React from 'react';

type ListDroppableProps = React.ComponentPropsWithoutRef<'div'> & {
  buttonSlot?: React.ReactNode;
  boardId: string;
};

const ListDroppable: React.FC<ListDroppableProps> = ({
  children,
  buttonSlot,
  boardId,
  ...restProps
}) => {
  return (
    <StrictModeDroppable
      droppableId={boardId}
      type={KWItemType.LIST}
      direction="horizontal">
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef} {...restProps}>
          {children}
          {provided.placeholder}
          {buttonSlot}
        </div>
      )}
    </StrictModeDroppable>
  );
};

ListDroppable.displayName = 'ListDroppable';

export default ListDroppable;
