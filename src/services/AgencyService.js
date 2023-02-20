import axios from "axios";

const AGENCY_REST_API_URL = "http://localhost:8080/api/v1/agencies";

class AgencyService {
  getAgencies() {
    return axios.get(AGENCY_REST_API_URL)
  }
}

export default new AgencyService();