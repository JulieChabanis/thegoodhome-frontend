import axios from "axios";

// const LEASE_CONTRACT_REST_API_URL = "http://localhost:8080/api/contracts";

const getAllLeaseContracts = () => {
  return axios.get(process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API);
}

const getLeaseContractById = (leaseContractId) => {
  return axios.get(`${process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API}/${leaseContractId}`);
}

const getLeaseContractByTenantId = (tenantId) => {
  return axios.get(`${process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API}/tenants/${tenantId}/contracts`);
}

const getLeaseContractByAppartmentId = (appartmentId) => {
  return axios.get(`${process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API}/appartments/${appartmentId}/contracts`);
}

const createLeaseContract = (leaseContract) => {
  return axios.post(process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API, leaseContract);

}

const deleteLeaseContractById = (id) => {
  return axios.delete(`${process.env.REACT_APP_LEASE_CONTRACT_DATA_URL_API}/${id}`);
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