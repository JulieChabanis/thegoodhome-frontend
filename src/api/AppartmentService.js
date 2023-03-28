import axios from "axios"; 

const APPARTMENT_REST_API_URL ="http://localhost:8080/api/appartments";

const getAppartments= () => {
  return axios.get(APPARTMENT_REST_API_URL); 
}

const createAppartment = (appartment) => {
  return axios.post(APPARTMENT_REST_API_URL, appartment); 
}

const getAppartmentById = (appartmentId) => {
  return axios.get(APPARTMENT_REST_API_URL + "/" + appartmentId);
}

const updateAppartment = (id, appartmentEntity) => {
  return axios.put(`${APPARTMENT_REST_API_URL}/${id}`, appartmentEntity);
}

const deleteAppartmentById = (id) => {
  return axios.delete(`${APPARTMENT_REST_API_URL}/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAppartments, 
  createAppartment, 
  getAppartmentById,
  updateAppartment,
  deleteAppartmentById,
}