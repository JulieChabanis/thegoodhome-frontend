import axios from "axios"; 

// const APPARTMENT_REST_API_URL ="http://localhost:8080/api/appartments";

const getAppartments= () => {
  return axios.get(process.env.REACT_APP_APPARTMENT_DATA_URL_API); 
}

const createAppartment = (appartment) => {
  return axios.post(process.env.REACT_APP_APPARTMENT_DATA_URL_API, appartment); 
}

const getAppartmentById = (appartmentId) => {
  return axios.get(process.env.REACT_APP_APPARTMENT_DATA_URL_API + "/" + appartmentId);
}

const updateAppartment = (id, appartmentEntity) => {
  return axios.put(`${process.env.REACT_APP_APPARTMENT_DATA_URL_API}/${id}`, appartmentEntity);
}

const deleteAppartmentById = (id) => {
  return axios.delete(`${process.env.REACT_APP_APPARTMENT_DATA_URL_API}/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAppartments, 
  createAppartment, 
  getAppartmentById,
  updateAppartment,
  deleteAppartmentById,
}