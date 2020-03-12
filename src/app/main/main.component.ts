import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import {Socket} from "ngx-socket-io";
import {AlertController} from '@ionic/angular';
import {TrackingService} from '../services/tracking.service';
import config from '../services/environment.json';
import {RegisterResponse} from '../registration/registration.interfaces';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public response: (null | RegisterResponse);

  public messages: string[] = [];
  public message: string;
  public ping: string;
  public username: string = "admin0";
  public pingMessages: string[] = [ "Hi", "Wie gehts?", "Möchte Gassi gehen" ];
  private isVisible: boolean;

  constructor(private dataStore: DataStoreService, private socket: Socket, private tracking: TrackingService) {
    this.socket.on('getMessage', async (data) => {
      if (data.contains === this.ping) {
          this.messages.push(data);
          this.ping = "";
      }
    });
    this.isVisible = false;
  }

  ngOnInit() {}

  async sendMessage() {
    if(this.ping != ""){
      this.socket.emit("sendMessage", this.ping + ";" + this.username);
    }

    //if(this.message != "") {
      //this.socket.emit("sendMessage", this.message + ";" + this.username);
      //this.messages.push(this.message);
    //}
  }

  async onChange() {
    this.isVisible = !this.isVisible;
    if(this.isVisible){
      this.tracking.activateServerTracking();
    }
    else{
      this.tracking.deActivateServerTracking();
    }
  }

  async onLogout() {
    const authId = this.dataStore.authToken.id;
    try {
      const response = await fetch(config.serverBaseUrl + 'logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authId })
      })
      console.log(authId);
      const responseData: RegisterResponse = await response.json();

      this.handleResponse(responseData);
    } catch(e) {
      this.handleResponse({ success: false, message: 'The server did not respond' })
    }
  }

  handleResponse(response: RegisterResponse) {
    this.response = response;
    console.log((response));
    if (response.success) {
      this.dataStore.logout();

    }
  }






}
