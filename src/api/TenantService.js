import axios from "axios";

const TENANT_REST_API_URL = "http://localhost:8080/api/tenants";

  const getTenants = () => {
    return axios.get(TENANT_REST_API_URL);
  };

  const createTenant = (tenant) => {
    return axios.post(TENANT_REST_API_URL, tenant);
  };

  const getTenantById = (tenantId) => {
    return axios.get(TENANT_REST_API_URL + "/" + tenantId);
  }

  const updateTenant = (id, tenantEntity) => {
    return axios.put(`${TENANT_REST_API_URL}/${id}`, tenantEntity);
  }

  const deleteTenantById = (id) => {
    return axios.delete(`${TENANT_REST_API_URL}/${id}`);
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTenants,
  createTenant,
  getTenantById,
  updateTenant,
  deleteTenantById,
};