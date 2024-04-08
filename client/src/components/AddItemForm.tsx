import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, IconButton, TextArea } from './common';

export const ItemForm = {
  card: 'card',
  list: 'list'
} as const;
export type ItemFormType = (typeof ItemForm)[keyof typeof ItemForm];

type AddItemFormProps = {
  itemMode: ItemFormType;
  onAddItem?: (title: string) => void;
  initialInputVisible: number;
};

const AddItemForm = ({ itemMode, onAddItem, initialInputVisible }: AddItemFormProps) => {
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
    if (initialInputVisible === 0) {
      setIsInputVisible(true);
    } else {
      setIsInputVisible(false);
    }
  }, [initialInputVisible]);

  return (
    <div className="flex flex-col p-2 bg-white rounded-lg shadow-lg shrink-0 h-fit">
      {isInputVisible ? (
        <>
          <TextArea
            placeholder={`Enter a ${itemMode === ItemForm.card ? 'card' : 'list'} title`}
            value={title}
            onChange={handleChange}
          />
          <div className="flex items-start mt-2">
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
        </>
      ) : (
        <IconButton
          name="add"
          aria-label={`add a ${itemMode}`}
          onClick={() => setIsInputVisible(true)}>
          <span className="text-sm">
            {itemMode === ItemForm.card ? 'Add a card' : 'Add another list'}
          </span>
        </IconButton>
      )}
    </div>
  );
};

export default AddItemForm;
