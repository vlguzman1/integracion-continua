export interface RecoveryPasswordState {
  isLoading: boolean;
  finished: boolean;
}

export const initialState: RecoveryPasswordState = {
  isLoading: false,
  finished: false,
};
