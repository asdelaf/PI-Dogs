import {
  GET_DOGS,
  GET_DOG_ID,
  GET_CLEAN
} from "../actions/dogs.js";

import {
  GET_TEMPERAMENTS
} from "../actions/temperaments.js";

  const initialState = {
    allDogs: [],
    temperaments: [],
    dog: {}
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          allDogs: action.payload,
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
      case GET_CLEAN:
        return {
          ...state,
          dog: action.payload
        };
      
      

      default:
        return {...state};
    }
  }