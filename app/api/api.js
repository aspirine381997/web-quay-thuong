import axios from "axios";

const BASE_URL = "https://gatewaystag.medon.vn/api/minigame/web";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getTurnsRemain = async (requestBody) => {
  return instance
    .post("/get-turns-remain", requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTurnsResult = async (requestBody) => {
  return instance
    .post("/get-turns-result", requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getListAward = async (requestBody) => {
  return instance
    .post("/get-list-award", requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
