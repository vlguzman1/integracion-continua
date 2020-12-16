import { Action } from '@ngrx/store';

import { User, Authenticate } from '@app/models/user';

export enum ActionTypes {
  Login = '[Login] Login',
  Logout = '[Login] Logout',
  LoginSuccess = '[Login] Login Success',
  LoginFailure = '[Login] Login Failure',
  LoginRedirect = '[Login] Login Redirect',
  SetToken = '[Login] Get Token',
  ActivateUser = '[Login] ActivateUser',
  ActivateUserSuccess = '[Login] ActivateUserSuccess',
  ActivateUserFailure = '[Login] ActivateUserFailure',
}

export class Login implements Action {
  readonly type = ActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class SetToken implements Action {
  readonly type = ActionTypes.SetToken;

  constructor(public payload: string) {}
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LoginSuccess;

  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = ActionTypes.LoginFailure;

  constructor(public payload: string) {}
}

export class LoginRedirect implements Action {
  readonly type = ActionTypes.LoginRedirect;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}

export class ActivateUser implements Action {
  readonly type = ActionTypes.ActivateUser;

  constructor(public payload: any) {}
}
export class ActivateUserSuccess implements Action {
  readonly type = ActionTypes.ActivateUserSuccess;

  constructor(public payload: any) {}
}
export class ActivateUserFailure implements Action {
  readonly type = ActionTypes.ActivateUserFailure;

  constructor(public payload: any) {}
}

export type LoginActions =
  | Login
  | LoginSuccess
  | SetToken
  | LoginFailure
  | LoginRedirect
  | ActivateUser
  | ActivateUserSuccess
  | ActivateUserFailure
  | Logout;
