import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, IconButton, TextArea } from './common';
import clsx from 'clsx';

export const ItemForm = {
  card: 'card',
  list: 'list'
} as const;
export type ItemFormType = (typeof ItemForm)[keyof typeof ItemForm];

type AddItemFormProps = {
  className?: string;
  itemMode: ItemFormType;
  listsLength: number;
  onAddItem?: (title: string) => void;
};

const AddItemForm = ({
  className,
  itemMode,
  listsLength,
  onAddItem
}: AddItemFormProps) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(() => e.target.value);
  }, []);

  const handleClick = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (title.trim() !== '') {
        onAddItem?.(title);
        setTitle('');
      }
    },
    [title, onAddItem]
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
            placeholder={`Enter a ${itemMode === ItemForm.card ? 'card' : 'list'} title`}
            value={title}
            onChange={handleChange}
            className="w-full py-1 leading-8 min-h-11 "
          />
          <div className="flex items-start mt-1">
            <Button type="submit" className="mr-2" onClick={handleClick}>
              Add {itemMode}
            </Button>
            <IconButton
              name="close"
              type="button"
              aria-label="cancel"
              onClick={handleCancel}
            />
          </div>
        </div>
      ) : (
        <IconButton
          name="add"
          aria-label={`add a ${itemMode}`}
          onClick={() => setIsInputVisible(true)}
          className={clsx('h-11', {
            'mt-1': itemMode === ItemForm.card
          })}>
          <span className="text-sm">
            {itemMode === ItemForm.card ? 'Add a card' : 'Add another list'}
          </span>
        </IconButton>
      )}
    </div>
  );
};

export default AddItemForm;
