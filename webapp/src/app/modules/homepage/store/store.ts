import * as fromModels from '@app/models';

export interface HomepageState {
  isLoading: boolean;
}

export const initialState: HomepageState = {
  isLoading: true,
};
