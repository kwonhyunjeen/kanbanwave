import { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from 'store';

type ListDroppableProps = {
  children: ReactNode;
};

const ListDroppable = ({ children }: ListDroppableProps) => {
  const [, dropRef] = useDrop({
    accept: ItemType.LIST
  });

  return (
    <div ref={node => dropRef(node)} className="h-full">
      {children}
    </div>
  );
};

export default ListDroppable;
