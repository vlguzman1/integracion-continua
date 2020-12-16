import { Component, Injectable, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DialogPosition } from '@angular/material';

import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { DialogComponent } from '../components/molecules/dialog/dialog.component';

@Injectable()
export class UtilsService {
  private _url: string;

  constructor(
    private _http: HttpClient,
    private dialog: MatDialog,
  ) {
    this._url = environment.apiUrl;
  }

  handleErrorHttp(response: HttpErrorResponse) {
    if (response.error instanceof ErrorEvent || response.error !== null) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', response.error.message);
      return throwError(response.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${response.status}, ` +
        `body was: ${response.error}`);
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    }
  }

  showDialog(settings): void {
    const dialogRef = this.dialog.open(DialogComponent, settings);
    if (typeof settings.onClose !== 'undefined') {
      dialogRef.afterClosed().subscribe(result => {
        settings.onClose(result);
      });
    }
  }

  getItemLocalStorage(key: string) {
    const storageVal = localStorage.getItem(key);
    try {
      return JSON.parse(storageVal);
    } catch (error) {
      return storageVal;
    }
  }

  getCountries() {
    return this._http.get(`${this._url}countries`)
      .pipe(
        catchError(this.handleErrorHttp)
      );
  }

  getStatesOfCountry(country) {
    return this._http.get(`${this._url}states-by/${country}`)
      .pipe(
        catchError(this.handleErrorHttp)
      );
  }
}
