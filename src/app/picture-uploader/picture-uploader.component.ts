import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-picture-uploader',
  templateUrl: './picture-uploader.component.html',
  styleUrls: ['./picture-uploader.component.scss'],
})
export class PictureUploaderComponent implements OnInit {
  private image: (string | ArrayBuffer) = 'http://localhost:3000/images/placeholder.svg';


  @Output() imageEmitter = new EventEmitter<string | ArrayBuffer>();

  constructor() { }

  ngOnInit() {}

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    let file: File = inputValue.files[0];
    let myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.imageEmitter.emit(this.image);
    };
    myReader.readAsDataURL(file);
  }

}
