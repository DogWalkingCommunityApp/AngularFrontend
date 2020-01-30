import { Component, OnInit } from '@angular/core';
import jssha from 'jssha';
import config from '../environment.json';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  private login: string;
  private password: string;

  constructor() { }


    async onLogin() {
      const {login} = this;

      const jsShaObj =  new jssha('SHA-256', 'TEXT');
      jsShaObj.update(this.password);
      const password = jsShaObj.getHash('HEX');

      const loginData = {
        login,
        password
      };

      const response = await fetch(config.serverBaseUrl + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const responseData = await response.json();

      console.log(responseData);
    }
}
