import { ChangeEvent, useEffect, useState } from 'react';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import styles from './AddCard.module.css';

type AddCardProps = {
  cardsLength?: number;
  onAdd?: (title: string) => void;
};

const AddCard = ({ cardsLength, onAdd }: AddCardProps) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSave = () => {
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
    if (cardsLength === 0) {
      setIsInputVisible(true);
    } else {
      setIsInputVisible(false);
    }
  }, [cardsLength]);

  return (
    <div className={styles.container}>
      {isInputVisible ? (
        <>
          <TextArea
            placeholder={`Enter a card title`}
            value={title}
            onChange={handleChange}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleTitleSave();
              }
            }}
          />
          <div className={styles.action}>
            <Button color="primary" onClick={handleTitleSave}>
              Add card
            </Button>
            <IconButton
              type="button"
              icon="close"
              aria-label="cancel"
              onClick={handleCancelClick}
            />
          </div>
        </>
      ) : (
        <Button
          aria-label={`add a card`}
          onClick={() => setIsInputVisible(true)}
          startIcon={<Icon name="add" />}
          className={styles.addCardButton}
        >
          Add a card
        </Button>
      )}
    </div>
  );
};

export default AddCard;
