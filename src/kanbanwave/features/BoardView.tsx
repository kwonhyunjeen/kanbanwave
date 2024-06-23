import { Title } from 'app/components';
import { Fragment, useCallback } from 'react';
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
import { useKanbanBoardView } from './KanbanStorageProvider';

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
  const boardViewStore = useKanbanBoardView();

  const { lists, ...board } = boardViewStore.getBoardContent(boardIdProp);

  const handleListAdd = useCallback(
    (title: string) => {
      const list: KWListForm = { title };
      boardViewStore.createList(board.id, list);
    },
    [boardViewStore, board.id]
  );

  const makeListDeleteClickHandler = useCallback(
    (listId: string) => () => {
      boardViewStore.deleteList(board.id, listId);
    },
    [boardViewStore, board.id]
  );

  const makeCardAddHandler = useCallback(
    (listId: string) => (title: string) => {
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
      boardViewStore.createCard(board.id, listId, card);
    },
    [boardViewStore, board.id]
  );

  const makeCardDeleteClickHandler = useCallback(
    (listId: string, cardId: string) => () => {
      boardViewStore.deleteCard(board.id, listId, cardId);
    },
    [boardViewStore, board.id]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { type, draggableId, source, destination } = result;
      if (!destination) return;

      if (type === KWItemType.LIST) {
        boardViewStore.reorderList(
          destination.droppableId,
          draggableId,
          destination.index
        );
      } else if (type === KWItemType.CARD) {
        boardViewStore.reorderCard(
          board.id,
          source.droppableId,
          destination.droppableId,
          draggableId,
          destination.index
        );
      }
    },
    [boardViewStore, board.id]
  );

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
