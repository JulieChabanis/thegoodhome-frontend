import axios from "axios";

// const TENANT_REST_API_URL = "http://localhost:8080/api/tenants";

  const getTenants = () => {
    return axios.get(process.env.REACT_APP_TENANT_DATA_URL_API);
  };

  const createTenant = (tenant) => {
    return axios.post(process.env.REACT_APP_TENANT_DATA_URL_API, tenant);
  };

  const getTenantById = (tenantId) => {
    return axios.get(process.env.REACT_APP_TENANT_DATA_URL_API + "/" + tenantId);
  }

  const updateTenant = (id, tenantEntity) => {
    return axios.put(`${process.env.REACT_APP_TENANT_DATA_URL_API}/${id}`, tenantEntity);
  }

  const deleteTenantById = (id) => {
    return axios.delete(`${process.env.REACT_APP_TENANT_DATA_URL_API}/${id}`);
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTenants,
  createTenant,
  getTenantById,
  updateTenant,
  deleteTenantById,
};