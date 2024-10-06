import { ChangeEvent, useEffect, useState } from 'react';
import styles from './AddList.module.css';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import forwardAs from 'utils/forwardAs';

type AddListProps = {
  listsLength?: number;
  onAdd?: (title: string) => void;
};

const AddList = forwardAs<'div', AddListProps>(
  ({ as: Component = 'div', listsLength, onAdd, ...rest }, ref) => {
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
      if (listsLength === 0) {
        setIsInputVisible(true);
      } else {
        setIsInputVisible(false);
      }
    }, [listsLength]);

    return (
      <Component {...rest} ref={ref} className={styles.wrapper}>
        {isInputVisible ? (
          <div className={styles.container}>
            <TextArea
              placeholder={`Enter a list title`}
              value={title}
              preventLineBreak
              onChange={handleChange}
              onEnter={handleTitleSave}
            />
            <div className={styles.action}>
              <Button color="primary" onClick={handleTitleSave}>
                Add list
              </Button>
              <IconButton
                type="button"
                icon="close"
                aria-label="cancel"
                onClick={handleCancelClick}
              />
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={styles.addListButton}
            onClick={() => setIsInputVisible(true)}
          >
            Add another list
          </button>
        )}
      </Component>
    );
  }
);

AddList.displayName = 'AddList';

export default AddList;
