import axios from "axios"; 

// const APPARTMENT_REST_API_URL ="http://localhost:8080/api/appartments";

const getAppartments= () => {
  return axios.get(process.env.REACT_APP_APPARTMENT_DATA_URL_API, {
    headers: {
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth :  {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      }
    },
  }); 
}

const createAppartment = (appartment) => {
  return axios.post(process.env.REACT_APP_APPARTMENT_DATA_URL_API, appartment, {
    headers: {
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth :  {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      }
    }
  }); 
}

const getAppartmentById = (appartmentId) => {
  return axios.get(process.env.REACT_APP_APPARTMENT_DATA_URL_API + "/" + appartmentId, {
    headers: {
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth :  {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      }
    }
  });
}

const updateAppartment = (id, appartmentEntity) => {
  return axios.put(`${process.env.REACT_APP_APPARTMENT_DATA_URL_API}/${id}`, appartmentEntity, {
    headers: {
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth :  {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      }
    }
  });
}

const deleteAppartmentById = (id) => {
  return axios.delete(`${process.env.REACT_APP_APPARTMENT_DATA_URL_API}/${id}`, {
    headers: {
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth :  {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      }
    }
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAppartments, 
  createAppartment, 
  getAppartmentById,
  updateAppartment,
  deleteAppartmentById,
}