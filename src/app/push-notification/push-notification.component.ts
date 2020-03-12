import { Component, OnInit } from '@angular/core';
import {PushNotificationService} from "../services/push-notification.service";
import {Socket} from "ngx-socket-io";
import {push_notification} from "./push-notification";
import {DataStoreService} from "../services/data-store.service";

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
})
export class PushNotificationComponent implements OnInit {

  public notification: string;
  public ping: string;
  public pingMessages: string[] = [ "Hi", "Wie gehts?", "Möchte Gassi gehen" ];
  public pushNotification: push_notification;

  constructor(private push_notification: PushNotificationService, private socket: Socket, private dataStore: DataStoreService) {
    this.socket.on('getMessage', async (data) => {
      document.getElementById("not").style.animation = "slidedown 0.2s";
      setTimeout(function () {
        document.getElementById("not").textContent = data;
      }, 100);
      setTimeout(function () {
        document.getElementById("not").textContent = "";
        document.getElementById("not").style.animation = "";
      }, 5000);
    });
  }

  ngOnInit() {}

  OnPushClick(){
    document.getElementById("ans").style.animation = "slidedown 0.05s";
    document.getElementById("ans").hidden = false;
    setTimeout(function () {
    document.getElementById("ans").style.animation = "";
    }, 500);
  }

  OnAnsClick(){
    if(this.ping != undefined) {
      this.pushNotification = new push_notification(this.ping, 3, this.dataStore.userData.id, this.dataStore.userData.username);
      this.socket.emit("sendMessage", this.pushNotification);
      this.ping = "";
    }
    setTimeout(function () {
      document.getElementById("ans").hidden = true;
    }, 10000);
  }


}
