import axios from "axios";

const callAPI = axios.create({
  baseURL: "http://localhost:3000"
});

export default callAPI
