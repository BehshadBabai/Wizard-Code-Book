import produce from 'immer';
import { ActionType } from '../actionTypes';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: ['123456', '123457'],
  data: {
    '123456': {
      id: '123456',
      content: `## Documentation
This is an interactive coding environment. You can write JavaScript, see it executed, and write comprehensive documentation using markdown.

- Click any text cell (including this one) to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in a following cell!
- You can show any react component, string, number, or anything else by calling the \`show\` function. This is a function built into this environment.
- Re-order or delete cells using the buttons on the top right
- Add new cells by hovering on the divider between each cell
`,
      variant: 'text',
    },
    '123457': {
      id: '123457',
      content: `// Creating a React Component and showing it!
      const MyComponent = () => {
        return (
          <button
            onClick={() => {
              document.querySelector('#root').parentElement.parentElement.style =
                'background-color: blue; color: white';
            }}
          >
            Click Me
          </button>
        );
      };
      
      show(MyComponent);
      `,
      variant: 'code',
    },
  },
};

const reducer = produce((state, action: Action) => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return state;
    case ActionType.FETCH_CELLS_COMPLETE:
      state.loading = false;
      state.order = action.payload.order;
      state.data = action.payload.cells.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellState['data']);
      return state;
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      } else {
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
      }
      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: '',
        variant: action.payload.variant,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const idx = state.order.findIndex((id) => id === action.payload.id);
      if (idx < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(idx + 1, 0, cell.id);
      }
      return state;
    default:
      return state;
  }
}, initialState);

const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export default reducer;
