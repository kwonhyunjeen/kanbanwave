import { useToggle } from 'app/hooks';
import { IconButton, TextArea } from 'app/components';
import { KWCard } from '../core/types';
import CardDraggable from './CardDraggable';
import { useEffect, useRef, useState } from 'react';

type CardProps = {
  card: KWCard;
  cardIndex: number;
  /** @todo cardRender에서 onClick을 주입할 수 있도록 리팩토링 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onTitleSave?: (newTitle: string) => void;
  onDeleteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card = ({ card, cardIndex, onClick, onTitleSave, onDeleteClick }: CardProps) => {
  const [open, menuOpen] = useToggle(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(card.title);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setCurrentTitle(card.title);
  }, [card.title]);

  const handleMenuOpen = () => {
    menuOpen();
  };

  const handleTitleSave = () => {
    setIsEditing(false);
    if (currentTitle.trim() !== '') {
      onTitleSave?.(currentTitle);
    } else {
      setCurrentTitle(card.title);
    }
    handleMenuOpen();
  };

  return (
    <CardDraggable cardId={card.id} cardIndex={cardIndex}>
      {isEditing ? (
        <TextArea
          ref={inputRef}
          value={currentTitle}
          onChange={e => setCurrentTitle(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleTitleSave();
            }
          }}
          className="px-2 mb-1 text-lg"
          autoFocus
        />
      ) : (
        <>
          <div
            className="card group"
            onClick={e => {
              onClick?.(e);
              if (!(e.target instanceof Element)) {
                return;
              }
              if (e.target.closest('[data-event-target="menu-button"]')) {
                e.preventDefault();
              }
            }}>
            <div className="relative flex items-center justify-between overflow-hidden break-words whitespace-normal">
              <div className="w-[calc(100%-32px)]">{card.title}</div>
              <IconButton
                name="edit"
                className="single-icon group-hover:flex"
                onClick={handleMenuOpen}
                data-event-target="menu-button"
              />
            </div>
          </div>
        </>
      )}
      {open && (
        <ul className="flex flex-row justify-around mb-1 menu menu-vertical lg:menu-horizontal">
          <li>
            {isEditing ? (
              <button
                type="button"
                onClick={() => {
                  if (isEditing) {
                    handleTitleSave();
                  } else {
                    handleMenuOpen();
                  }
                }}
                className="text-white bg-zinc-400 rounded-xl">
                Save card
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-white bg-zinc-400 rounded-xl">
                Edit card
              </button>
            )}
          </li>
          <li>
            <button
              type="button"
              onClick={onDeleteClick}
              className="text-white bg-zinc-400 rounded-xl">
              Delete card
            </button>
          </li>
        </ul>
      )}
    </CardDraggable>
  );
};

export default Card;
