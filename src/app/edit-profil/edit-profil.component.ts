import { Component, OnInit } from '@angular/core';
import {RegisterResponse} from '../registration/registration.interfaces';
import jssha from 'jssha';
import { Router } from '@angular/router';
import config from '../environment.json';

@Component({
  selector: 'edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})
export class EditProfilComponent {
  private name: string;
  private vorname: string;
  private email: string;
  private confirmEmail: string;
  private password: string;
  private confirmPassword: string;

  private response: (null | RegisterResponse);

  constructor(private router: Router) { }

  async onEdit() {
    const { name, vorname, email } = this;

    const jsShaObj =  new jssha('SHA-256', 'TEXT');
    jsShaObj.update(this.password);
    const password = jsShaObj.getHash('HEX');

    const editProfile = {
      name,
      vorname,
      email,
      password
    };

    try {
      const response = await fetch(config.serverBaseUrl + 'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(editProfile)
      });

      const responseData: RegisterResponse = await response.json();

      this.handleResponse(responseData);
    } catch (e) {
      this.handleResponse({ success: false, message: 'The serer did not respond' });
    }
  }

  handleResponse(response: RegisterResponse) {
    this.response = response;

    if (response.success) {
      this.router.navigate(['/login']);
    }
  }
}
