import { Component } from '@angular/core';
import {Router} from '@angular/router';
import jssha from 'jssha';
import config from '../services/environment.json';
import {EditResponse} from './edit-profil.interfaces';

@Component({
  selector: 'app-edit-profil',
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
  private response: (null | EditResponse);

  constructor(private router: Router) { }

   async onEdit() {
     const {name, vorname, email} = this;

     const jsShaObj = new jssha('SHA-256', 'TEXT');
     jsShaObj.update(this.password);
     const password = jsShaObj.getHash('HEX');

     const profile = {
       name,
       vorname,
       email,
       password
     };

     try {
       const response = await fetch(config.serverBaseUrl + 'editProfil', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
           // 'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: JSON.stringify(profile)
       });

       const responseData: EditResponse = await response.json();

       this.handleResponse(responseData);
     } catch (e) {
       this.handleResponse({success: false, message: 'The server did not respond'});
     }
   }

  async onCancel() {

  }

  handleResponse(response: EditResponse) {
    this.response = response;

    if (response.success) {
      this.router.navigate(['/main']);
    }
  }


}
