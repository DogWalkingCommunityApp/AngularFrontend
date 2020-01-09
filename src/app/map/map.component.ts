import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private HereMap: any;
  private platform: any;

  constructor() { 
    this.HereMap = (window as any).H

    this.platform = new this.HereMap.service.Platform({
      'apikey': 'GNibHURLINdyh-P9iBwlK50E3_swhICr_t7zW9pLQ9Y'
    });
  }

  ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((geoLocation: Position) => {
        const map = new this.HereMap.Map(
          document.getElementById('map'),
          defaultLayers.vector.normal.map,
          {
            zoom: 16,
            center: { lat: geoLocation.coords.latitude, lng: geoLocation.coords.longitude },
            pixelRatio: window.devicePixelRatio || 1
          }
        );
    
        window.addEventListener('resize', function () {
          map.getViewPort().resize(); 
        });
    
        setTimeout(() => {
          map.getViewPort().resize(); 
        }, 1000);
    
    
        const behavior = new this.HereMap.mapevents.Behavior(new this.HereMap.mapevents.MapEvents(map));
    
        const ui = this.HereMap.ui.UI.createDefault(map, defaultLayers);
      })
    }
  }

}
