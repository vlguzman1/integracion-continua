import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromReducer from '../store/reducers/login.reducer';
import * as fromActions from '../store/actions/login.actions';
import * as fromServices from '../services';
import * as fromStoreCore from '@core/store';

@Component({
  selector: 'project-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [fromServices.LoginService]
})
export class LoginComponent implements OnInit {
  public isLoading$: Observable<boolean>; 
  public loginFormGroup: FormGroup;

  constructor(
    private _store: Store<fromStore.LoginState>,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading$ = this._store.pipe(select(fromReducer.getLoading));

    this.loginFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { }


  getField(field) {
    return this.loginFormGroup.get(field);
  }

  goTo(path) {
    this._store.dispatch(new fromStoreCore.Go({
      path: [path]
    }));
  }

  onLogin() {
    if (this.loginFormGroup.dirty && this.loginFormGroup.valid) {
      this._store.dispatch(new fromActions.Login(this.loginFormGroup.value));
    }
  }
}
