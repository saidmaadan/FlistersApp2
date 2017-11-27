import { HOST } from '../constants';

export function normalizeListings(listings){
  return listings.map(listing => {
    return{
      id: listing.id || '',
      title: listing.listing_name || '',
      image: `${HOST}${listing.image}` || '',
      listing_type: listing.listing_type || '',
      apartment_type: listing.apartment_type || '',
      bedroom: listing.bedroom || '',
      price: listing.price || '',
      instant: listing.instant || '',
    }
  })
}

export function normalizeListing(listing){
  return{
    id: listing.id || '',
    title: listing.listing_name || '',
    image: `${HOST}${listing.image}` || '',
    listing_type: listing.listing_type || '',
    apartment_type: listing.apartment_type || '',
    bedroom: listing.bedroom || '',
    price: listing.price || '',
    instant: listing.instant || '',
    summary: listing.summary || '',
    bathroom: listing.bathroom || '',
    accommodate: listing.accommodate || '',
    unavailableDates: listing.unavailable_dates || '',
    host: listing.host ? {
      email: listing.host.email || '',
      first_name: listing.host.first_name || '',
      last_name: listing.host.last_name || '',
      full_name: listing.host.full_name || '',
      avatar: listing.host.image || '',
    } : {
      email: '',
      first_name: '',
      last_name: '',
      full_name: '',
      avatar: '',
    }
  }
}

export function normalizeProfile (email, first_name, last_name, full_name, image) {
  return {
    email: email || '',
    first_name: first_name || '',
    last_name: last_name || '',
    full_name: full_name || '',
    avatar: image || '',
  }
}
