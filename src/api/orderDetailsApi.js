import callAPI from './config';

const orderDetailsAPI = {
	getOrderDetailByOrderID(orderID) {
		const url = `order_details/?orders_id=${orderID}`;
		return callAPI.get(url);
	},
	addOrderDetails(orderDetail) {
		const url = '/order_details';
		return callAPI.post(url, orderDetail);
	},
};

export default orderDetailsAPI;
