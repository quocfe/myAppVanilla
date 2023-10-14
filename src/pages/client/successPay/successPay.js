import { useEffect, useState } from '@/utils';
import * as style from './style.module.css';
import { orderDetailsAPI, productAPI, shippingApi } from '@/api';
import { useLocalStorage } from '@/hooks';

const successPay = () => {
	const [orderID] = useLocalStorage('orderID', '');
	const [productID, setProductID] = useState([]);
	const [product, setProduct] = useState([]);
	const [shipping, setShipping] = useState([]);
	const [dataShipping] = shipping;

	useEffect(async () => {
		try {
			const response = await orderDetailsAPI.getOrderDetailByOrderID(orderID);
			const newProductIDs = response.data.map((el) => el.product_id);
			setProductID((prev) => [...prev, ...newProductIDs]);
		} catch (error) {
			console.log(error);
		}
		try {
			const response = await shippingApi.getShipping(orderID);
			setShipping(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(async () => {
		try {
			for (const id of productID) {
				const response = await productAPI.getProduct(id);
				const newProduct = response.data;
				setProduct((prev) => [...prev, newProduct]);
			}
		} catch (error) {
			console.log(error);
		}
	}, [productID]);

	const template = `
<div class="${style.success}" id="success">
    <div class="${style.success_left}">
      <div class="${style.success_left_top}">
      </div>
      <div class="${style.text}">
        <h4>Đặt hàng thành công</h4>
        ${
					dataShipping?.method === 'cod'
						? `
          <p class="mb-0 w-100">Chuẩn bị tiền mặt $${dataShipping?.totalOrder}</p>
        `
						: ''
				}
      </div>
      <div class="${style.success_left_bottom}">
        <div class="${style.shipping}">
          <p class="mb-0">Phương thức thành toán</p>
          <p class="mb-0">${dataShipping?.method}</p>
        </div>
        <div class="${style.total}">
          <p class="mb-0">Tổng cộng</p>
          <p class="mb-0">$${dataShipping?.totalOrder}</p>
        </div>
        <div class="${style.goback}">
          <a href="/">Quay về trang chủ</a>
        </div>
      </div>
    </div>
    <div class="${style.success_right}">
      <div class="${style.success_right_top}">
        <p class="mb-0">Mã đơn hàng</p>
        <a href="">Xem hóa đơn</a>
      </div>
      <div class="${style.success_right_bottom}">
        <p class="${
					style.shipping_time
				}">Dự kiến giao hàng vào Thứ 6, 18-10-23</p>
        ${product
					.map(
						(el) => `
          <div class=${style.product}>
            <img src="${el.thumbnail}" alt="">
            <p class="${style.title}">${el.title}</p>
          </div>
        `
					)
					.join('')}
      </div>
    </div>
  </div>
  `;
	return template;
};

export default successPay;
