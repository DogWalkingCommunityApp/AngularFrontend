import { Component, OnInit } from '@angular/core';
import config from '../environment.json';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-passwort-vergessen',
  templateUrl: './passwort-vergessen.component.html',
  styleUrls: ['./passwort-vergessen.component.scss'],
})
export class PasswortVergessenComponent {
  private email: string;

  constructor(public alertController: AlertController) { }

  async onSend() {
    if(this.email.length > 5 && this.email.indexOf('@') !== -1 && this.email.indexOf('.') !== -1){
      const alert = await this.alertController.create({
        message: 'Die E-Mail wurde erfolgreich gesendet!',
        buttons: ['OK']
      });
      await alert.present();
    }



    // const response = await fetch(config.serverBaseUrl + 'passwordForgotten', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.email)
    // })
    //
    // const responseData = await response.json();
    //
    // console.log(responseData);
  }

}
