## Data

### KWStorageProvider

| Props                                | Description                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| `children`: `(ReactNode)` - required | The child components that will have access to the KanbanWave storage context. |

### useKWStore

| Arguments            | Description                                                                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useKWStore` | A custom hook that provides access to the KanbanWave store. It allows you to interact with boards, lists, and cards, including functionality for reordering through drag-and-drop operations. |

## View

### BoardCollection

| Props                                                  | Description                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------------- |
| `boardRender`: `(function) => ReactNode` - optional    | A function to customize the rendering of individual boards.             |
| `addBoardRender`: `(function) => ReactNode` - optional | A function to customize the rendering of the "Add New Board" component. |

### BoardView

| Props                                                 | Description                                                                 |
| ----------------------------------------------------- | --------------------------------------------------------------------------- |
| `boardId`: `string` - required                        | The ID of the board to be displayed.                                        |
| `listRender`: `(function) => ReactNode` - optional    | A function to customize the rendering of individual lists within the board. |
| `addListRender`: `(function) => ReactNode` - optional | A function to customize the rendering of the "Add New List" component.      |
| `cardRender`: `(function) => ReactNode` - optional    | A function to customize the rendering of individual cards within the board. |
| `addCardRender`: `(function) => ReactNode` - optional | A function to customize the rendering of the "Add New Card" component.      |

### Board

| Props                                              | Description                                             |
| -------------------------------------------------- | ------------------------------------------------------- |
| `board`: `KWBoard` - required                      | The board object that contains details about the board. |
| `onClick`: `(MouseEvent) => void` - optional       | A function to handle click events on the board.         |
| `onDeleteClick`: `(MouseEvent) => void` - optional | A function to handle delete button clicks on the board. |

### AddBoard

| Props                                         | Description                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `onAdd`: `(title: string) => void` - optional | A function that gets called when a new board is added, receiving the board title as an argument. |

### List

| Props                                                  | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ |
| `list`: `KWList` - required                            | The list object that contains details about the list.  |
| `listIndex`: `number` - required                       | The index of the list within the board.                |
| `onDeleteClick`: `(MouseEvent) => void` - optional     | A function to handle delete button clicks on the list. |
| `onTitleSave`: `(newTitle: string) => void` - optional | A function to handle saving changes to the list title. |

### AddList

| Props                                         | Description                                                                                    |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `listsLength`: `number` - optional            | The number of existing lists, used to determine list index positions.                          |
| `onAdd`: `(title: string) => void` - optional | A function that gets called when a new list is added, receiving the list title as an argument. |

### Card

| Props                                                  | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ |
| `card`: `KWCard` - required                            | The card object that contains details about the card.  |
| `cardIndex`: `number` - required                       | The index of the card within the list.                 |
| `onClick`: `(MouseEvent) => void` - optional           | A function to handle click events on the card.         |
| `onTitleSave`: `(newTitle: string) => void` - optional | A function to handle saving changes to the card title. |
| `onDeleteClick`: `(MouseEvent) => void` - optional     | A function to handle delete button clicks on the card. |

### AddCard

| Props                                         | Description                                                                                    |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `cardsLength`: `number` - optional            | The number of existing cards in the list, used to determine card index positions.              |
| `onAdd`: `(title: string) => void` - optional | A function that gets called when a new card is added, receiving the card title as an argument. |
