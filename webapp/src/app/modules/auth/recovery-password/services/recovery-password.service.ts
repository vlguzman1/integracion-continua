import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '@environments/environment';
import * as fromServicesShared from '@shared/services';

@Injectable()
export class RecoveryPasswordService {
  private _url: String;

  constructor(
    private _http: HttpClient,
    private _utils: fromServicesShared.UtilsService
  ) {
    this._url = environment.apiUrl;
  }

  recoveryPassword(email) {
    return this._http.get(`${this._url}user/recovery-password/${email}`)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  
  changePassword(data) {
    return this._http.patch(`${this._url}user/update-password`, data)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }
}
