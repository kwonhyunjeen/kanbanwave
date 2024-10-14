import { ChangeEvent, useState } from 'react';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import styles from './AddCard.module.css';
import forwardAs from 'utils/forwardAs';
import clsx from 'clsx';

type AddCardProps = {
  className?: string;
  onAdd?: (title: string) => void;
};

const AddCard = forwardAs<'div', AddCardProps>(
  ({ as: Component = 'div', className, onAdd, ...rest }, ref) => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [title, setTitle] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTitle(e.target.value);
    };

    const handleTitleSave = () => {
      if (title.trim() !== '') {
        onAdd?.(title);
        setTitle('');
        setIsInputVisible(true);
      }
    };

    const handleCancelClick = () => {
      setTitle('');
      setIsInputVisible(false);
    };

    return (
      <Component {...rest} ref={ref} className={clsx(styles.root, className)}>
        {isInputVisible ? (
          <>
            <TextArea
              placeholder={`Enter a card title`}
              value={title}
              preventLineBreak
              onChange={handleChange}
              onEnter={handleTitleSave}
            />
            <div className={styles.addCardActions}>
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
