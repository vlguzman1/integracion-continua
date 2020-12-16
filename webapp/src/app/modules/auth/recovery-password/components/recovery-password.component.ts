import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromReducer from '../store/reducers/recovery-password.reducer';
import * as fromActions from '../store/actions/recovery-password.actions';
import * as fromServices from '../services';
import * as fromStoreCore from '@core/store';

@Component({
  selector: 'project-recovery-password',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
  providers: [fromServices.RecoveryPasswordService]
})
export class RecoveryPasswordComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public recoveryPasswordFormGroup: FormGroup;
  public user: any;

  constructor(
    private _store: Store<fromStore.RecoveryPasswordState>,
    private _formBuilder: FormBuilder,
  ) {
    this.isLoading$ = this._store.pipe(select(fromReducer.getLoading));

    this.recoveryPasswordFormGroup = this._formBuilder.group({
      email: ['', ''],
      password: ['', ''],
      confirmPassword: ['', ''],
    });
  }

  ngOnInit() { }

  getField(field) {
    return this.recoveryPasswordFormGroup.get(field);
  }

  goTo(path) {
    this._store.dispatch(new fromStoreCore.Go({
      path: [path]
    }));
  }

  onRecoveryPassword() {
    if (this.recoveryPasswordFormGroup.dirty && this.recoveryPasswordFormGroup.valid) {
      if (!this.user) {
        this._store.dispatch(new fromActions.RecoveryPassword(this.recoveryPasswordFormGroup.value.email));
      } else {
        this._store.dispatch(new fromActions.ChangePassword({
          id: this.user,
          password: this.recoveryPasswordFormGroup.value.password
        }));
      }
    }
  }
}
