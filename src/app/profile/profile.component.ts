import { Component, OnInit } from '@angular/core';
import {DataStoreService} from '../data-store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(private dataStoreService: DataStoreService) {}

  get UserData() {
      return this.dataStoreService.userData;
  }

  ngOnInit() {}

}
