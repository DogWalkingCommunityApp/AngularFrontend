import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UploadProfilePictureComponent } from '../upload-profile-picture/upload-profile-picture.component';
import { DogIndexCardComponent } from '../dog-index-card/dog-index-card.component';
import {push_notification} from '../push-notification/push-notification';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    public ping = 'HI!';
    public pingMessages: string[] = [ 'Hi', 'Wie gehts?', 'Möchte Gassi gehen' ];
    public toUserId: number;
    public fromUserId: number;
    public fromUserName: string;
    public pushNotification: push_notification;

  constructor(private dataStore: DataStoreService, public matDialog: MatDialog,  private socket: Socket) {
  }

  ngOnInit() {
  }

   openModal(target: string) {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = false;
      dialogConfig.id = 'modal-component'; // css in global.scss
      dialogConfig.height = '350px';
      dialogConfig.width = '600px';
       // https://material.angular.io/components/dialog/overview
      if (target === 'palette') {
           const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
          // tslint:disable-next-line:align
      } else if (target === 'upload') {
           const modalDialog = this.matDialog.open(UploadProfilePictureComponent, dialogConfig);
      }
   }

    logout() {
        // logout user
    }

    chat() {
        this.fromUserId = this.dataStore.userData.id;
        this.fromUserName = this.dataStore.userData.username;
        this.toUserId = 3;
        if (this.ping != undefined && this.fromUserId != undefined) {
            this.pushNotification = new push_notification(this.ping, this.toUserId, this.fromUserId, this.fromUserName);
            this.socket.emit('sendMessage', this.pushNotification);
            this.ping = undefined;
        }
    }
}
