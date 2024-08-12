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
  }
  , [isEditing]);

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
            <h2
              ref={h2Ref}
              className={`${styles.listTitle} ${isEditing ? styles.hidden : ''}`}
              onClick={() => setIsEditing(true)}>
              {internalTitle}
            </h2>
            <TextArea
              ref={textAreaRef}
              value={internalTitle}
              onChange={e => setInternalTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={e => {
                if (e.key === 'Enter') handleTitleSave();
              }}
              className={`${styles.textArea} ${isEditing ? styles.textAreaActive : ''}`}
              style={{ height: `${h2Ref.current?.scrollHeight}px` }}
              maxLength={512}
            />
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