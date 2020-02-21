import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import {Socket} from "ngx-socket-io";
import {AlertController} from '@ionic/angular';
import {TrackingService} from '../services/tracking.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

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
}
