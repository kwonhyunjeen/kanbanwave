import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, IconButton, TextArea } from 'app/components';
import clsx from 'clsx';

type NewCardProps = {
  className?: string;
  cardsLength?: number;
  onAdd?: (title: string) => void;
};

const NewCard = ({ className, cardsLength, onAdd }: NewCardProps) => {
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
    if (cardsLength === 0) {
      setIsInputVisible(true);
    } else {
      setIsInputVisible(false);
    }
  }, [cardsLength]);

  return (
    <div className="flex flex-col w-full rounded-lg max-w-64 bg-zinc-50 shrink-0 h-fit">
      {isInputVisible ? (
        <div className={clsx('p-2', className)}>
          <TextArea
            placeholder={`Enter a card title`}
            value={title}
            onChange={handleChange}
            className="w-full py-1 leading-8 min-h-11 "
          />
          <div className="flex items-start mt-1">
            <Button type="button" className="mr-2" onClick={handleAddClick}>
              Add card
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
          aria-label={`add a card`}
          onClick={() => setIsInputVisible(true)}
          className={clsx('h-11', 'mt-1')}>
          <span className="text-sm">Add a card</span>
        </IconButton>
      )}
    </div>
  );
};

export default NewCard;
