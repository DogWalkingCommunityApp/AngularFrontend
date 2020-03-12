import { Injectable } from '@angular/core';
import config from './environment.json';
import { RegisterResponse } from './../registration/registration.interfaces.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  // TODO: Add Types for these
  // tslint:disable-next-line:variable-name
  private _authToken: any = {};
  // tslint:disable-next-line:variable-name
  private _userData: any = {};
  private _dogData: any = {};

  constructor(private router: Router) {
    const savedAuthToken = localStorage.getItem('authToken');

    if (savedAuthToken) {

      this._authToken = JSON.parse(savedAuthToken);
      this.initialLogin();
    } else {
      this.routeToLogin();
    }
   }

  set userDogData(dogData: any) {
    this._dogData = dogData;
  }

  get userDogData() {
    return this._dogData;
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

  async initialLogin() {
    if (this.authToken) {
      try {
        const userData = {
          authId: this.authToken.id,
          login: null,
          password: null
        };

        const response = await fetch(config.serverBaseUrl + 'login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        const responseData: RegisterResponse = await response.json();

        if (responseData.success) {
          this.handleResponse(responseData);
        } else {
          this.routeToLogin();
        }
      } catch (e) {
        this.routeToLogin();
        console.log(e);
      }
    }
  }

  handleResponse(response: RegisterResponse) {
    if (response.success) {
      this.authToken = response.data.authToken;
      this.userData = response.data.userData;
      console.log(this.userData);
      if (this.router.routerState.snapshot.url === '/login') {
        this.router.navigate(['/main']);
      }
    } else {
      if (this.router.routerState.snapshot.url !== '/login') {
        this.router.navigate(['/login']);
      }
    }
  }

  routeToLogin() {
    if (this.router.routerState.snapshot.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authToken = null;
    this.userData = null;
    localStorage.removeItem('authToken');
    this.routeToLogin();
  }
}