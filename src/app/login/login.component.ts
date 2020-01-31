import { Component, OnInit } from '@angular/core';
import jssha from 'jssha';
import config from '../environment.json';
import { RegisterResponse } from '../registration/registration.interfaces.js';
import { Router } from '@angular/router';
import { DataStoreService } from '../data-store.service.js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private login: string;
  private password: string;

  private response: ( null | RegisterResponse );

  constructor(private router: Router, private dataStore: DataStoreService) { }

  ngOnInit() {
    // Auto login if the authToken already exists
    this.initialLogin();
  }

  async initialLogin() {
    if (this.dataStore.authToken) {
      try {
        const userData = { 
          authId: this.dataStore.authToken.id,
          login: null,
          password: null
        }

        const response = await fetch(config.serverBaseUrl + 'login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        const responseData: RegisterResponse = await response.json();
        console.log(responseData)
        if (responseData.success) {
          this.handleResponse(responseData)
        };
      } catch (e) {
        console.log(e)
      }
    }
  }

  async onLogin() {
    const {login} = this;

    const jsShaObj =  new jssha('SHA-256', 'TEXT');
    jsShaObj.update(this.password);
    const password = jsShaObj.getHash('HEX');

    const loginData = {
      login,
      password
    };

    try {
      const response = await fetch(config.serverBaseUrl + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const responseData: RegisterResponse = await response.json();
      this.handleResponse(responseData);
    } catch(e) {
      this.handleResponse({ success: false, message: 'The serer did not respond' })
    }
  }

  handleResponse(response: RegisterResponse) {
    this.response = response;

    if (response.success) {
      this.dataStore.authToken = response.data.authToken;
      this.dataStore.userData = response.data.userData;

      this.router.navigate(['/main']);
    }
  }
}
