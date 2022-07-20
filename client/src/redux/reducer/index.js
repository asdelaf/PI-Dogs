import {
  GET_DOGS,
  GET_DOG_ID,
} from "../actions/dogs.js";

import {
  GET_TEMPERAMENTS
} from "../actions/temperaments.js";

  const initialState = {
    dogs: [],
    temperaments: [],
    dog: {}
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: action.payload,
        };
      case GET_DOG_ID:
        return {
          ...state,
          dog: action.payload,
        };
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload,
        };
      

      default:
        return state;
    }
  }