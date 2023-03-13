import axios from "axios";

const TENANT_REST_API_URL = "http://localhost:8080/api/tenants";

  const getTenants = () => {
    return axios.get(TENANT_REST_API_URL);
  };

  const createTenant = (tenant) => {
    return axios.post(TENANT_REST_API_URL, tenant);
  };

  const getTenantbyId = (tenantId) => {
    return axios.get(TENANT_REST_API_URL + "/" + tenantId);
  }

  const updateTenant = (tenant, tenantId) => {
    return axios.put(TENANT_REST_API_URL + "/" + tenantId, tenant);
  }

  const deleteTenantById = (id) => {
    return axios.delete(`${TENANT_REST_API_URL}/${id}`);
  }

export default {
  getTenants,
  createTenant,
  getTenantbyId,
  updateTenant,
  deleteTenantById,
};