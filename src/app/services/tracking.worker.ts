/// <reference lib="webworker" />
import { CALC_ORIENTATION_CHANGE, DEVICE_ORIENTATION, TRACKING_USERS_ARRAY } from './../constants';
import { getDistance, isPointInPolygon } from 'geolib';

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
    case TRACKING_USERS_ARRAY:
      handleTrackingUsersData(message.data);
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

let previousUsers: number[] = [];
let currentGpsCell: any = undefined;
let jumpCellCalcBoundry: number = 1; 

const handleTrackingUsersData = ({ trackingArray, coordinates, range = 5, gpsKey }) => {
  const filteredData = {};
  const currentUsers: number[] = [];
  let newUsers, removedUsers;

  if (gpsKey) {
    currentGpsCell = JSON.parse(gpsKey);
  }

  // TODO: Exclude own userId
  for(let cell of trackingArray) {
    for (let user in cell) {
      const userObj = cell[user];
      const distance = getDistance({ latitude: userObj.lat, longitude: userObj.lng }, { latitude: coordinates.lat, longitude: coordinates.lng })
    
      if (distance <= range*1000) {
        filteredData[userObj.userData.id] = userObj;
        currentUsers.push(userObj.userData.id);
      }
    }
  }

  
  if(previousUsers.length !== Object.keys(filteredData).length) {
    removedUsers = previousUsers.filter((userId) => {
      return currentUsers.indexOf(userId) === -1;
    })

    newUsers = currentUsers.filter((userId) => {
      return previousUsers.indexOf(userId) === -1;
    })
  }

  previousUsers = currentUsers;

  let jump = false;
  if(jumpCellCalcBoundry % 10 === 0) {
    jump = checkIfJumpOccurs(coordinates)
  } else {
    jumpCellCalcBoundry++;
  }
  
  postMessage({ type: TRACKING_USERS_ARRAY, data: { filteredData, removedUsers, newUsers, jump } });
}


const checkIfJumpOccurs = (coordinates) => {
  const { lat, lng } = coordinates;

  const geoLibCoords = { longitude: lng, latitude: lat };

  return !isPointInPolygon(geoLibCoords, currentGpsCell);
}