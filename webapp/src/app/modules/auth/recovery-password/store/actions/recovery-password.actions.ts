import { Action } from '@ngrx/store';

export enum ActionTypes {
  RecoveryPassword = '[RecoveryPassword] RecoveryPassword',
  RecoveryPasswordSuccess = '[RecoveryPassword] RecoveryPasswordSuccess',
  RecoveryPasswordFailure = '[RecoveryPassword] RecoveryPasswordFailure',

  ChangePassword = '[RecoveryPassword] ChangePassword',
  ChangePasswordSuccess = '[RecoveryPassword] ChangePasswordSuccess',
  ChangePasswordFailure = '[RecoveryPassword] ChangePasswordFailure',
}

export class RecoveryPassword implements Action {
  readonly type = ActionTypes.RecoveryPassword;

  constructor(public payload: any) {}
}

export class RecoveryPasswordSuccess implements Action {
  readonly type = ActionTypes.RecoveryPasswordSuccess;

  constructor(public payload: any) {}
}

export class RecoveryPasswordFailure implements Action {
  readonly type = ActionTypes.RecoveryPasswordFailure;

  constructor(public payload: any) {}
}

export class ChangePassword implements Action {
  readonly type = ActionTypes.ChangePassword;

  constructor(public payload: any) {}
}

export class ChangePasswordSuccess implements Action {
  readonly type = ActionTypes.ChangePasswordSuccess;

  constructor(public payload: any) {}
}

export class ChangePasswordFailure implements Action {
  readonly type = ActionTypes.ChangePasswordFailure;

  constructor(public payload: any) {}
}

export type RecoveryPasswordActions =
  | RecoveryPassword
  | RecoveryPasswordSuccess
  | RecoveryPasswordFailure
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFailure;
