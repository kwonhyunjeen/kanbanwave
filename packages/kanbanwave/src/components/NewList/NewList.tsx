import { ChangeEvent, useEffect, useState } from 'react';
import styles from './NewList.module.css';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';

type NewListProps = {
  listsLength?: number;
  onAdd?: (title: string) => void;
};

const NewList = ({ listsLength, onAdd }: NewListProps) => {
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

  useEffect(() => {
    if (listsLength === 0) {
      setIsInputVisible(true);
    } else {
      setIsInputVisible(false);
    }
  }, [listsLength]);

  return (
    <div className={styles.wrapper}>
      {isInputVisible ? (
        <div className={styles.container}>
          <TextArea
            placeholder={`Enter a list title`}
            value={title}
            onChange={handleChange}
          />
          <div className={styles.action}>
            <Button type="button" size="sm" variant="contained" onClick={handleAddClick}>
              Add list
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
          aria-label={`add a list`}
          size="lg"
          variant="contained"
          color="default"
          onClick={() => setIsInputVisible(true)}
          className={styles.addListButton}>
          Add another list
        </Button>
      )}
    </div>
  );
};

export default NewList;
