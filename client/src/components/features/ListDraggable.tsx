import clsx from 'clsx';
import { ReactNode, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { KWItemType } from 'store';
import { Identifier } from 'dnd-core';

type ListDraggableProps = {
  children: ReactNode;
  className?: string;
  id: string;
  index: number;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
};

type DragItem = {
  id: string;
  index: number;
  type: string;
};

const ListDraggable = ({
  children,
  className,
  id,
  index,
  onMove,
  ...props
}: ListDraggableProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: KWItemType.LIST,
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      // 현재 드래그 중인지 아닌지 boolean 값으로 리턴
      isDragging: !!monitor.isDragging()
    })
  }));

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>(
    {
      accept: KWItemType.LIST,
      collect: monitor => ({
        handlerId: monitor.getHandlerId()
      }),
      hover: (item: DragItem, monitor) => {
        if (!ref.current) {
          return;
        }

        const dragIndex = item.index; // 현재 드래그 중인 아이템의 인덱스
        const hoverIndex = index; // 이동하려는 목적지의 인덱스

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect(); // ListDraggable 컴포넌트의 위치와 크기 정보
        const clientOffset = monitor.getClientOffset(); // 드래그 중인 아이템의 클라이언트 좌표
        if (!clientOffset) {
          return null;
        }

        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2; // 리스트의 중간 위치
        const hoverClientX = clientOffset.x - hoverBoundingRect.left; // 리스트 내에서 마우스 커서의 상대적인 위치 계산

        // 아이템이 왼쪽에서 오른쪽으로 이동 중이며, 리스트의 중간을 넘어가지 않은 경우
        // 아이템이 오른쪽에서 왼쪽으로 이동 중이며, 리스트의 중간을 넘어가지 않은 경우
        if (
          (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) ||
          (dragIndex > hoverIndex && hoverClientX > hoverMiddleX)
        ) {
          return;
        }

        onMove?.(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    }
  );

  drag(drop(ref));

  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        'cursor-move',
        { 'transition-all duration-300': isDragging }, // 드래그 중인 경우에만 추가 클래스 적용
        className
      )}
      style={{
        opacity: isDragging ? 0.2 : 1
      }}
      data-handler-id={handlerId}>
      {children}
    </div>
  );
};

export default ListDraggable;
