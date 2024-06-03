import { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { KWItemType } from 'store';

type ListDroppableProps = {
  children: ReactNode;
};

const ListDroppable = ({ children }: ListDroppableProps) => {
  const [, dropRef] = useDrop({
    accept: KWItemType.LIST
  });

  return (
    <div ref={node => dropRef(node)} className="h-full mt-10">
      {children}
    </div>
  );
};

export default ListDroppable;
