import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-card',
  templateUrl: './route-card.component.html',
  styleUrls: ['./route-card.component.scss'],
})
export class RouteCardComponent implements OnInit {

  private name: string;
  private description: string;
  private descriptionVisible: boolean;

  constructor() { }

  ngOnInit() {
    this.name = 'Naturidylle';
    this.description = 'Eine idyllische Route im Herzen der Natur';
  }


  toggleDescription() {
    this.descriptionVisible = !this.descriptionVisible;
  }
}
