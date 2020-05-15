import { Component, AfterViewInit } from '@angular/core';
import { MapCoordinates } from './map.interfaces';
import { TrackingService } from '../services/tracking.service';
import { serverBaseUrl } from '../services/environment.json';
import { Options } from 'ng5-slider';

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

  public sliderOptions: Options = {
    floor: 1,
    ceil: 10,
    step: 1,
    vertical: true
  };

  constructor(private trackingService: TrackingService) { 
    this.HereMap = (window as any).H;

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

        this.map = map;
        this.userMarker = this.addMarker(map, coords, 'assets/icon/direction-marker.svg', 'map-marker-user');

        this.startTracking();

        this.trackingService.trackingActive.subscribe(isActive => {
          isActive ? this.setToVisible() : this.setToInvisible();
        })
      }, (err) => console.log(err), { enableHighAccuracy: true })
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

    const openProfile = (evt) => {
      document.open('http://localhost:4200/profile')
    };
  
    //create dom icon and add/remove opacity listeners
    var domIcon = new this.HereMap.map.DomIcon(outerElement, {
      // the function is called every time marker enters the viewport
      onAttach: (clonedElement, domIcon, domMarker) => {
        clonedElement.addEventListener('mouseover', changeOpacity);
        clonedElement.addEventListener('mouseout', changeOpacityToOne);
        clonedElement.addEventListener('click', openProfile);
      },
      // the function is called every time marker leaves the viewport
      onDetach: (clonedElement, domIcon, domMarker) => {
        clonedElement.removeEventListener('mouseover', changeOpacity);
        clonedElement.removeEventListener('mouseout', changeOpacityToOne);
        clonedElement.removeEventListener('click', openProfile);
      }
    });
    
    
    this.trackingService.compass.subscribe((heading: number) => {
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
    this.trackingService.startTracking((coords: MapCoordinates)=> {
      this.userMarker.setGeometry(coords);
    }, 'userIcon')
  }


  // Activate the server tracking and show the users position to other users as well as other user on the map for the user
  setToVisible() {
    this.dataSubscription = this.trackingService.filteredTrackingData.subscribe((trackingData) => {
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
  }

  // Deactivate server sided tracking and do not show any other users on the map anymore
  setToInvisible() {
    if (!(this.usersMarkers || this.dataSubscription)) {
      return;
    }

    this.dataSubscription.unsubscribe();

    const markersArray = Object.keys(this.usersMarkers).map( markerKey => {
      return this.usersMarkers[markerKey];
    })

    this.map.removeObjects(markersArray);
    this.usersMarkers = undefined;
  }

  // Slider related functions
  sliderHandler(event) {
    this.trackingService.range = event.value;
  }

  get range() {
    return this.trackingService.range;
  }
}
