import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from '../services/data-store.service';
import {push_notification} from '../push-notification/push-notification';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-strangers-profile',
  templateUrl: './strangers-profile.component.html',
  styleUrls: ['./strangers-profile.component.scss'],
})
export class StrangersProfileComponent implements OnInit {
  public data: any = {};
  public ping = 'HI!';
  public pingMessages: string[] = [ 'Hi', 'Wie gehts?', 'Möchte Gassi gehen' ];
  public toUserId: number;
  public fromUserId: number;
  public fromUserName: string;
  public pushNotification: push_notification;

  constructor(private route: ActivatedRoute, private router: Router, private dataStore: DataStoreService, private socket: Socket) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const data = await this.dataStore.dataForUser(Number(id));

    this.data = data;
  }

  chat() {
    this.fromUserId = this.dataStore.userData.id;
    this.fromUserName = this.dataStore.userData.username;
    this.toUserId = 3;
    if (this.ping !== undefined && this.fromUserId !== undefined) {
      this.pushNotification = new push_notification(this.ping, this.toUserId, this.fromUserId, this.fromUserName);
      this.socket.emit('sendMessage', this.pushNotification);
      this.ping = undefined;
    }
  }

}
