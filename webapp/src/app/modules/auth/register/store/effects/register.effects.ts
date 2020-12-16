import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable,  of } from 'rxjs';
import { tap, map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';

import * as fromServicesShared from '@shared/services';
import * as fromStoreCore from '@core/store/store';
import * as fromActionsCore from '@app/core/store/actions/router.actions';
import * as fromServices from '@register/services';
import * as fromActions from '../actions/register.actions';

declare var ga;

@Injectable()
export class RegisterEffects {
  @Effect()
  registering$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.Registering),
    map((action: fromActions.Registering) => action.payload),
    exhaustMap((user) =>
      this._service.register(user).pipe(
        map((response: any) => new fromActions.RegisterSuccessfully(response)),
        catchError(error => of(new fromActions.RegisterFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  registerSucessfully$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.RegisterSuccessfully),
    map((action: fromActions.RegisterSuccessfully) => action.payload),
    tap((response) => {
      const config = {
        width: '450px',
        data: {
          title: 'Genial',
          type: 'success',
          message: 'Hemos enviado un correo a tu Email para activar tu cuenta'
        },
        onClose: () => {
          this._storeCore.dispatch(new fromActionsCore.Go({
            path: ['login']
          }));
        }
      }
      this._utils.showDialog(config);
      ga('send', 'event', 'solicitar-credito', 'datos-estudiante');
    })
  );

  @Effect({ dispatch: false })
  registerFailure$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.RegisterFailure),
    map((action: fromActions.RegisterFailure) => action.payload),
    tap((response) => {
      const config = {
        width: '450px',
        data: {
          title: 'Alerta',
          type: 'alert',
          message: response
        }
      }
      this._utils.showDialog(config);
    })
  );

  constructor(
    private actions$: Actions,
    private _service: fromServices.RegisterService,
    private _utils: fromServicesShared.UtilsService,
    private _storeCore: Store<fromStoreCore.CoreState>,
  ) {}
}
