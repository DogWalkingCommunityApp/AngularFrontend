import {Component, NgZone, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import iro from '@jaames/iro';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  private colorPicker: iro.ColorPicker;
  private selectedColor: any;

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private ngZone: NgZone) { }

  ngOnInit() {
    this.colorPicker = new iro.ColorPicker('#color-picker-container', {
      // color picker options
      // Option guide: https://iro.js.org/guide.html#color-picker-options
      width: 200,
      color: '#ffffff',
      borderWidth: 0.5,
      borderColor: '#000000',
    });
    this.colorPicker.on('color:change', (color, changes) =>  this.ngZone.run(() => this.onColorChange(color, changes)));
  }

  closeModal() {
    this.dialogRef.close();
  }

  save() {
    alert('Gewählte Farbe: ' + this.selectedColor);
    // save selected color to database
    this.closeModal();
  }

  onColorChange(color, changes) {
    this.selectedColor = color.hexString;
    console.log(this.selectedColor);
  }
}
