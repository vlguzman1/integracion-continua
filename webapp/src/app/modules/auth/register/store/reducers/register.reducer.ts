import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/register.actions';

export function RegisterReducer(state = fromStore.initialState, action: fromActions.RegisterActions): fromStore.RegisterState {
  switch (action.type) {
    case fromActions.ActionTypes.Registering: {
      return { ...state, ...{
        isLoading: true,
      }};
    }

    case fromActions.ActionTypes.RegisterFailure:
    case fromActions.ActionTypes.RegisterSuccessfully: {
      return { ...state, ...{
        isLoading: false,
      }};
    }

    default: {
      return state;
    }
  }
}

const exportLoading = (state: fromStore.RegisterState) => state.isLoading;
const selectRegisterState = createFeatureSelector<fromStore.RegisterState>('register');

export const getLoading = createSelector(selectRegisterState, exportLoading);
