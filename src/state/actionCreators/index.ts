import { ActionType } from '../actionTypes';
import { Dispatch } from 'redux';
import {
  UpdateCellAction,
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  Direction,
  Action,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import bundler from '../../bundler';
import { RootState } from '..';
import { fetchSingleDocument } from '../../utilities/util';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const insertCellAfter = (
  id: string | null,
  variant: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      variant,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id: cellId,
      },
    });
    const result = await bundler(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id: cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = (
  id: string,
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      // fetch from firebase
      const cellsDb = (await fetchSingleDocument('cells', id)).data() as object;
      const cells = Object.values(cellsDb).map((cell: Cell) => {
        cell.content = cell.content.replace(/  +/g, ' ');
        return cell;
      });

      const orderDb = (await fetchSingleDocument('order', '1')).data();

      const order = orderDb?.order as string[];

      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: { cells, order },
      });
    } catch (err: any) {
      dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: err.message });
    } finally {
      setPageLoading(false);
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {};
};
