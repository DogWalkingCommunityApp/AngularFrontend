import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploadService} from '../file-upload.service';

@Component({
  selector: 'app-upload-profile-picture',
  templateUrl: './upload-profile-picture.component.html',
  styleUrls: ['./upload-profile-picture.component.scss'],
})
export class UploadProfilePictureComponent implements OnInit {

  fileToUpload: File = null;

  constructor(public dialogRef: MatDialogRef<UploadProfilePictureComponent>, public fileUploadService: FileUploadService) { }

  ngOnInit() {}

    save() {
      this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
        // do something, if upload success
        alert('Upload success');
      }, error => {
        console.log(error);
      });
      this.closeModal();
    }

  closeModal() {
    this.dialogRef.close();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
