import { Component } from '@angular/core';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent {
  public friendsData: any[] = [];

  constructor(private dataStoreService: DataStoreService) { 
    dataStoreService.friendsData.subscribe((friendsData) => {
      if (friendsData) {
        this.friendsData = friendsData;
      }
    })

    dataStoreService.updateFriendsData();
  }
}
