import { forwardRef, Fragment, useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {
  KWBoardUUID,
  KWCard,
  KWCardForm,
  KWItemType,
  KWList,
  KWListForm
} from '../../core/types';
import Card from '../../components/Card/Card';
import CardDroppable from '../../components/CardDroppable';
import Input from '../../components/Input/Input';
import List from '../../components/List/List';
import ListDroppable from '../../components/ListDroppable';
import AddCard from '../../components/AddCard/AddCard';
import AddList from '../../components/AddList/AddList';
import useQuery from '../../hooks/useQuery';
import { useKWStore } from '../KWStorageProvider';
import useDerivedState from '../../hooks/useDerivedState';
import styles from './BoardView.module.css';
import Spinner from '../../components/Spinner/Spinner';

type BoardViewRef = React.ComponentRef<'section'>;

type BoardViewProps = React.ComponentPropsWithoutRef<'section'> & {
  boardId: KWBoardUUID;
  cardRender?: (provided: {
    cardProps: React.ComponentProps<typeof Card>;
    card: KWCard;
  }) => React.ReactNode;
  addCardRender?: (provided: {
    addCardProps: React.ComponentProps<typeof AddCard>;
  }) => React.ReactNode;
  listRender?: (provided: {
    listProps: React.ComponentProps<typeof List>;
    list: KWList;
  }) => React.ReactNode;
  addListRender?: (provided: {
    addListProps: React.ComponentProps<typeof AddList>;
  }) => React.ReactNode;
};

const BoardView = forwardRef<BoardViewRef, BoardViewProps>(
  (
    {
      boardId: boardIdProp,
      cardRender,
      addCardRender,
      listRender,
      addListRender,
      ...rest
    },
    ref
  ) => {
    const {
      getBoardContent,
      updateBoard,
      createList,
      updateList,
      deleteList,
      reorderList,
      createCard,
      updateCard,
      deleteCard,
      reorderCard
    } = useKWStore();

    const { status, data: serverData, error } = useQuery(getBoardContent, [boardIdProp]);

    const [data, setData] = useState<NonNullable<typeof serverData>>({
      id: '',
      title: '',
      lists: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [internalTitle, setInternalTitle] = useDerivedState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    useEffect(() => {
      setInternalTitle(serverData?.title || '');
    }, [serverData?.title, setInternalTitle]);

    useEffect(() => {
      if (status === 'resolved') {
        setData(serverData);
      } else if (status === 'rejected') {
        console.error('Failed to fetch board content: ', error);
      }
    }, [status, serverData, error]);

    if (status === 'pending' && !serverData) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    const { lists, ...board } = data;

    const handleListAdd = (title: string) => {
      const list: KWListForm = { title };
      createList(board.id, list);
    };

    const makeListDeleteClickHandler = (listId: string) => () => {
      deleteList(board.id, listId);
    };

    const makeCardAddHandler = (listId: string) => (title: string) => {
      const card: KWCardForm = {
        title
      };
      createCard(board.id, listId, card);
    };

    const makeCardDeleteClickHandler = (listId: string, cardId: string) => () => {
      deleteCard(board.id, listId, cardId);
    };

    const handleDragEnd = (result: DropResult) => {
      const { type, draggableId, source, destination } = result;
      if (!destination) return;

      if (type === KWItemType.LIST) {
        const originLists = data.lists;
        const newListOrders = [...originLists];
        const [removed] = newListOrders.splice(source.index, 1);
        newListOrders.splice(destination.index, 0, removed);
        setData(prev => ({ ...prev, lists: newListOrders }));

        try {
          reorderList(board.id, draggableId, destination.index);
        } catch (error) {
          console.error('Failed to change list order:', error);
          setData({ ...data, lists: originLists });
        }
      } else if (type === KWItemType.CARD) {
        if (source.droppableId === destination.droppableId) {
          const sourceList = data.lists.find(list => list.id === source.droppableId);
          if (!sourceList) return;

          const newCards = [...sourceList.cards];
          const [remove] = newCards.splice(source.index, 1);
          newCards.splice(destination.index, 0, remove);

          setData(prev => ({
            ...prev,
            lists: prev.lists.map(list => {
              if (list.id === source.droppableId) {
                return { ...list, cards: newCards };
              }
              return list;
            })
          }));

          try {
            reorderCard(
              board.id,
              source.droppableId,
              destination.droppableId,
              draggableId,
              destination.index
            );
          } catch (error) {
            console.error('Failed to change card order: ', error);
            setData(prev => ({
              ...prev,
              lists: prev.lists.map(list => {
                if (list.id === source.droppableId) {
                  return { ...list, cards: sourceList.cards };
                }
                return list;
              })
            }));
          }
        } else {
          const sourceList = data.lists.find(list => list.id === source.droppableId);
          const destinationList = data.lists.find(
            list => list.id === destination.droppableId
          );
          if (!sourceList || !destinationList) return;

          const newSourceCards = [...sourceList.cards];
          const newDestinationCards = [...destinationList.cards];
          const [remove] = newSourceCards.splice(source.index, 1);
          newDestinationCards.splice(destination.index, 0, remove);

          setData(prev => ({
            ...prev,
            lists: prev.lists.map(list => {
              if (list.id === source.droppableId) {
                return { ...list, cards: newSourceCards };
              }
              if (list.id === destination.droppableId) {
                return { ...list, cards: newDestinationCards };
              }
              return list;
            })
          }));

          try {
            reorderCard(
              board.id,
              source.droppableId,
              destination.droppableId,
              draggableId,
              destination.index
            );
          } catch (error) {
            console.error('Failed to change card order:', error);
            setData(prev => ({
              ...prev,
              lists: prev.lists.map(list => {
                if (list.id === source.droppableId) {
                  return { ...list, cards: sourceList.cards };
                }
                if (list.id === destination.droppableId) {
                  return { ...list, cards: destinationList.cards };
                }
                return list;
              })
            }));
          }
        }
      }
    };

    const handleBoardTitleSave = () => {
      setIsEditing(false);
      if (internalTitle.trim() === '') {
        setInternalTitle(data.title);
      } else {
        updateBoard({ id: boardIdProp, title: internalTitle });
      }
    };

    const makeListTitleSaveHandler = (listId: string) => (newTitle: string) => {
      const listToUpdate = data.lists.find(list => list.id === listId);
      if (listToUpdate) {
        const updatedList = { ...listToUpdate, title: newTitle };
        updateList(board.id, updatedList);
      }
    };

    const makeCardTitleSaveHandler =
      (listId: string, card: KWCard) => (newTitle: string) => {
        const cardToUpdate = data.lists
          .find(list => list.id === listId)
          ?.cards.find(c => c.id === card.id);
        if (cardToUpdate) {
          const updatedCard = { ...cardToUpdate, title: newTitle };
          updateCard(board.id, listId, updatedCard);
        }
      };

    return (
      <section {...rest} ref={ref} className={styles.container}>
        <div className={styles.header}>
          {isEditing ? (
            <Input
              ref={inputRef}
              value={internalTitle}
              preventLineBreak
              onChange={e => setInternalTitle(e.target.value)}
              onBlur={handleBoardTitleSave}
              onEnter={handleBoardTitleSave}
              resize={true}
              style={{ fontSize: '1.25rem', fontWeight: '600' }}
            />
          ) : (
            <h1
              className={styles.boardTitle}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              onFocus={() => {
                setIsEditing(true);
              }}
            >
              {internalTitle}
            </h1>
          )}
        </div>
        <div className={styles.content}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <ListDroppable
              boardId={board.id}
              // buttonSlot={<AddList onAdd={handleListAdd} listsLength={lists.length} />}
              className={styles.listDroppable}
              buttonSlot={(() => {
                const addListProps = {
                  listsLength: lists.length,
                  onAdd: handleListAdd
                };
                return addListRender ? (
                  addListRender({
                    addListProps: addListProps
                  })
                ) : (
                  <AddList {...addListProps} />
                );
              })()}
            >
              {lists.map((list, index) => {
                const listProps = {
                  list: list,
                  listIndex: index,
                  onDeleteClick: makeListDeleteClickHandler(list.id),
                  onTitleSave: makeListTitleSaveHandler(list.id)
                };
                return listRender ? (
                  listRender({
                    listProps: listProps,
                    list: list
                  })
                ) : (
                  <List key={list.id} {...listProps}>
                    <CardDroppable
                      className={styles.cardDroppable}
                      listId={list.id}
                      buttonSlot={(() => {
                        const addCardProps = {
                          cardsLength: list.cards?.length,
                          onAdd: makeCardAddHandler(list.id)
                        };
                        return addCardRender ? (
                          addCardRender({
                            addCardProps: addCardProps
                          })
                        ) : (
                          <AddCard {...addCardProps} />
                        );
                      })()}
                    >
                      {list.cards?.map((card, index) => {
                        const cardProps = {
                          card: card,
                          cardIndex: index,
                          onDeleteClick: makeCardDeleteClickHandler(list.id, card.id),
                          onTitleSave: makeCardTitleSaveHandler(list.id, card)
                        };
                        return (
                          <Fragment key={`${list.id}:${card.id}`}>
                            {cardRender ? (
                              cardRender({
                                cardProps: cardProps,
                                card: card
                              })
                            ) : (
                              <Card {...cardProps} />
                            )}
                          </Fragment>
                        );
                      })}
                    </CardDroppable>
                  </List>
                );
              })}
            </ListDroppable>
          </DragDropContext>
        </div>
      </section>
    );
  }
);

BoardView.displayName = 'BoardView';

export default BoardView;
