/// <reference lib="webworker" />
import { CALC_ORIENTATION_CHANGE, DEVICE_ORIENTATION } from './constants';

let trackingInterval;

addEventListener('message', ({ data }) => {
  reducer(data);
});

addEventListener('orientationchange', (data) => {
  console.log(data)
});

const reducer = (message) => {
  switch(message.type) {
    case CALC_ORIENTATION_CHANGE:
      calcOrientationChange(message.orientationData);
      break;
  }

}

const calcOrientationChange = (data) => {
  const { alpha, beta, gamma} = data;

  // From https://stackoverflow.com/questions/18112729/calculate-compass-heading-from-deviceorientation-event-api
  // Convert degrees to radians
  var alphaRad = alpha * (Math.PI / 180);
  var betaRad = beta * (Math.PI / 180);
  var gammaRad = gamma * (Math.PI / 180);

  // Calculate equation components
  var cA = Math.cos(alphaRad);
  var sA = Math.sin(alphaRad);
  var cB = Math.cos(betaRad);
  var sB = Math.sin(betaRad);
  var cG = Math.cos(gammaRad);
  var sG = Math.sin(gammaRad);

  // Calculate A, B, C rotation components
  var rA = - cA * sG - sA * sB * cG;
  var rB = - sA * sG + cA * sB * cG;
  var rC = - cB * cG;

  // Calculate compass heading
  var compassHeading = Math.atan(rA / rB);

  // Convert from half unit circle to whole unit circle
  if(rB < 0) {
    compassHeading += Math.PI;
  }else if(rA < 0) {
    compassHeading += 2 * Math.PI;
  }

  // Convert radians to degrees
  compassHeading *= 180 / Math.PI;

  postMessage({ type: DEVICE_ORIENTATION, heading: compassHeading });
}