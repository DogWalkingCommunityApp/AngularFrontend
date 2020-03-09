import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {}

}
