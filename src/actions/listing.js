import { HOST } from '../constants';
import { normalizeListings, normalizeListing } from '../utils';
import { navigate } from './nav';

export const SET_LISTINGS = 'SET_LISTINGS';
export const SET_LISTING = 'SET_LISTING';
export const SET_FILTER = 'SET_FILTER';

export function setListings(listings){
  return{
    type: SET_LISTINGS,
    listings
  }
}

export function setListing(listing){
  return{
    type: SET_LISTING,
    listing
  }
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter
  }
}

export function getListings() {
  return (dispatch, getState) => {
    const filter = getState().listing.filter;

    return fetch(`${HOST}/api/v1/listings?address=${filter.address}&start_date=${filter.startDate}&end_date=${filter.endDate}`)
    .then(response => response.json())
    .then(json => {
      console.log("getListings", json);

      if (json.is_success){
        dispatch(setListings(normalizeListings(json.listings)));
      } else{
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  }
}

export function getListing(listingId){
  return (dispatch) => {
    return fetch(`${HOST}/api/v1/listings/${listingId}`)
    .then(response => response.json())
    .then(json => {
      console.log("getListing", json);

      if (json.is_success){
        dispatch(setListing(normalizeListing(json.listing)));
      } else{
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  }
}

export function bookRoom(listingId, startDate, endDate) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;

    return fetch(`${HOST}/api/v1/reservations`, {
      method: 'POST',
      body: JSON.stringify({
        listing_id: listingId,
        start_date: startDate,
        end_date: endDate,
        access_token: accessToken
      }),
      headers: {
        "content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.is_success) {
        alert("Booked successfully");
        dispatch(navigate({ routeName: 'Explore' }));
      } else {
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  }
}
