import axios from 'axios';

const callAPI = axios.create({
	baseURL: 'http://localhost:3000',
});

const provincesAPI = axios.create({
	baseURL: ' https://provinces.open-api.vn/api',
});

const updateImgAPI = axios.create({
	baseURL: 'https://api.cloudinary.com/v1_1',
});

export { provincesAPI, updateImgAPI };
export default callAPI;
