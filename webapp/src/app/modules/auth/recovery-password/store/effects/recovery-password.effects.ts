import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable,  of } from 'rxjs';
import { tap, map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';

import * as fromModels from '@app/models';

import * as fromServicesShared from '@shared/services';
import * as fromStoreShared from '@shared/store';
import * as fromActionsShared from '@shared/store/actions/shared.actions';
import * as fromStoreCore from '@core/store/store';
import * as fromActionsCore from '@app/core/store/actions/router.actions';

import * as fromServices from '@recovery-password/services';
import * as fromStore from '../store';
import * as fromActions from '../actions/recovery-password.actions';

declare var componentHandler: any;

@Injectable()
export class RecoveryPasswordEffects {
  @Effect()
  recoveryPassword$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.RecoveryPassword),
    map((action: fromActions.RecoveryPassword) => action.payload),
    exhaustMap((email: any) =>
      this._service.recoveryPassword(email).pipe(
        map(response => new fromActions.RecoveryPasswordSuccess(response)),
        catchError(error => of(new fromActions.RecoveryPasswordFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  recoveryPasswordSuccess$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.RecoveryPasswordSuccess),
    map((action: fromActions.RecoveryPasswordSuccess) => action.payload),
    tap((response) => {
      const config = {
        width: '450px',
        data: {
          title: 'Atención',
          message: response.message,
        },
        onClose: () => { }
      }

      this._utils.showDialog(config);
    })
  );

  @Effect({ dispatch: false })
  recoveryPasswordFailure$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.RecoveryPasswordFailure),
    map((action: fromActions.RecoveryPasswordFailure) => action.payload),
    tap((message) => {
      const config = {
        width: '450px',
        data: {
          title: 'Atención',
          type: 'alert',
          message: message,
        },
        onClose: () => { }
      }

      this._utils.showDialog(config);
    })
  );

  @Effect()
  changePassword$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.ChangePassword),
    map((action: fromActions.ChangePassword) => action.payload),
    exhaustMap((password: any) =>
      this._service.changePassword(password).pipe(
        map(response => new fromActions.ChangePasswordSuccess(response)),
        catchError(error => of(new fromActions.ChangePasswordFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  changePasswordSuccess$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.ChangePasswordSuccess),
    map((action: fromActions.ChangePasswordSuccess) => action.payload),
    tap((response) => {
      const config = {
        width: '450px',
        data: {
          title: 'Atención',
          message: 'Tu contraseña ha sido actualizada con éxito. Ahora puedes Inicia sesión.',
        },
        onClose: () => {
          this._storeCore.dispatch(new fromActionsCore.Go({
            path: ['login']
          }));
        }
      }

      this._utils.showDialog(config);
    })
  );

  @Effect({ dispatch: false })
  changePasswordFailure$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.ChangePasswordFailure),
    map((action: fromActions.ChangePasswordFailure) => action.payload),
    tap((message) => {
      const config = {
        width: '450px',
        data: {
          title: 'Atención',
          type: 'alert',
          message: message,
        },
        onClose: () => { }
      }

      this._utils.showDialog(config);
    })
  );

  constructor(
    private actions$: Actions,
    private _service: fromServices.RecoveryPasswordService,
    private _utils: fromServicesShared.UtilsService,
    private _storeCore: Store<fromStoreCore.CoreState>,
  ) {}
}
