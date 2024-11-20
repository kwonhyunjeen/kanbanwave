import { ChangeEvent, useState } from 'react';
import styles from './AddBoard.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import forwardAs from 'utils/forwardAs';
import Icon from 'components/Icon/Icon';
import clsx from 'clsx';

type AddBoardProps = {
  className?: string;
  onAdd?: (title: string) => void;
};

const AddBoard = forwardAs<'div', AddBoardProps>(
  ({ as: Component = 'div', className, onAdd, ...rest }, ref) => {
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
      <Component {...rest} ref={ref} className={clsx(styles.root, className)}>
        {isInputVisible ? (
          <div className={styles.addBoardContainer}>
            <Input
              placeholder={`Enter a board title`}
              value={title}
              preventLineBreak
              onChange={handleChange}
              onEnter={handleTitleSave}
            />
            <div className={styles.addBoardActions}>
              <Button
                color="primary"
                onClick={handleTitleSave}
                endIcon={<Icon name="add" />}
              >
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
      </Component>
    );
  }
);

AddBoard.displayName = 'AddBoard';

export default AddBoard;
