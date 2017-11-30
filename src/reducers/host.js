import { SET_LISTS, SET_RESERVATIONS } from '../actions/host';

const initialState = {
  lists: [],
  reservations: [],
};

export default function(state = initialState, action) {
  if (action.type === SET_LISTS) {
    return {
      ...state,
      lists action.lists
    }
  }

  if (action.type === SET_RESERVATIONS) {
    return {
      ...state,
      reservations: action.reservations
    }
  }

  return state;
};
