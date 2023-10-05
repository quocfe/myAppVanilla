import axios from "axios";

const callAPI = axios.create({
  baseURL: "http://localhost:3000"
});

const provincesAPI = axios.create({
  baseURL: " https://provinces.open-api.vn/api"
})


export {provincesAPI}
export default callAPI
