import { Title } from 'app/components';
import { Fragment, useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { date, dummy } from 'app/utils';
import {
  KWBoard,
  KWBoardUUID,
  KWCard,
  KWCardForm,
  KWItemType,
  KWList,
  KWListForm
} from '../core/types';
import Card from '../components/Card';
import CardDroppable from '../components/CardDroppable';
import List from '../components/List';
import ListDroppable from '../components/ListDroppable';
import NewCard from '../components/NewCard';
import NewList from '../components/NewList';
import useQuery from '../hooks/useQuery';
import { useKanbanwaveStore } from './KanbanStorageProvider';

type BoardViewProps = {
  boardId: KWBoardUUID;
  cardRender?: (provided: {
    Component: typeof Card;
    props: React.ComponentPropsWithRef<typeof Card>;
    meta: { board: KWBoard; list: KWList; card: KWCard };
  }) => React.ReactNode;
  newCardRender?: (provided: {
    Component: typeof NewCard;
    props: React.ComponentPropsWithRef<typeof NewCard>;
    meta: { board: KWBoard; list: KWList };
  }) => React.ReactNode;
};

const BoardView = ({
  boardId: boardIdProp,
  cardRender,
  newCardRender
}: BoardViewProps) => {
  const {
    getBoardContent,
    createList,
    deleteList,
    reorderList,
    createCard,
    deleteCard,
    reorderCard
  } = useKanbanwaveStore();

  const { status, data: serverData, error } = useQuery(getBoardContent, [boardIdProp]);

  const [data, setData] = useState<NonNullable<typeof serverData>>({
    id: '',
    title: '',
    lists: []
  });

  useEffect(() => {
    if (status === 'resolved') {
      setData(serverData);
    } else if (status === 'rejected') {
      console.error('Failed to fetch board content: ', error)
    }
  }, [status, serverData, error]);

  if (status === 'pending' && !serverData) {
    return (
      <div>
        <mark>Loading...</mark>
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
    const currentDate = new Date();
    const card: KWCardForm = {
      title,
      writer: {
        id: dummy.randomUUID(),
        name: dummy.randomName(),
        email: dummy.randomEmail()
      },
      description: dummy.randomParagraphs(5),
      startDate: date.makeDayMonthYear(currentDate),
      dueDate: date.makeDayMonthYear(currentDate)
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

  return (
    <section className="app-base">
      {/** @todo edit(save) 버튼 만들기 */}
      <Title className="mb-4 text-white">{board.title}</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ListDroppable
          boardId={board.id}
          buttonSlot={<NewList onAdd={handleListAdd} listsLength={lists.length} />}
          className="flex justify-start">
          {lists.map((list, index) => (
            <List
              key={list.id}
              list={list}
              listIndex={index}
              onDeleteClick={makeListDeleteClickHandler(list.id)}>
              <CardDroppable
                listId={list.id}
                buttonSlot={(() => {
                  const newCardProps = {
                    cardsLength: list.cards?.length,
                    onAdd: makeCardAddHandler(list.id)
                  };
                  return newCardRender ? (
                    newCardRender({
                      Component: NewCard,
                      props: newCardProps,
                      meta: { board, list }
                    })
                  ) : (
                    <NewCard {...newCardProps} />
                  );
                })()}
                className="flex flex-col p-2">
                {list.cards?.map((card, index) => {
                  const cardProps = {
                    card: card,
                    cardIndex: index,
                    onDeleteClick: makeCardDeleteClickHandler(list.id, card.id)
                  };
                  return (
                    <Fragment key={`${list.id}:${card.id}`}>
                      {cardRender ? (
                        cardRender({
                          Component: Card,
                          props: cardProps,
                          meta: { board, list, card }
                        })
                      ) : (
                        <Card {...cardProps} />
                      )}
                    </Fragment>
                  );
                })}
              </CardDroppable>
            </List>
          ))}
        </ListDroppable>
      </DragDropContext>
    </section>
  );
};

export default BoardView;
