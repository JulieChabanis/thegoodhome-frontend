import axios from "axios";

// const LEASE_CONTRACT_REST_API_URL = "http://localhost:8080/api/contracts";

const getAllLeaseContracts = () => {
  return axios.get(process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API, {
    auth: {
      username: process.env.REACT_APP_KEY_USER_AUTH,
      password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
    },
  });
}

const getLeaseContractById = (leaseContractId) => {
  return axios.get(`${process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API}/${leaseContractId}`, {
    auth: {
      username: process.env.REACT_APP_KEY_USER_AUTH,
      password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
    },
  });
}

const getLeaseContractByTenantId = (tenantId) => {
  return axios.get(`${process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API}/tenants/${tenantId}/contracts`, {
    auth: {
      username: process.env.REACT_APP_KEY_USER_AUTH,
      password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
    },
  });
}

const getLeaseContractByAppartmentId = (appartmentId) => {
  return axios.get(`${process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API}/appartments/${appartmentId}/contracts`, {
    auth: {
      username: process.env.REACT_APP_KEY_USER_AUTH,
      password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
    },
  });
}

const createLeaseContract = (leaseContract) => {
  return axios.post(process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API, leaseContract, {
    auth: {
      username: process.env.REACT_APP_KEY_USER_AUTH,
      password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
    },
  });

}

const deleteLeaseContractById = (id) => {
  return axios.delete(`${process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API}/${id}`, {
    auth: {
      username: process.env.REACT_APP_KEY_USER_AUTH,
      password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
    },
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllLeaseContracts, 
  getLeaseContractById,
  getLeaseContractByTenantId, 
  getLeaseContractByAppartmentId, 
  createLeaseContract,
  deleteLeaseContractById,
}