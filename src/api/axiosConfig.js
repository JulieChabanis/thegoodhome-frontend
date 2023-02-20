import axios from "axios";

export default axios.create({
  baseURL: process.env.NGROK_URL_TO_DATABASE,
  headers: {
    common: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  "ngrok-skip-browser-warning": "true",
  "Authorization": `Bearer ${process.env.NGROK_URL_TO_DATABASE_KEY}`
  }
}); 