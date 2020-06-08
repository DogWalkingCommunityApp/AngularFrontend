import { Component } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import { DOG_LIST, FRIEND_LIST, ROUTES_LIST, BLOCKED_LIST } from './icon.constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  public constants: { [key: string]: string } = {
    DOG_LIST, FRIEND_LIST, ROUTES_LIST, BLOCKED_LIST
  };
  public selectedList: string = FRIEND_LIST;

  constructor(private dataStoreService: DataStoreService, private route: ActivatedRoute) {
    route.paramMap.subscribe(paramMap => {
      this.selectedList = paramMap.get('list');
    });
   }

  selectList(list: string) {
    this.selectedList = list;
  }
}
