import { provincesAPI } from "./config";

const provinceApi = {
  getProvince () {
    const url = "/p";
    return provincesAPI.get(url);
  },
  getDistrict () {
    const url = "/d";
    return provincesAPI.get(url);
  },
  getWard () {
    const url = "/w";
    return provincesAPI.get(url);
  }
}

export default provinceApi