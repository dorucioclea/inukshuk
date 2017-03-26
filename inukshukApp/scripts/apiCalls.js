import { Alert} from 'react-native';
import {
  storageGet,
  storageMultiGet,
  storageRemove,
  storageMultiRemove,
  storageSet,
} from './localStorage.js';
<<<<<<< HEAD
import BackgroundJob from 'react-native-background-job';

var localIp = '192.168.1.90';
var mockUserId = 201;
=======
var localIp = '192.168.1.90';
var mockUserId = 230;
>>>>>>> 2032ab5585237037b2cdb5eeeae638c78a6aed26

/** HANDLE ERRORS
* Handle any errors while communicating with the server
* REQUIRES: a response object
* MODIFIES: nothing
* RETURNS: the given response object
**/
function handleErrors(response) {
  if (!response.ok) {
    throw Error("Problem connecting to server");
  }
  return response;
}

/** LOGIN
* Login to retrieve account information
* REQUIRES: a component, that a user has been created already
* (can be done through sign up)
* MODIFIES: the database of users on the inukshuk server
* RETURNS: JSON response or an error message
**/
export function login(username, password) {
  return new Promise((resolve, reject) => {
    fetch('http://' + localIp + ':8080/login', {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      })
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => {
      resolve(responseJson);
    })
    .catch((error) => {
      reject("Can not reach server")
    });
  })
}

/** LOGIN MOCK
* Login without checking credentials (for development/testing)
* REQUIRES: a component, that a user has been created already
* (can be done through sign up)
* MODIFIES: the database of users on the inukshuk server
* RETURNS: JSON response or an error message
**/
export function loginMock(username, password) {
  return new Promise((resolve, reject) => {
    fetch('http://' + localIp + ':8080/users/' + mockUserId)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => {
      resolve(responseJson);
     })
     .catch((error) => {
       reject("Can not reach server")
     });
  })
}

/** CREATE USER
* Create a user on the inukshuk server with the given information
* REQUIRES: user object with username, firstName, lastName, email and
* phoneNumber
* MODIFIES: the database of users on the inukshuk server
* RETURNS: JSON response or error message
**/
export function createUser(user) {
  return new Promise((resolve, reject) => {
    fetch('http://' + localIp + ':8080/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(handleErrors)
    .then(response => response.json())
    .then((responseJson) => {
      resolve(responseJson);
    })
    .catch((error) => {
      reject('Can not reach server')
    });
  })
}

/** UPDATE USER
* Update user info on the inukshuk server
* REQUIRES: user object with id, username, firstName, lastName, email and
* phoneNumber
* MODIFIES: the database of users on the inukshuk server
* RETURNS: JSON response or error message
**/
export function updateUser(user) {
  return new Promise((resolve, reject) => {
    fetch('http://' + localIp + ':8080/users', {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(handleErrors)
    .then(response => response.json())
    .then((responseJson) => {
      resolve(responseJson);
    })
    .catch((error) => {
      reject('Can not reach server')
    });
  })
}

 /** POST TRIP
 * Post a trip to inukshuk server
 * REQUIRES: a trip object with location, contact, return, note
 * MODIFIES: the database of trips on the inukshuk server
 * RETURNS: JSON response or error message
 **/
export function postTrip(trip) {
  return new Promise((resolve, reject) => {
    fetch('http://' + localIp + ':8080/trips', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip)
    })
    .then(handleErrors)
    .then(response => response.json())
    .then((responseJson) => {
      resolve(responseJson)
    })
    .catch((error) => {
      reject('Can not reach server')
    });
  })
}

/** CANCEL TRIP
* Delete a trip from the inukshuk server
* REQUIRES: a component with details in state
* MODIFIES: the database of trips on the inukshuk server, navigator route
* RETURNS: nothing
**/
export function cancelTrip(tripId) {
  return new Promise((resolve, reject) => {
    fetch('http://' + localIp + ':8080/trips/' + tripId, {
      method: 'DELETE',
    })
    .then(handleErrors)
    .then(() => resolve())
    .catch(function(error) {
      reject('Can not reach server');
    });
  })
<<<<<<< HEAD
  .then(handleErrors)
  .then(
    Alert.alert(
      'Trip Cancelled',
      'We also notified your contact about the cancellation',
      [{ text: 'OK', onPress: () => {
        BackgroundJob.cancel({jobKey: 'breadcrumbs'});
        comp.props.callback(false);
        _navigator.pop();
      }}]
    )
  )
  .catch(function(error) {
    Alert.alert('Can not reach server');
  });
=======
>>>>>>> 2032ab5585237037b2cdb5eeeae638c78a6aed26
}

/** COMPLETE TRIP
* Completes a trip on the inukshuk server
* REQUIRES: a trip id
* MODIFIES: the database of trips on the inukshuk server
* RETURNS: nothing
**/
export async function completeTrip(tripId) {
  return new Promise((resolve, reject) => {
    fetch('http://' + localIp + ':8080/trips/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tripId: tripId,
        completed: true
      })
    })
    .then(handleErrors)
    .then(() => resolve())
    .catch(function(error) {
      reject('Can not reach server');
    })
  })
<<<<<<< HEAD
  .then(handleErrors)
  .then(
    Alert.alert(
      'Trip Completed',
      'We also notified your contact that you are safe',
      [{ text: 'OK', onPress: () => {
        BackgroundJob.cancel({jobKey: 'breadcrumbs'});
        comp.props.callback(false);
        _navigator.pop();
      }}]
    )
  )
  .catch(function(error) {
    Alert.alert('Can not reach server');
  });
=======
>>>>>>> 2032ab5585237037b2cdb5eeeae638c78a6aed26
}

/** EXTEND TRIP
* Extend a trip on the inukshuk server
* REQUIRES: a component with details in state, including a Javascript date
* MODIFIES: the database of trips on the inukshuk server, navigator route
* RETURNS: nothing
**/
export function extendTrip(tripId, newReturnDate) {
  return new Promise((resolve, reject) => {
    fetch('http://' + localIp + ':8080/trips/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tripId: tripId,
        returnTime: newReturnDate,
      })
    })
    .then(handleErrors)
    .then(() => resolve())
    .catch(function(error) {
      reject('Can not reach server');
    });
  })
}

/** THROW CRUMBS
* Add breadcrumbs to the database
* REQUIRES: a component with details in state, including breadcrumbs lat/lng
* MODIFIES: the database of trips on the inukshuk server, the local store of
* unposted breadcrumbs
* RETURNS: nothing
**/
export function throwCrumbs(comp) {
  fetch('http://' + localIp + ':8080/trips/' + comp.props.tripId + 'breadcrumbs/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tripId: 0,
      breadcrumbs: comp.state.breadcrumbs,
    })
  })
  .then(handleErrors)
  .catch(function(error) {
    Alert.alert('Error posting breadcrumbs to the server');
  });
}
