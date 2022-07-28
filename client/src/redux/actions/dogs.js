import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_DOG_ID = "GET_DOG_ID";
export const POST_DOG = "POST_DOG";
export const GET_CLEAN = "GET_CLEAN"


export function postDog(dog) {
    return async function (dispatch) {
      return await axios
        .post("/dogs", dog)
        .then((response) => {
          dispatch({
            type: POST_DOG,
            payload: response.data,
          });
        });
    };
}

export function getDogs() {
  return async function (dispatch) {
    return await axios
      .get("/dogs")
      .then((response) => {
        dispatch({
          type: GET_DOGS,
          payload: response.data,
        });
      });
  };
}

export function getDogId(id) {
  return async function (dispatch) {
    return await axios
      .get(`/dogs/${id}`)
      .then((response) => {
        dispatch({
          type: GET_DOG_ID,
          payload: response.data,
        });
      });
  };
}

export function getClean () {
  return{
      type: GET_CLEAN,
      payload: []
  }
}