import axios from "axios";

const TENANT_REST_API_URL = "http://localhost:8080/api/v1/tenants";

class TenantService {
  getTenants() {
    return axios.get(TENANT_REST_API_URL);
  }
  createTenant() {
    return axios.post(TENANT_REST_API_URL);
  }
  updateTenant(tenant) {
    return axios.put(TENANT_REST_API_URL + "/" + tenant.id);
  }
  deleteTenant(id) {
    return axios.delete(TENANT_REST_API_URL + "/" + id);
  }
}
export default new TenantService();