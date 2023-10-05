import callAPI from './config';

const orderDetailsAPI = {
  addOrderDetails (orderDetail) {
    const url = "/order_details"
    return callAPI.post(url, orderDetail)
  }

}

export default orderDetailsAPI