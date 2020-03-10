import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import {Socket} from "ngx-socket-io";
import {TrackingService} from '../services/tracking.service';
import {push_notification} from "../push-notification/push-notification";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public messages: string[] = [];
  public message: string;
  public ping: string = "HI!";
  public toUserId: number = 3; //TODO: An wen soll die Nachricht gehen???
  public fromUserId: number;
  public fromUserName: string;
  public pingMessages: string[] = [ "Hi", "Wie gehts?", "Möchte Gassi gehen" ];
  public pushNotification: push_notification;
  private isVisible: boolean;

  constructor(private dataStore: DataStoreService, private socket: Socket, private tracking: TrackingService) {

  }

  ngOnInit() {}

  async sendMessage() {
    this.fromUserId = this.dataStore.userData.id;
    this.fromUserName = this.dataStore.userData.username;
    if(this.ping != "" && this.fromUserId != undefined){
      this.pushNotification = new push_notification(this.ping, this.toUserId, this.fromUserId, this.fromUserName);
      this.socket.emit("sendMessage", this.pushNotification);
    }
    this.ping = "HIIIIIII";

    //if(this.message != "") {
      //this.socket.emit("sendMessage", this.pushNotification);
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
