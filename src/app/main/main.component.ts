import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import {TrackingService} from '../services/tracking.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  private isVisible: boolean;

  constructor(private dataStore: DataStoreService, private tracking: TrackingService) {

  }

  ngOnInit() {}

  async onChange() {
    this.isVisible = !this.isVisible;
    if(this.isVisible){
      this.tracking.activateServerTracking();
    }
    else{
      this.tracking.deActivateServerTracking();
    }
  }
}
