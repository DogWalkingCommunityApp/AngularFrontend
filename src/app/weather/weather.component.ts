import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {TrackingService} from "../services/tracking.service";
import {MapCoordinates} from "../map/map.interfaces";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public weatherData: any;
  private count: number = 100;

  constructor(private weatherService: WeatherService,
              private trackingService: TrackingService) {
    this.trackingService.startTracking((coords: MapCoordinates)=> {
      if(this.count >= 100) {
        this.count = 0;
        this.sendToAPIXU(coords.lat + ", " + coords.lng);
      }
      this.count++;
    }, "weather");
  }

  ngOnInit() {}

  sendToAPIXU(location){
    this.weatherService
        .getWeather(location)
        .subscribe(data => {
          this.weatherData = data;
          console.log(this.weatherData);
        });
  }
}
