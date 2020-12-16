import { Action } from '@ngrx/store';

import { User, Authenticate } from '@app/models/user';

export enum ActionTypes {
  Registering = '[Register] Registering',
  RegisterSuccessfully = '[Register] RegisterSuccessfully',
  RegisterFailure = '[Register] RegisterFailure',
}

export class Registering implements Action {
  readonly type = ActionTypes.Registering;

  constructor(public payload: any) {}
}

export class RegisterSuccessfully implements Action {
  readonly type = ActionTypes.RegisterSuccessfully;

  constructor(public payload: any) {}
}

export class RegisterFailure implements Action {
  readonly type = ActionTypes.RegisterFailure;

  constructor(public payload: any) {}
}

export type RegisterActions =
  | Registering
  | RegisterSuccessfully
  | RegisterFailure;
