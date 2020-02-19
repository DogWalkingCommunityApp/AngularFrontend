import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-dog-form',
  templateUrl: './add-dog-form.component.html',
  styleUrls: ['./add-dog-form.component.scss'],
})
export class AddDogFormComponent implements OnInit {
    sexes: any[];
 races: any[];
  selectedGender: string;
  constructor() { }

  ngOnInit() {
    this.sexes = ['männlich', 'weiblich' ];
    this.races = ['Terrier', 'Schäferhund', 'Collie', 'Border-Collie' ];
  }
  onChange(deviceValue) {
    console.log(deviceValue);
  }
}
