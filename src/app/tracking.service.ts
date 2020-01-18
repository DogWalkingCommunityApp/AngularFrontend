import { Injectable } from '@angular/core';
import { MapCoordinates } from './map/map.interfaces';
import { DEVICE_ORIENTATION } from './constants';
import { BehaviorSubject } from 'rxjs';
export const CALC_ORIENTATION_CHANGE = 'calculateCompassHeading';

type TrackingCallback = (coords: MapCoordinates) => void;

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private watchLocationId: number;
  private trackingCallbacks: { [key: string]: TrackingCallback} = {};
  public compass: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    // TODO: Currently no use wor the webworker, but late on we want to use it for the exact position calculation of the other users
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./tracking.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.workerReducer(data);
      };
      window.addEventListener('deviceorientation', (event) => {
        const { alpha, beta, gamma } = event;
        worker.postMessage({ type: CALC_ORIENTATION_CHANGE, orientationData: { alpha, beta, gamma } });
      })
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
   }

   public startTracking(callback: TrackingCallback, callee: string): void {
    if (navigator.geolocation) {
      if (!this.watchLocationId) {
        this.addCallback(callback, callee);
      
        this.watchLocationId = navigator.geolocation.watchPosition((geoLocation: Position) => { 
            const coords: MapCoordinates = { lat: geoLocation.coords.latitude, lng: geoLocation.coords.longitude };
    
            this.runCallbacks(coords);
          })
      } else {
        this.addCallback(callback, callee);
      }
    } else {
      throw new Error('Geolocation API not supported');
    }
   }

   public stopTracking(): void {
     navigator.geolocation.clearWatch(this.watchLocationId);
     this.watchLocationId = undefined;
   }

   private addCallback(callback: TrackingCallback, callee: string): void {
      if (!this.trackingCallbacks[callee]) {
        this.trackingCallbacks[callee] = callback;
      }
   }

   private runCallbacks(coords: MapCoordinates): void {
    for (let callback of Object.values(this.trackingCallbacks)) {
      callback(coords);
    }
   }

   private removeCallback(callee: string): void {
     if (this.trackingCallbacks[callee]) {
       delete this.trackingCallbacks[callee];
     }
   }

   private workerReducer(message): void {
    switch(message.type) {
      case DEVICE_ORIENTATION:
        this.compass.next(message.heading);
        break;
    }
   }
}