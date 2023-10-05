import callAPI from './config';

const orderAPI = {
  addOrder (order) {
    const url = "/orders"
    return callAPI.post(url, order)
  }

}

export default orderAPI