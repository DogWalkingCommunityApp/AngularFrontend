import { Component, OnInit } from '@angular/core';
import {PushNotificationService} from "../services/push-notification.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
})
export class PushNotificationComponent implements OnInit {

  public notification: string;

  constructor(private push_notification: PushNotificationService, private socket: Socket) {
    this.socket.on('getMessage', async (data) => {
      document.getElementById("not").textContent = data;
      console.log(this.notification);
      setTimeout(function () {
        document.getElementById("not").textContent = "";
      }, 5000);
    });
  }

  ngOnInit() {}



}
