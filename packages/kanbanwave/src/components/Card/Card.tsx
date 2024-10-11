import { useCallback, useEffect, useRef, useState } from 'react';
import { KWCard } from '../../core/types';
import CardDraggable from '../CardDraggable';
import TextArea from '../TextArea/TextArea';
import useDerivedState from '../../hooks/useDerivedState';
import styles from './Card.module.css';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import forwardAs from 'utils/forwardAs';
import useForkRef from 'hooks/useForkRef';

type CardProps = {
  card: KWCard;
  cardIndex: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onTitleSave?: (newTitle: string) => void;
  onDeleteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card = forwardAs<'div', CardProps>(
  (
    {
      as: Component = 'div',
      card,
      cardIndex,
      onClick,
      onTitleSave,
      onDeleteClick,
      ...rest
    },
    ref
  ) => {
    const containerRef = useRef<HTMLElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const containerCallbackRef = useForkRef(containerRef, ref);

    const [internalTitle, setInternalTitle] = useDerivedState(card.title);
    const [isEditing, setIsEditing] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [cardRect, setCardRect] = useState<DOMRect | null>(null);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    const openOverlay = useCallback(() => {
      setIsEditing(true);
      setOverlayVisible(true);
    }, []);

    const closeOverlay = useCallback(() => {
      setIsEditing(false);
      setOverlayVisible(false);
      setInternalTitle(card.title);
    }, [card.title, setInternalTitle]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          closeOverlay();
        }
      };

      if (isEditing) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isEditing, card.title, setInternalTitle, closeOverlay]);

    useEffect(() => {
      const handleEscKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeOverlay();
        }
      };

      if (isEditing) {
        document.addEventListener('keydown', handleEscKeydown);
      }

      return () => {
        document.removeEventListener('keydown', handleEscKeydown);
      };
    }, [isEditing, card.title, setInternalTitle, closeOverlay]);

    useEffect(() => {
      if (containerRef.current) {
        setCardRect(containerRef.current.getBoundingClientRect());
      }
    }, [isEditing]);

    const handleTitleSave = () => {
      setIsEditing(false);
      if (internalTitle.trim() === '') {
        setInternalTitle(card.title);
      } else {
        onTitleSave?.(internalTitle);
      }
      setOverlayVisible(false);
    };

    return (
      <>
        {isOverlayVisible && (
          // 키보드 탐색 시 이 요소에 포커싱하는 것은 불편함을 초래하고,
          // 이미 ESC를 눌러 오버레이를 닫을 수 있기 때문에 lint 규칙을 비활성화함
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
          <div
            role="button"
            aria-label="Cancel"
            className={styles.cardOverlay}
            onClick={closeOverlay}
          />
        )}
        <CardDraggable
          cardId={card.id}
          cardIndex={cardIndex}
          className={styles.cardDraggable}
        >
          <Component {...rest} ref={containerCallbackRef} className={styles.root}>
            {isEditing && cardRect ? (
              <div
                className={styles.cardEditContainer}
                style={{
                  top: `${cardRect.top}px`,
                  left: `${cardRect.left}px`,
                  width: `${cardRect.width}px`
                }}
              >
                <TextArea
                  ref={inputRef}
                  value={internalTitle}
                  preventLineBreak
                  onChange={e => setInternalTitle(e.target.value)}
                  onEnter={handleTitleSave}
                  style={{ minHeight: '4.5rem' }}
                />
                <div className={styles.cardActions}>
                  <Button type="button" color="primary" onClick={handleTitleSave}>
                    Save
                  </Button>
                  <Button type="button" color="primary" onClick={onDeleteClick}>
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                className={styles.cardContainer}
                onClick={e => {
                  onClick?.(e);
                  if (!(e.target instanceof Element)) {
                    return;
                  }
                  if (e.target.closest('[data-event-target="edit-button"]')) {
                    e.preventDefault();
                  }
                }}
              >
                <div className={styles.cardTitle}>{internalTitle}</div>
                <IconButton
                  type="button"
                  aria-label="edit a card"
                  data-event-target="edit-button"
                  icon="edit"
                  className={styles.cardEditIcon}
                  color="secondary"
                  onClick={() => {
                    openOverlay();
                  }}
                />
              </div>
            )}
          </Component>
        </CardDraggable>
      </>
    );
  }
);

Card.displayName = 'Card';

export default Card;
