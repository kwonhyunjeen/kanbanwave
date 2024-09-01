import { KWList } from '../../core/types';
import ListDraggable from '../ListDraggable';
import { useEffect, useRef, useState } from 'react';
import useDerivedState from '../../hooks/useDerivedState';
import styles from './List.module.css';
import IconButton from '../IconButton/IconButton';
import TextArea from '../TextArea/TextArea';

type ListProps = {
  children?: React.ReactNode;
  list: KWList;
  listIndex: number;
  onDeleteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onTitleSave?: (newTitle: string) => void;
};

const List = ({
  children,
  list,
  listIndex,
  onDeleteClick,
  onTitleSave,
  ...props
}: ListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [internalTitle, setInternalTitle] = useDerivedState(list.title);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleSave = () => {
    setIsEditing(false);
    if (internalTitle.trim() === '') {
      setInternalTitle(list.title);
    } else {
      onTitleSave?.(internalTitle);
    }
  };

  return (
    <ListDraggable listId={list.id} listIndex={listIndex} className={styles.wrapper}>
      <div {...props} className={styles.area}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            {!isEditing && (
              /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
              <h2
                ref={h2Ref}
                className={styles.listTitle}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                onFocus={() => {
                  setIsEditing(true);
                }}
                // ListDraggable 컴포넌트가 mousedown 이벤트 핸들러에서 preventDefault를 호출하므로,
                // 강제로 focus 이벤트를 유발해 onFocus 호출
                onClick={e => {
                  e.currentTarget.focus();
                }}
              >
                {internalTitle}
              </h2>
            )}
            {isEditing && (
              <TextArea
                ref={textAreaRef}
                value={internalTitle}
                onChange={e => setInternalTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleTitleSave();
                }}
                className={styles.textArea}
                maxLength={512}
              />
            )}
          </div>
          <IconButton
            icon="remove"
            color="default"
            className={styles.deleteIcon}
            onClick={onDeleteClick}
          />
        </div>
        {children}
      </div>
    </ListDraggable>
  );
};

export default List;
