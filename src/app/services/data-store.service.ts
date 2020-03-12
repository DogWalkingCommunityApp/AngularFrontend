import { Injectable } from '@angular/core';
import config from './environment.json';
import { RegisterResponse } from './../registration/registration.interfaces.js';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUserData } from './data.js';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  // TODO: Add Types for these
  private _authToken: any = {};
  private _userData: any = {};
  private updateTimeout: any;
  public friendsData: BehaviorSubject<IUserData[]> = new BehaviorSubject(null);

  constructor(private router: Router) {
    const savedAuthToken = localStorage.getItem('authToken');

    if (savedAuthToken) {

      this._authToken = JSON.parse(savedAuthToken);
      this.initialLogin();
    } else {
      this.routeToLogin();
    }
   }

  get userData() {
    return this._userData;
  }

  set userData(userData: IUserData) {
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
          this.handleResponse(responseData)
        } else {
          this.routeToLogin();
        };
      } catch (e) {
        this.routeToLogin();
        console.log(e)
      }
    }
  }

  handleResponse(response: RegisterResponse) {
    if (response.success) {
      this.authToken = response.data.authToken;
      this.userData = response.data.userData;
      this.userData.friends = [1, 2, 3, 4]; // TODO: DUMMY DATA! REMOVE!
      if (this.router.routerState.snapshot.url === '/login') {
        this.router.navigate(['/main']);
      } else if (this.router.routerState.snapshot.url === '/list') {
        this.updateFriendsData();
      }
    } else {
      this.routeToLogin();
    }
  }

  routeToLogin() {
    if (this.router.routerState.snapshot.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }

  async updateFriendsData() {
    clearTimeout(this.updateTimeout);
    try {
      const response = await fetch(config.serverBaseUrl + 'getFriends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friends: this.userData.friends })
      });

      const responseData: RegisterResponse = await response.json();
      console.log('DATA', responseData, this.userData.friends)
      if (responseData.success) {
        this.friendsData.next(responseData.data);
      } else {
        this.updateTimeout = setTimeout(this.updateFriendsData, 2000);
      };
    } catch (e) {
      this.updateTimeout = setTimeout(this.updateFriendsData, 2000);
      console.log(e)
    }
  }
}
