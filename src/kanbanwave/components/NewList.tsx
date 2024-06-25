import clsx from 'clsx';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, IconButton, TextArea } from 'app/components';

type NewListProps = {
  className?: string;
  listsLength?: number;
  onAdd?: (title: string) => void;
};

const NewList = ({ className, listsLength, onAdd }: NewListProps) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleAddClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (title.trim() !== '') {
        onAdd?.(title);
        setTitle('');
      }
    },
    [title, onAdd]
  );

  const handleCancelClick = () => {
    setTitle('');
    setIsInputVisible(false);
  };

  useEffect(() => {
    if (listsLength === 0) {
      setIsInputVisible(true);
    } else {
      setIsInputVisible(false);
    }
  }, [listsLength]);

  return (
    <div className="flex flex-col w-full rounded-lg max-w-64 bg-zinc-50 shrink-0 h-fit">
      {isInputVisible ? (
        <div className={clsx('p-2', className)}>
          <TextArea
            placeholder={`Enter a list title`}
            value={title}
            onChange={handleChange}
            className="w-full py-1 leading-8 min-h-11 "
          />
          <div className="flex items-start mt-1">
            <Button type="button" className="mr-2" onClick={handleAddClick}>
              Add list
            </Button>
            <IconButton
              name="close"
              type="button"
              aria-label="cancel"
              onClick={handleCancelClick}
              className="btn-square"
            />
          </div>
        </div>
      ) : (
        <IconButton
          name="add"
          aria-label={`add a list`}
          onClick={() => setIsInputVisible(true)}
          className={clsx('h-11')}>
          <span className="text-sm">Add another list</span>
        </IconButton>
      )}
    </div>
  );
};

export default NewList;
