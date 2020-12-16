import { Action } from '@ngrx/store';

export enum ActionTypes {
  Init = '[Homepage] Init',
}

export class Init implements Action {
  readonly type = ActionTypes.Init;
}

export type HomepageActions =
  | Init;
