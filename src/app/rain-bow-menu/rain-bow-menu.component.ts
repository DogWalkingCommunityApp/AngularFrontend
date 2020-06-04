import { Component, OnInit } from '@angular/core';
import { DOG_LIST, FRIEND_LIST, ROUTES_LIST, BLOCKED_LIST } from '../list/icon.constants';

@Component({
  selector: 'app-rain-bow-menu',
  templateUrl: './rain-bow-menu.component.html',
  styleUrls: ['./rain-bow-menu.component.scss'],
})
export class RainBowMenuComponent implements OnInit {
  public constants: { [key: string]: string } = {
    DOG_LIST, FRIEND_LIST, ROUTES_LIST, BLOCKED_LIST
  };

  constructor() { }

  ngOnInit() {}

}
