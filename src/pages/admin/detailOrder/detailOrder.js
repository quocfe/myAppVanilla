import { useEffect, useState } from '@/utils';
import * as style from './style.module.css';
import { orderDetailsAPI, productAPI, shippingApi } from '@/api';

const detailOrder = ({ id }) => {
	const [orderDetails, setOrderDetails] = useState([]);

	useEffect(() => {
		const fetchDataDetailOrder = async () => {
			const responseDetail = await orderDetailsAPI.getOrderDetailByOrderID(id);

			const orderDetailData = await Promise.all(
				responseDetail.data.map(async (data) => {
					const { quantity, unit_price, total, product_id, orders_id } = data;
					const responseProduct = await productAPI.getProduct(product_id);
					let responseShipping = await shippingApi.getShipping(orders_id);
					const { title } = responseProduct.data;
					const { username, address } = responseShipping.data[0];
					return {
						username,
						address,
						title,
						unit_price,
						quantity,
						total,
					};
				})
			);

			setOrderDetails(orderDetailData);
		};

		fetchDataDetailOrder();
	}, []);

	const generateOrderRows = () => {
		return orderDetails
			.map(
				(el) => `
      <tr class="${style.show_edit}">
        <td>${el.username}</td>
        <td>${el.address}</td>
        <td>${el.title}</td>
        <td>${el.unit_price}</td>
        <td >${el.quantity}</td>
        <td >${el.total}</td>
      </tr>
      `
			)
			.join('');
	};

	return `
    <section class="main">
      <div class="container-fluid">
        <div class="card w-80 mx-auto mt-5 overflow-hidden">
          <div class="${style.card_body}">
            <table class="table">
              <thead class="thead-dark">
                <tr class="thead-dark-top text-center">
                  <th>Tên khách hàng</th>
                  <th>Địa chỉ</th>
                  <th>Tên hàng hóa</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                ${generateOrderRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
};

export default detailOrder;
