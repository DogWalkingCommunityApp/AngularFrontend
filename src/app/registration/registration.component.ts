import { Component } from '@angular/core';
import jssha from 'jssha';
import config from '../environment.json';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent{
  private username:string;
  private name:string;
  private vorname:string;
  private email:string;
  private confirmEmail:string;
  private password:string;
  private confirmPassword:string;
  private birthdate;
  private licenseAgreement;

  constructor() { 
  }

  async onRegistration() {
    const { username, name, vorname, email, birthdate } = this;

    const jsShaObj =  new jssha('SHA-256', 'TEXT');
    jsShaObj.update(this.password);
    const password = jsShaObj.getHash('HEX');

    const profile = {
      username,
      name,
      vorname,
      email,
      password,
      birthdate
    }

    const response = await fetch(config.serverBaseUrl + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(profile)
    })

    const responseData = await response.json();

    console.log(responseData);
  }

}
