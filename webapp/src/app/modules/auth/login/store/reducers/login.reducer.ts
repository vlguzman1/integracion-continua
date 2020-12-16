import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/login.actions';

export function LoginReducer(state = fromStore.initialState, action: fromActions.LoginActions): fromStore.LoginState {
  switch (action.type) {
    case fromActions.ActionTypes.Login: {
      return { ...state, ...{
        isLoading: true,
      }};
    }

    case fromActions.ActionTypes.LoginSuccess: {
      return { ...state, ...{
        loggedIn: true,
        isLoading: false,
        user: action.payload.user,
      }};
    }

    case fromActions.ActionTypes.LoginFailure: {
      return { ...state, ...{
        isLoading: false,
        error: action.payload,
      }};
    }

    case fromActions.ActionTypes.SetToken: {
      return { ...state, ...{
        token: action.payload,
      }};
    }

    case fromActions.ActionTypes.Logout: {
      return fromStore.initialState;
    }

    default: {
      return state;
    }
  }
}

const exportLoading = (state: fromStore.LoginState) => state.isLoading;
const exportToken = (state: fromStore.LoginState) => state.token;
const exportLoggedIn = (state: fromStore.LoginState) => state.loggedIn;
const exportInitialized = (state: fromStore.LoginState) => state.initialized;
const exportError = (state: fromStore.LoginState) => state.error;
const exportUser = (state: fromStore.LoginState) => state.user;
const selectLoginState = createFeatureSelector<fromStore.LoginState>('login');

export const getLoading = createSelector(selectLoginState, exportLoading);
export const getLoggedIn = createSelector(selectLoginState, exportLoggedIn);
export const getToken = createSelector(selectLoginState, exportToken);
export const getInitialized = createSelector(selectLoginState, exportInitialized);
export const getError = createSelector(selectLoginState, exportError);
export const getUser = createSelector(selectLoginState, exportUser);
