## Integrate Storage

To use `KanbanWave`, you need to provide a storage object that handles API calls or database operations. You should implement a `KWStorage` object to define how to interact with boards, lists, and cards.

Here’s an example of integrating custom API calls:

```tsx
import { KWStorageProvider, KWStorage } from 'kanbanwave';

const storage: KWStorage = {
  createCard: (boardId, listId, cardForm) =>
    axios.post('/cards', { boardId, listId, cardForm }),
  updateCard: (boardId, listId, card) =>
    axios.put(`/cards/${card.id}`),
  deleteCard: (boardId, listId, cardId) =>
    axios.delete(`/cards/${cardId}`),
  reorderCard: (boardId, fromListId, toListId, draggedCardId, droppedCardIndex) =>
    axios.patch('/reorder-cards', { boardId, fromListId, toListId, draggedCardId, droppedCardIndex })
  /* ... */
};

function App() {
  return (
    <KWStorageProvider storage={storage}>
      {children}
    </KWStorageProvider>;
  )
}
```

For more details on implementing the storage interface, please refer to the [API documentation](./api.md).

## <a id="display-board"></a> Display Board Collection and Board

Once the storage is set up, you can render the `BoardCollection` and `BoardView` components to display boards and lists. These components can be used with routing libraries like React Router.

### Displaying All Baords

```tsx
import { BoardCollection } from 'kanbanwave';

function BoardListPage() {
  return <BoardCollection />;
}
```

`BoardCollection` renders a list of all the boards available in your storage. Users can manage multiple boards directly from this component.

### Viewing a Specific Board

```tsx
import { BoardView } from 'kanbanwave';
import { useParams } from 'react-router-dom';

function BoardContentPage() {
  const { boardId } = useParams<RouterParamKeys>();
  if (boardId == null) {
    return 'Error!';
  }
  return <BoardView boardId={boardId} />;
}
```

`BoardView` renders the lists and cards of a specific board, based on the boardId retrieved from the route.

### Routing with React Router

You can set up routes to display the list of boards and view a specific board using React Router.

```tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    { path: '/', element: <Navigate to="/boards" /> },
    { path: '/boards', element: <BoardListPage /> },
    { path: '/boards/:boardId', element: <BoardContentPage /> }
  },
]);

export default router;
```

And you can fix it like this. Customize the way boards are rendered within `BoardCollection` by wrapping each board with React Router's `Link` component.

```tsx
import { Board, BoardCollection } from 'kanbanwave';
import { Link } from 'react-router-dom';

function BoardListPage() {
  return (
    <BoardCollection
      boardRender={{ boardProps, board } => (
        <Link to={`/boards/${board.id}`}>
          <Board {...boardProps} />
        </Link>
      )}
    />
  );
}
```

In this example, each board is wrapped with a `Link` that navigates to the board’s detailed view. This allows users to click on a board and be redirected to a page where they can see the lists and cards for that board.

For more advanced customization options, such as customizing the rendering of boards, lists, and cards, refer to the [Customization](./usage.md#customization) section.

## Customization

There are functional props available for customizing the board, list, and card components, as well as the components for adding new boards, lists, and cards. These props allow you to replace or extend the default components provided.

### Board Customization

- The `boardRender` is a function that allows you to customize how the `Board` component is rendered. If you don't provide this `boardRender` prop, the default `Board` component will be rendered.

- The `addBoardRender` is a function that lets you customize the `AddBoard` component used for adding new boards. Similarly, you can replace or extend the default `AddBoard` component with your own.

```tsx
import { Board, AddBoard } from 'kanbanwave';

<BoardCollection
  boardRender={(boardProps, board) => <Board {...boardProps} />}
  addBoardRender={addBoardProps => <AddBoard {...addBoardProps} />}
/>;
```

### List and Card Customization

It's the same as board. In the `BoardView` component, customize how each list and card is rendered using the `listRender` and `cardRender` props. Use `addListRender` and `addCardRender` to customize the rendering of components for adding new lists and cards.

```tsx
import { List, AddList, Card, AddCard } from 'kanbanwave';

<BoardView
  listRender={(listProps, list) => <List {...listProps} />}
  addListRender={addListProps => <AddList {...addListProps} />}
  cardRender={(cardProps, card) => <Card {...cardProps} />}
  addCardRender={addCardProps => <AddCard {...addCardProps} />}
/>;
```
