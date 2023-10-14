import callAPI from './config';

const shippingApi = {
	getShipping(id) {
		const url = `/shipping?orders_id=${id}`;
		return callAPI.get(url);
	},
	addShipping(shipping) {
		const url = '/shipping';
		return callAPI.post(url, shipping);
	},
};

export default shippingApi;
