import { Component } from '@angular/core';
import { DataStoreService } from 'src/app/services/data-store.service';
import { IUserData } from 'src/app/services/data';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent {
  public _friendsData: IUserData[] = [];
  public userNameSearch: string = '';
  public dogNameSearch: string = '';

  constructor(private dataStoreService: DataStoreService) { 
    dataStoreService.friendsData.subscribe((friendsData) => {
      if (friendsData) {
        this._friendsData = friendsData;
      }
    })

    dataStoreService.updateFriendsData();
  }

  get friendsData(): IUserData[] {
    let friendsData = this._friendsData;

    if (this.userNameSearch) {
      friendsData = friendsData.filter((friend) => {
        const fullName = `${friend.vorname} ${friend.name}`;

        return (fullName.toLowerCase().indexOf(this.userNameSearch.toLowerCase()) !== -1);
      })
    }

    if (this.dogNameSearch) {
      // TODO: Implement Dogsearch when dogs exist
    }

    const tempSortVisible = [], tempSortNonVisible = [];

    friendsData.map( friend => friend.visible ? tempSortVisible.push(friend) : tempSortNonVisible.push(friend));
    friendsData = tempSortVisible.concat(tempSortNonVisible);

    return friendsData;
  }
}
