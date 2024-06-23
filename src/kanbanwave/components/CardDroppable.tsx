import { KWItemType } from '../core/types';
import StrictModeDroppable from './StrictModeDroppable';

type CardDroppableProps = React.ComponentPropsWithoutRef<'div'> & {
  buttonSlot?: React.ReactNode;
  listId: string;
};

const CardDroppable: React.FC<CardDroppableProps> = ({
  children,
  buttonSlot,
  listId,
  ...restProps
}) => {
  return (
    <StrictModeDroppable droppableId={listId} type={KWItemType.CARD}>
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

CardDroppable.displayName = 'CardDroppable';

export default CardDroppable;
