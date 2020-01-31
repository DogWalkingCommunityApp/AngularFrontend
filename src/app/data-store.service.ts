import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  // TODO: Add Types for these
  private _authToken: any = {};
  private _userData: any = {};

  constructor() {
    const savedAuthToken = localStorage.getItem('authToken');

    if (savedAuthToken) {

      this._authToken = JSON.parse(savedAuthToken);
    }
   }

  get userData() {
    return this._userData;
  }

  set userData(userData: any) {
    this._userData = userData;
  }

  get authToken() {
    return this._authToken;
  }

  set authToken(authToken: any) {
    this._authToken = authToken;
    localStorage.setItem('authToken', JSON.stringify(authToken));
  }
}
