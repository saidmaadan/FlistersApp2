import { SET_LISTINGS, SET_LISTING, SET_FILTER } from '../actions/listing';

const initialState = {
  listings: [],
  listing: null,
  filter: {
    address: '',
    startDate: '',
    endDate: ''
  }
};

export default function(state = initialState, action){
  if (action.type === SET_LISTINGS){
    return{
      ...state,
      listings: action.listings
    }
  }

  if (action.type === SET_LISTING){
    return{
      ...state,
      listing: action.listing
    }
  }

  if (action.type === SET_FILTER) {
    return {
      ...state,
      filter: action.filter
    }
  }

  return state;
}
