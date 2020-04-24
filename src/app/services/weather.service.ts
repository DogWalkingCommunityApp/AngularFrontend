import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(location) {
    return this.http.get(
        'http://api.weatherstack.com/current\n' +
        '?access_key=6d9a31f3a79232ce9de0470dcc9f74a2\n' +
        '&query=' + location);
  }
}
