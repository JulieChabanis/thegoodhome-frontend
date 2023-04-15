import axios from "axios";

const AGENCY_REST_API_URL = "http://localhost:8080/api/agencies";

const getAgencies = () => {
  return axios.get(AGENCY_REST_API_URL);
}; 

const createAgency = (agency) => {
  return axios.post(AGENCY_REST_API_URL, agency); 
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAgencies, 
  createAgency,
};