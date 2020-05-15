import { Component, OnInit } from '@angular/core';
import { DogIndexCardComponent } from '../dog-index-card/dog-index-card.component';
@Component({
  selector: 'app-strangers-profile',
  templateUrl: './strangers-profile.component.html',
  styleUrls: ['./strangers-profile.component.scss'],
})
export class StrangersProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // DogIndexCardComponent.ownProfileView = true;
  }

}
