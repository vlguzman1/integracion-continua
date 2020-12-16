import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/homepage.actions';

export function HomepageReducer(state = fromStore.initialState, action: fromActions.HomepageActions): fromStore.HomepageState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

const exportLoading = (state: fromStore.HomepageState) => state.isLoading;
const selectHomepageState = createFeatureSelector<fromStore.HomepageState>('homepage');

export const getLoading = createSelector(selectHomepageState, exportLoading);
