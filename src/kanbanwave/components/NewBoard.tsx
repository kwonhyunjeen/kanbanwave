import clsx from 'clsx';
import { ChangeEvent, useCallback, useState } from 'react';
import { Button, IconButton, TextArea } from 'app/components';

type NewBoardProps = {
  className?: string;
  onAdd?: (title: string) => void;
};

const NewBoard = ({ className, onAdd }: NewBoardProps) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleAddClick = useCallback(() => {
    if (title.trim() !== '') {
      onAdd?.(title);
      setIsInputVisible(false);
      setTitle('');
    }
  }, [title, onAdd]);

  const handleCancelClick = () => {
    setIsInputVisible(false);
    setTitle('');
  };

  return (
    <div className="h-[272px] rounded-lg w-[23%] bg-zinc-50 shrink-0">
      {isInputVisible ? (
        <div className={clsx('p-2', className)}>
          <TextArea
            placeholder={`Enter a board title`}
            value={title}
            onChange={handleChange}
            className="w-full py-1 leading-8 min-h-11 "
          />
          <div className="flex items-start mt-1">
            <Button type="button" className="mr-2" onClick={handleAddClick}>
              Add board
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
          aria-label={`add a board`}
          onClick={() => setIsInputVisible(true)}
          className={clsx('w-full h-full')}>
          <span className="text-sm">Add another board</span>
        </IconButton>
      )}
    </div>
  );
};

export default NewBoard;
