import { ChangeEvent, useState } from 'react';
import styles from './AddBoard.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';

type AddBoardProps = {
  className?: string;
  onAdd?: (title: string) => void;
};

const AddBoard = ({ onAdd }: AddBoardProps) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title.trim() !== '') {
      onAdd?.(title);
      setTitle('');
    }
  };

  const handleCancelClick = () => {
    setTitle('');
    setIsInputVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      {isInputVisible ? (
        <div className={styles.container}>
          <Input
            placeholder={`Enter a board title`}
            value={title}
            onChange={handleChange}
          />
          <div className={styles.action}>
            <Button color="primary" onClick={handleAddClick}>
              Add board
            </Button>
            <IconButton icon="close" aria-label="cancel" onClick={handleCancelClick} />
          </div>
        </div>
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={styles.addBoardButton} onClick={() => setIsInputVisible(true)}>
          Create new board
        </div>
      )}
    </div>
  );
};

export default AddBoard;
