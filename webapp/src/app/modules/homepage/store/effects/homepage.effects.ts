import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable,  of } from 'rxjs';
import { tap, map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';

import * as fromActionsShared from '@shared/store';
import * as fromServicesShared from '@shared/services';

import * as fromServices from '../../services';
import * as fromActions from '../actions/homepage.actions';

@Injectable()
export class HomepageEffects {
  constructor() {}
}
