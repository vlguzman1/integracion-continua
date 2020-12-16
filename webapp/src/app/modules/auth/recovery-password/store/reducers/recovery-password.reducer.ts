import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/recovery-password.actions';

export function RecoveryPasswordReducer(state = fromStore.initialState, action: fromActions.RecoveryPasswordActions): fromStore.RecoveryPasswordState {
  switch (action.type) {
    case fromActions.ActionTypes.RecoveryPassword: {
      return { ...state, ...{
        isLoading: true,
      }};
    }

    case fromActions.ActionTypes.RecoveryPasswordSuccess:
    case fromActions.ActionTypes.RecoveryPasswordFailure: {
      return { ...state, ...{
        isLoading: false,
        finished: false,
      }};
    }

    default: {
      return state;
    }
  }
}

const exportLoading = (state: fromStore.RecoveryPasswordState) => state.isLoading;
const exportFinished = (state: fromStore.RecoveryPasswordState) => state.finished;
const selectRecoveryPasswordState = createFeatureSelector<fromStore.RecoveryPasswordState>('recovery-password');

export const getLoading = createSelector(selectRecoveryPasswordState, exportLoading);
export const getFinished = createSelector(selectRecoveryPasswordState, exportFinished);
