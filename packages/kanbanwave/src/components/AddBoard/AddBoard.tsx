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

  const handleTitleSave = () => {
    if (title.trim() !== '') {
      onAdd?.(title);
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
            preventLineBreak
            onChange={handleChange}
            onEnter={handleTitleSave}
          />
          <div className={styles.action}>
            <Button color="primary" onClick={handleTitleSave}>
              Add board
            </Button>
            <IconButton icon="close" aria-label="cancel" onClick={handleCancelClick} />
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={styles.addBoardButton}
          onClick={() => setIsInputVisible(true)}
        >
          Create new board
        </button>
      )}
    </div>
  );
};

export default AddBoard;
