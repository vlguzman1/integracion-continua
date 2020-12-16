import { Component, Input, Output, EventEmitter, ViewChild, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromModels from '@app/models';
import * as fromServicesShared from '@shared/services';
import * as fromStoreLogin from '@login/store';
import * as fromStoreCore from '@core/store';

@Component({
  selector: 'project-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [fromServicesShared.UtilsService]
})
export class HeaderComponent implements OnInit {
  constructor (
    private _storeCore: Store<fromStoreCore.CoreState>,
  ) { }

  ngOnInit() { }

  goTo(path) {
    this._storeCore.dispatch(new fromStoreCore.Go({
      path: [path]
    }));
  }

  showRequestNotification() { }

  logout() { }
}
