import { updateImgAPI } from './config';

const updateImgApi = {
	updateImg(file) {
		const CLOUD_NAME = 'lazedafpoly';
		const PRESET_NAME = 'lazeda-img';
		const FOLDER_NAME = 'lazedaFpoly';
		const url = `/${CLOUD_NAME}/image/upload`;

		const formData = new FormData();
		formData.append('upload_preset', PRESET_NAME);
		formData.append('folder', FOLDER_NAME);
		formData.append('file', file);
		return updateImgAPI.post(url, formData, {
			Headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};

export default updateImgApi;
