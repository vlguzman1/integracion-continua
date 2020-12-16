import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '@shared/index';

import { CoreRouting } from './core.routing';
import * as fromComponents from './components';
import * as fromGuards from './guards';
import * as fromServices from './services';
import * as fromStore from './store';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreRouting,
    fromStore.CoreStoreModule,
    SharedModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  exports: [...fromComponents.components],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: fromServices.LoggingHttpInterceptor, multi: true },
    fromServices.CoreService,
    fromGuards.guards,
  ],
})
export class CoreModule { }
