## Data

### `KWStorageProvider`

| Props      | Type                     | Description                                                                   |
| ---------- | ------------------------ | ----------------------------------------------------------------------------- |
| `children` | `ReactNode` (_required_) | The child components that will have access to the KanbanWave storage context. |
| `storage`  | `KWStorage` (_required_) |                                                                               |

### `useKWStore`

A custom hook that provides access to the KanbanWave store. It allows you to interact with boards, lists, and cards, including functionality for reordering through drag-and-drop operations. The return type is `KWStore`.

## View

### `BoardCollection`

| Props            | Type                                                | Description                                                             |
| ---------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| `boardRender`    | `(boardProps: object, board: KWBoard) => ReactNode` | A function to customize the rendering of individual boards.             |
| `addBoardRender` | `(addBoardProps: object) => ReactNode`              | A function to customize the rendering of the "Add New Board" component. |

### `BoardView`

| Props           | Type                                             | Description                                                                |
| --------------- | ------------------------------------------------ | -------------------------------------------------------------------------- |
| `boardId`       | `string` (_required_)                            | The ID of the board to be displayed.                                       |
| `listRender`    | `(listProps: object, list: KWList) => ReactNode` | A function to customize the rendering of individual lists within the list. |
| `addListRender` | `(addListProps: object) => ReactNode`            | A function to customize the rendering of the "Add New List" component.     |
| `cardRender`    | `(cardProps: object, card: KWCard) => ReactNode` | A function to customize the rendering of individual cards within the card. |
| `addCardRender` | `(addCardProps: object) => ReactNode`            | A function to customize the rendering of the "Add New Card" component.     |

### `Board`

| Props           | Type                                | Description                                             |
| --------------- | ----------------------------------- | ------------------------------------------------------- |
| `board`         | `KWBoard` (_required_)              | The board object that contains details about the board. |
| `onClick`       | `(event: React.MouseEvent) => void` | A function to handle click events on the board.         |
| `onDeleteClick` | `(event: React.MouseEvent) => void` | A function to handle delete button clicks on the board. |

### `AddBoard`

| Props   | Type                      | Description                                                                                      |
| ------- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| `onAdd` | `(title: string) => void` | A function that gets called when a new board is added, receiving the board title as an argument. |

### `List`

| Props           | Type                                | Description                                            |
| --------------- | ----------------------------------- | ------------------------------------------------------ |
| `list`          | `KWList` (_required_)               | The list object that contains details about the list.  |
| `listIndex`     | `number` (_required_)               | The index of the list within the board.                |
| `onDeleteClick` | `(event: React.MouseEvent) => void` | A function to handle delete button clicks on the list. |
| `onTitleSave`   | `(title: string) => void`           | A function to handle saving changes to the list title. |

### `AddList`

| Props         | Type                      | Description                                                                                    |
| ------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| `listsLength` | `number`                  | The number of existing lists, used to determine list index positions.                          |
| `onAdd`       | `(title: string) => void` | A function that gets called when a new list is added, receiving the list title as an argument. |

### `Card`

| Props           | Type                                | Description                                            |
| --------------- | ----------------------------------- | ------------------------------------------------------ |
| `card`          | `KWCard` (_required_)               | The card object that contains details about the card.  |
| `cardIndex`     | `number` (_required_)               | The index of the card within the list.                 |
| `onClick`       | `(event: React.MouseEvent) => void` | A function to handle click events on the card.         |
| `onTitleSave`   | `(title: string) => void`           | A function to handle saving changes to the card title. |
| `onDeleteClick` | `(event: React.MouseEvent) => void` | A function to handle delete button clicks on the card. |

### `AddCard`

| Props         | Type                      | Description                                                                                    |
| ------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| `cardsLength` | `number`                  | The number of existing cards in the list, used to determine card index positions.              |
| `onAdd`       | `(title: string) => void` | A function that gets called when a new card is added, receiving the card title as an argument. |

## Theming

Please refer to the following file: [Theming Variables](/packages/kanbanwave/src/styles/variables.css)
