import axios from "axios";

// const TENANT_REST_API_URL = "http://localhost:8080/api/tenants";

  const getTenants = () => {
    return axios.get(process.env.REACT_APP_TENANT_DATA_URL_API, {
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
  };

  const createTenant = (tenant) => {
    return axios.post(process.env.REACT_APP_TENANT_DATA_URL_API, tenant, {
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
  };

  const getTenantById = (tenantId) => {
    return axios.get(process.env.REACT_APP_TENANT_DATA_URL_API + "/" + tenantId, {
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

  const updateTenant = (id, tenantEntity) => {
    return axios.put(`${process.env.REACT_APP_TENANT_DATA_URL_API}/${id}`, tenantEntity, {
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

  const deleteTenantById = (id) => {
    return axios.delete(`${process.env.REACT_APP_TENANT_DATA_URL_API}/${id}`, {
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
  getTenants,
  createTenant,
  getTenantById,
  updateTenant,
  deleteTenantById,
};