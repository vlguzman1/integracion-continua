import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '@environments/environment';

import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { localStorageSync } from 'ngrx-store-localstorage';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromStoreShared from '@shared/store';
import * as fromStoreLogin from '@login/store';
import * as fromStoreRecoveryPassword from '@recovery-password/store';
import * as fromStoreRegister from '@register/store';

import { CoreState, CoreReducers } from './store';
import { CustomRouterStateSerializer } from './reducers/router.reducer';
import { RouterEffects } from './effects/router.effects';

export const StoreEffects = [
  RouterEffects,
];

import { keys } from 'ramda';

export function logger(reducer: ActionReducer<CoreState>): ActionReducer<CoreState> {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: keys(CoreReducers).concat([
    'login', 'recovery-password', 'register'
  ]), rehydrate: true, storage: sessionStorage})(reducer);
}

export function clearState(reducer) {
  return function (state, action) {
    if (action.type === fromStoreLogin.ActionTypes.Logout) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

const metaReducers: MetaReducer<CoreState>[] =
  !environment.production
  ? [logger, storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];

metaReducers.push(clearState);

@NgModule({
  imports: [
    CommonModule,
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(CoreReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'Eventzum',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(StoreEffects),
    fromStoreShared.SharedStoreModule,
    fromStoreLogin.LoginStoreModule,
    fromStoreRecoveryPassword.RecoveryPasswordStoreModule,
    fromStoreRegister.RegisterStoreModule,
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
})
export class CoreStoreModule { }
