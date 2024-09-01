import { ChangeEvent, useState } from 'react';
import styles from './NewBoard.module.css';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';

type NewBoardProps = {
  className?: string;
  onAdd?: (title: string) => void;
};

const NewBoard = ({ onAdd }: NewBoardProps) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          <TextArea
            placeholder={`Enter a board title`}
            value={title}
            onChange={handleChange}
          />
          <div className={styles.action}>
            <Button type="button" size="sm" variant="contained" onClick={handleAddClick}>
              Add board
            </Button>
            <IconButton
              type="button"
              size="sm"
              icon="close"
              aria-label="cancel"
              onClick={handleCancelClick}
            />
          </div>
        </div>
      ) : (
        <Button
          aria-label={`add a board`}
          size="lg"
          variant="contained"
          color="default"
          onClick={() => setIsInputVisible(true)}
          className={styles.addBoardButton}
        >
          Create new board
        </Button>
      )}
    </div>
  );
};

export default NewBoard;
