import axios from "axios";

// const AGENCY_REST_API_URL = "http://localhost:8080/api/agencies";

const getAgencies = () => {
  return axios.get(process.env.REACT_APP_AGENCY_DATAS_URL_API, {
    auth: {
      username: process.env.REACT_APP_KEY_USER_AUTH,
      password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
    },
  });
}; 

const createAgency = (agency) => {
  return axios.post(process.env.REACT_APP_AGENCY_DATAS_URL_API, agency, {
    auth: {
      username: process.env.REACT_APP_KEY_USER_AUTH,
      password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
    },
  }); 
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAgencies, 
  createAgency,
};
