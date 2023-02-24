import axios from "axios";

export const HelpGet = async (URL) => {
  return await axios 
    .get(`${URL}`)
    .then((result) => result)
    .then((response) => {
      return response;
    });
};