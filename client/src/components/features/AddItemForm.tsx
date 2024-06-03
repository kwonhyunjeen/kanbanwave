import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, IconButton, TextArea } from 'components';
import clsx from 'clsx';
import { KWItemType } from 'store';

type AddItemFormProps = {
  className?: string;
  itemMode: KWItemType;
  listsLength?: number;
  onItemAdd?: (title: string) => void;
};

const AddItemForm = ({
  className,
  itemMode,
  listsLength,
  onItemAdd
}: AddItemFormProps) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (title.trim() !== '') {
        onItemAdd?.(title);
        setTitle('');
      }
    },
    [title, onItemAdd]
  );

  const handleCancel = () => {
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
            placeholder={`Enter a ${
              itemMode === KWItemType.CARD ? 'card' : 'list'
            } title`}
            value={title}
            onChange={handleChange}
            className="w-full py-1 leading-8 min-h-11 "
          />
          <div className="flex items-start mt-1">
            <Button type="button" className="mr-2" onClick={handleClick}>
              Add {itemMode}
            </Button>
            <IconButton
              name="close"
              type="button"
              aria-label="cancel"
              onClick={handleCancel}
              className="btn-square"
            />
          </div>
        </div>
      ) : (
        <IconButton
          name="add"
          aria-label={`add a ${itemMode}`}
          onClick={() => setIsInputVisible(true)}
          className={clsx('h-11', {
            'mt-1': itemMode === KWItemType.CARD
          })}>
          <span className="text-sm">
            {itemMode === KWItemType.CARD ? 'Add a card' : 'Add another list'}
          </span>
        </IconButton>
      )}
    </div>
  );
};

export default AddItemForm;
