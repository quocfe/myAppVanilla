import callAPI from './config';

const shippingApi = {
	getShippings() {
		const url = `/shipping`;
		return callAPI.get(url);
	},
	getShipping(id) {
		const url = `/shipping?orders_id=${id}`;
		return callAPI.get(url);
	},
	addShipping(shipping) {
		const url = '/shipping';
		return callAPI.post(url, shipping);
	},
	getShippingMuti(param) {
		const url = `/shipping?${param}`;
		return callAPI.get(url);
	},
};

export default shippingApi;
