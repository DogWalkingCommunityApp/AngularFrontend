import { Component } from '@angular/core';
import jssha from 'jssha';
import config from '../services/environment.json';
import { RegisterResponse } from '../registration/registration.interfaces.js';
import { Router } from '@angular/router';
import { DataStoreService } from '../services/data-store.service.js';
import {Socket} from "ngx-socket-io";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public login: string;
  public password: string;

  public response: ( null | RegisterResponse );

  constructor(private router: Router, private dataStore: DataStoreService, private socket: Socket) { }


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
      this.socket.emit("chatLogin", this.login);

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
