import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import {Socket} from "ngx-socket-io";

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

  constructor(private dataStore: DataStoreService, private socket: Socket) {
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
}
