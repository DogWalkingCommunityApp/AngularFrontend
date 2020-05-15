import { Component, Input } from '@angular/core';
import { IUserData } from '../services/data';
import { serverBaseUrl } from '../services/environment.json';

@Component({
  selector: 'app-people-cards',
  templateUrl: './people-cards.component.html',
  styleUrls: ['./people-cards.component.scss'],
})
export class PeopleCardsComponent {
  @Input() profileData: IUserData;

  public serverBaseUrl: string = serverBaseUrl;

  constructor() { 
  }

  deleteFriend() {
    // TODO: Implement function when friends are actually ready
  }

}
