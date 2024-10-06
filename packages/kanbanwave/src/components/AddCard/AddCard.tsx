import { ChangeEvent, useEffect, useState } from 'react';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import styles from './AddCard.module.css';
import forwardAs from 'utils/forwardAs';

type AddCardProps = {
  cardsLength?: number;
  onAdd?: (title: string) => void;
};

const AddCard = forwardAs<'div', AddCardProps>(
  ({ as: Component = 'div', cardsLength, onAdd, ...rest }, ref) => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [title, setTitle] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

    useEffect(() => {
      if (cardsLength === 0) {
        setIsInputVisible(true);
      } else {
        setIsInputVisible(false);
      }
    }, [cardsLength]);

    return (
      <Component {...rest} ref={ref} className={styles.container}>
        {isInputVisible ? (
          <>
            <TextArea
              placeholder={`Enter a card title`}
              value={title}
              preventLineBreak
              onChange={handleChange}
              onEnter={handleTitleSave}
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
      </Component>
    );
  }
);

AddCard.displayName = 'AddCard';

export default AddCard;
