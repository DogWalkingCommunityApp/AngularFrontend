import { Component, OnInit } from '@angular/core';
import { StrangersDogIndexCardComponent } from '../strangers-dog-index-card/strangers-dog-index-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-strangers-profile',
  templateUrl: './strangers-profile.component.html',
  styleUrls: ['./strangers-profile.component.scss'],
})
export class StrangersProfileComponent implements OnInit {
  public data: any = {}

  constructor(private route: ActivatedRoute, private router: Router, private dataStore: DataStoreService) { }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let data = await this.dataStore.dataForUser(Number(id));

    this.data = data;
  }

}
