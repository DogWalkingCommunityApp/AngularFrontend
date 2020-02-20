import { Component, AfterViewInit } from '@angular/core';
import { MapCoordinates } from './map.interfaces';
import { TrackingService } from '../services/tracking.service';
import { serverBaseUrl } from '../environment.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private HereMap: any;
  private platform: any;
  private userMarker;
  private usersMarkers;
  private map;
  private dataSubscription;

  constructor(private TrackingService: TrackingService) { 
    this.HereMap = (window as any).H

    this.platform = new this.HereMap.service.Platform({
      'apikey': 'GNibHURLINdyh-P9iBwlK50E3_swhICr_t7zW9pLQ9Y'
    });

    this.setToVisible();

    setTimeout(this.setToInvisible.bind(this), 20000)
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

        this.map = map;
        this.userMarker = this.addMarker(map, coords, 'assets/icon/direction-marker.svg', 'map-marker-user');

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

  addUserMarker(map: any, coords: MapCoordinates, imagePath: string, className: string) {
    const outerElement = document.createElement('div'),
        innerElement = document.createElement('div'),
        imageElement = document.createElement('img');

    innerElement.classList.add(className);
    imageElement.src = serverBaseUrl + imagePath;

    outerElement.appendChild(innerElement);
    innerElement.appendChild(imageElement);
    
    const changeOpacity = (evt) => {
      evt.target.style.opacity = 0.6;
    };
    
    const changeOpacityToOne = (evt) => {
      evt.target.style.opacity = 1;
    };
  
    // TODO: Here we need the functionality to open the corresponding user profile
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

  setToVisible() {
    this.dataSubscription = this.TrackingService.filteredTrackingData.subscribe((trackingData) => {
      if (!this.map || !trackingData) {
        return;
      }

      let { filteredData, removedUsers = [], newUsers = [] } = trackingData;

      if (!this.usersMarkers) {
        removedUsers = [];
        (newUsers as any) = Object.keys(filteredData);
        this.usersMarkers = {};
      }

      const removedUserMarkers = [];
      removedUsers.forEach( userKey => {
        if (this.usersMarkers[userKey]) {
          removedUserMarkers.push(this.usersMarkers[userKey]);
          delete this.usersMarkers[userKey];
        }
      })

      this.map.removeObjects(removedUserMarkers);

      Object.keys(filteredData).forEach( dataKey => {
        if(this.usersMarkers[dataKey]) {
          const data = filteredData[dataKey];
          const marker = this.usersMarkers[dataKey]
          const coords: MapCoordinates = { lat: data.lat, lng: data.lng };

          marker.setGeometry(coords);
        }
      })

      newUsers.forEach( userKey => {
        const data = filteredData[userKey];
        const coords: MapCoordinates = { lat: data.lat, lng: data.lng };
        const imagePath = data.userData.profileImg[0] === '/' ? data.userData.profileImg.substring(1, data.userData.profileImg.length) : data.userData.profileImg;

        this.usersMarkers[userKey] = this.addUserMarker(this.map, coords, imagePath, 'userIcon');
      })
    }) 

    this.TrackingService.activateServerTracking();
  }

  setToInvisible() {
    console.log('INVISIBLE')
    this.dataSubscription.unsubscribe();

    this.TrackingService.deActivateServerTracking();

    const markersArray = Object.keys(this.usersMarkers).map( markerKey => {
      return this.usersMarkers[markerKey];
    })

    this.map.removeObjects(markersArray);
    this.usersMarkers = undefined;
  }
}
