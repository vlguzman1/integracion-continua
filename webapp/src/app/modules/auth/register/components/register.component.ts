import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store';
import * as fromReducer from '../store/reducers/register.reducer';
import * as fromActions from '../store/actions/register.actions';
import * as fromServices from '../services';
import * as fromStoreCore from '@core/store';
import * as fromServicesShared from '@shared/services';
import { environment } from '@environments/environment';

@Component({
  selector: 'project-register',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [fromServices.RegisterService]
})
export class RegisterComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public registerFormGroup: FormGroup;

  constructor(
    private _store: Store<fromStore.RegisterState>,
    private _formBuilder: FormBuilder,
    private _utils: fromServicesShared.UtilsService,
  ) {
    this.isLoading$ = this._store.pipe(select(fromReducer.getLoading));

    this.registerFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms_conditions: [false, Validators.required],
    });
  }

  ngOnInit() { }

  onRegister() {
    if (this.registerFormGroup.valid) {
      this._store.dispatch(new fromActions.Registering(this.registerFormGroup.value));
    }
  }

  getField(field) {
    return this.registerFormGroup.get(field);
  }

  goTo(path) {
    this._store.dispatch(new fromStoreCore.Go({
      path: [path]
    }));
  }

  showModalTerms() {
    const config = {
      width: '450px',
      data: {
        title: 'Terminos y Condiciones',
        message: 'Terminos y Condiciones'
      },
      onClose: () => {
          
      }
    }

    this._utils.showDialog(config);
  }
}
