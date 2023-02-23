import axios from "axios";

const TENANT_REST_API_URL = "http://localhost:8080/api/v1/tenants";

class TenantService {
  getTenants() {
    return axios.get(TENANT_REST_API_URL);
  }
}

export default new TenantService();