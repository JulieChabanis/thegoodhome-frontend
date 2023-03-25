import axios from "axios"; 

const APPARTMENT_REST_API_URL ="http://localhost:8080/api/appartments"
const IMAGE_REST_API_URL = "http://localhost:8080/api/appartments/{appartmentId}"

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

const getImages = () => {
  return axios.get(IMAGE_REST_API_URL);
}

const getImageById = (id) => {
  return axios.get(`${IMAGE_REST_API_URL}/${id}`);
}

const uploadImage = (appartmentId, imageEntity) => {
  const formData = new FormData();
  formData.append("file", imageEntity);
  return axios.post(`${IMAGE_REST_API_URL}/${appartmentId}/upload-image`,
  formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const updateImage = (id, imageEntity) => {
  const formData = new FormData();
  formData.append("file", imageEntity);
  return axios.put(`${IMAGE_REST_API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const deleteImageById = (id) => {
  return axios.delete(`${IMAGE_REST_API_URL}/${id}`); 
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAppartments, 
  createAppartment, 
  getAppartmentById,
  updateAppartment,
  deleteAppartmentById,
  getImages, 
  getImageById,
  uploadImage,
  updateImage,
  deleteImageById,
}