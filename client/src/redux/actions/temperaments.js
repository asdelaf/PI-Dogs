import axios from "axios";
export const POST_TEMPERAMENT = "POST_TEMPERAMENT";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";

export function postTemperament(name) {
    return async function (dispatch) {
      return await axios
        .post("/temperaments", name)
        .then((response) => {
          dispatch({
            type: POST_TEMPERAMENT,
            payload: response.data,
          });
        });
    };
  }
  
  export function getTemperaments() {
    return async function (dispatch) {
      return await axios
        .delete(`/temperaments`)
        .then((response) => {
          dispatch({
            type: GET_TEMPERAMENTS,
            payload: response.data,
          });
        });
    };
  }