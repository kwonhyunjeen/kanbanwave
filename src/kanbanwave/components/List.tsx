import { IconButton, Subtitle, TextArea } from 'app/components';
import { KWList } from '../core/types';
import ListDraggable from './ListDraggable';
import { useEffect, useRef, useState } from 'react';

type ListProps = {
  children?: React.ReactNode;
  list: KWList;
  listIndex: number;
  onDeleteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onTitleSave?: (newTitle: string) => void;
};

const List = ({ children, list, listIndex, onDeleteClick, onTitleSave, ...props }: ListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(list.title);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setCurrentTitle(list.title);
  }, [list.title]);

  const handleTitleSave = () => {
    setIsEditing(false);
    if (currentTitle.trim() !== '') {
      onTitleSave?.(currentTitle);
    } else {
      setCurrentTitle(list.title);
    }
  };
  
  return (
    <ListDraggable listId={list.id} listIndex={listIndex}>
      <div {...props} className="w-64 p-2 mr-2 bg-white rounded-lg shadow-lg h-fit">
        <div className="flex items-center justify-between mb-2">
          {isEditing ? (
            <TextArea
              ref={inputRef}
              value={currentTitle}
              onChange={e => setCurrentTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={e => {
                if (e.key === 'Enter') handleTitleSave();
              }}
              className="px-2 text-lg"
              autoFocus
            />
          ) : (
            <Subtitle
              className="flex-1 p-2 break-all cursor-pointer"
              size="lg"
              onClick={() => setIsEditing(true)}>
              {list.title}
            </Subtitle>
          )}
          <div className="flex justify-between ml-2">
            <IconButton
              name="remove"
              className="single-icon"
              aria-label="delete a list"
              onClick={onDeleteClick}
            />
          </div>
        </div>
        {children}
      </div>
    </ListDraggable>
  );
};

export default List;
