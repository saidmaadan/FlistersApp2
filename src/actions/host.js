import { HOST } from '../constants';
import { normalizeListings , normalizeReservations} from '../utils';

export const SET_ALL_LISTINGS = 'SET_ALL_LISTINGS';
export const SET_RESERVATIONS = 'SET_RESERVATIONS';

export function setLists(lists) {
  return {
    type: SET_ALL_LISTINGS,
    lists,
  }
}

export function setReservations(reservations) {
  return {
    type: SET_RESERVATIONS,
    reservations,
  }
}

export function getLists() {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;

    return fetch(`${HOST}/api/v1/listings?access_token=${accessToken}`)
      .then(response => response.json())
      .then(json => {
        if (json.is_success) {
          dispatch(setListings(normalizeListings(json.lists)));
        } else {
          alert(json.error);
        }
      })
      .catch(e => alert(e));
  }
}

export function getReservations(listingId) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;

    return fetch(`${HOST}/api/v1/listings/${listingId}/reservations?access_token=${accessToken}`)
      .then(response => response.json())
      .then(json => {
        if (json.is_success) {
          console.log(json);
          dispatch(setReservations(normalizeReservations(json.reservations)));
        } else {
          alert(json.error);
        }
      })
      .catch(e => alert(e));
  }
}

export function changeReservation(listingId, reservationId, approve) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;
    var url = `${HOST}/api/v1/reservations/${reservationId}/`;
    if (approve) {
      url += 'approve';
    } else {
      url += 'decline';
    }

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        access_token: accessToken,
      }),
      headers: { "content-type": "application/json"}
    })
    .then(response => response.json())
    .then(json => {
      if (json.is_success) {
        dispatch(getReservations(listingId));
      } else {
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  }
}
