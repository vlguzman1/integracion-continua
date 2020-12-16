import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, retry } from 'rxjs/operators';

import { environment } from '@environments/environment';

import * as fromServicesShared from '@shared/services';

@Injectable()
export class HomepageService {
  private _url: String;

  constructor(
    private _http: HttpClient,
    private _utils: fromServicesShared.UtilsService
  ) {
    this._url = environment.apiUrl;
  }
}
