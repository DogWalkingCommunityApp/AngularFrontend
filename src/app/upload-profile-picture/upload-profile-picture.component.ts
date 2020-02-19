import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-profile-picture',
  templateUrl: './upload-profile-picture.component.html',
  styleUrls: ['./upload-profile-picture.component.scss'],
})
export class UploadProfilePictureComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UploadProfilePictureComponent>) { }

  ngOnInit() {}

    save() {
      alert('Neues Profilbild speichern ...');
      // save selected color to database
      this.closeModal();
    }

  closeModal() {
    this.dialogRef.close();
  }

  chooseFile() {

  }
}
