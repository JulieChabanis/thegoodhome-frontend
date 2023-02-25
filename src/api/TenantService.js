import axios from "axios";

const TENANT_REST_API_URL = "http://localhost:8080/api/v1/tenants";

class TenantService {
  getTenants() {
    return axios.get(TENANT_REST_API_URL);
  }

  createTenant(tenant) {
    return axios.post(TENANT_REST_API_URL, tenant);
  }

  getTenantbyId(tenantId) {
    return axios.get(TENANT_REST_API_URL + "/" + tenantId);
  }

  updateTenant(tenant, tenantId) {
    return axios.put(TENANT_REST_API_URL + "/" + tenantId, tenant);
  }

  deleteTenant(tenantId) {
    return axios.delete(TENANT_REST_API_URL + "/" + tenantId);
  }
}
export default new TenantService();