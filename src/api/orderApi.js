import callAPI from './config';

const orderAPI = {
	getOrders() {
		const url = '/orders';
		return callAPI.get(url);
	},
	getOrder(query) {
		const url = `/orders?${query}`;
		return callAPI.get(url);
	},
	addOrder(order) {
		const url = '/orders';
		return callAPI.post(url, order);
	},
	updateOrder(id, order) {
		const url = `/orders/${id}`;
		return callAPI.patch(url, order);
	},
};

export default orderAPI;
