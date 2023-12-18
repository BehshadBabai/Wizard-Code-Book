import { Dispatch } from 'redux';
import { RootState } from '..';
import { saveCells } from '../actionCreators';
import { Action } from '../actions';
import { ActionType } from '../actionTypes';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: unknown) => unknown) => {
    return (action: unknown) => {
      next(action);
      const typedAction = action as Action;

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(typedAction.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
