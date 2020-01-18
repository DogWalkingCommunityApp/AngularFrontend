import { Component, AfterViewInit } from '@angular/core';
import { MapCoordinates } from './map.interfaces';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private HereMap: any;
  private platform: any;
  private userMarker;

  constructor(private TrackingService: TrackingService) { 
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
        const coords: MapCoordinates = { lat: geoLocation.coords.latitude, lng: geoLocation.coords.longitude };

        const map = new this.HereMap.Map(
          document.getElementById('map'),
          defaultLayers.vector.normal.map,
          {
            zoom: 16,
            center: coords,
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
        //const ui = this.HereMap.ui.UI.createDefault(map, defaultLayers);
    
/*
        const icon = new this.HereMap.map.Icon('assets/icon/direction-marker.svg');
        const marker = new this.HereMap.map.Marker({ lat: geoLocation.coords.latitude, lng: geoLocation.coords.longitude }, { icon: icon });
        const group = new this.HereMap.map.Group();
        console.log(icon)

        map.addObject(group);
        group.addObject(marker);*/

        this.userMarker = this.addMarker(map, coords, 'assets/icon/direction-marker.svg', 'map-marker-user');

        // FIXME: For testing
        this.startTracking();
      })
    }
  }

  addMarker(map: any, coords: MapCoordinates, imagePath: string, className: string) {
    const outerElement = document.createElement('div'),
        innerElement = document.createElement('div');

    innerElement.classList.add(className);
    
    outerElement.appendChild(innerElement);
    
    const changeOpacity = (evt) => {
      evt.target.style.opacity = 0.6;
    };
    
    const changeOpacityToOne = (evt) => {
      evt.target.style.opacity = 1;
    };
  
    //create dom icon and add/remove opacity listeners
    var domIcon = new this.HereMap.map.DomIcon(outerElement, {
      // the function is called every time marker enters the viewport
      onAttach: (clonedElement, domIcon, domMarker) => {
        clonedElement.addEventListener('mouseover', changeOpacity);
        clonedElement.addEventListener('mouseout', changeOpacityToOne);
      },
      // the function is called every time marker leaves the viewport
      onDetach: (clonedElement, domIcon, domMarker) => {
        clonedElement.removeEventListener('mouseover', changeOpacity);
        clonedElement.removeEventListener('mouseout', changeOpacityToOne);
      }
    });
    
    
    this.TrackingService.compass.subscribe((heading: number) => {
      const value = `transform: rotate(${Math.round(heading)}deg)`;
      const element = document.querySelector('.map-marker-user');
      element && element.setAttribute('style', value);
    })
  
    var newMarker = new this.HereMap.map.DomMarker(coords, {
      icon: domIcon
    });

    map.addObject(newMarker);

    return newMarker;
  }

  startTracking() {
    // Send a callback and a callee string
    this.TrackingService.startTracking((coords: MapCoordinates)=> {
      this.userMarker.setGeometry(coords);
    }, 'userIcon')
  }
}
