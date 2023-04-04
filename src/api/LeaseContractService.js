import axios from "axios";

const LEASE_CONTRACT_REST_API_URL = "http://localhost:8080/api/contrats";

const getAllLeaseContracts = () => {
  return axios.get(LEASE_CONTRACT_REST_API_URL);
}

const getLeaseContractById = (leaseContractId) => {
  return axios.get(`${LEASE_CONTRACT_REST_API_URL}/${leaseContractId}`);
}

const getLeaseContractByTenantId = (tenantId) => {
  return axios.get(`${LEASE_CONTRACT_REST_API_URL}/tenants/${tenantId}/contracts`);
}

const getLeaseContractByAppartmentId = (appartmentId) => {
  return axios.get(`${LEASE_CONTRACT_REST_API_URL}/appartments/${appartmentId}/contracts`);
}

const createLeaseContract = (leaseContract) => {
  return axios.post(LEASE_CONTRACT_REST_API_URL, leaseContract);

}

export default {
  getAllLeaseContracts, 
  getLeaseContractById,
  getLeaseContractByTenantId, 
  getLeaseContractByAppartmentId, 
  createLeaseContract,
}