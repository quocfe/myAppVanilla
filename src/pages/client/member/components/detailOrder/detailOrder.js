import * as style from './style.module.css';
import { useEffect, useState } from '@/utils';
import { orderAPI, orderDetailsAPI, productAPI, shippingApi } from '@/api';

const detailOrder = ({ id }) => {
	const [productDetails, setProductDetails] = useState([]);
	const [infortDetails, setInforDetails] = useState([]);

	useEffect(() => {
		const fetchDataDetailOrder = async () => {
			const responseDetail = await orderDetailsAPI.getOrderDetailByOrderID(id);

			await Promise.all(
				responseDetail.data.map(async (data) => {
					const { quantity, total, product_id, orders_id } = data;
					const responseProduct = await productAPI.getProduct(product_id);
					const responseOrder = await orderAPI.getOrder(`id=${orders_id}`);
					const { created_date, user_phone_number, status } =
						responseOrder.data[0];
					const { title, thumbnail } = responseProduct.data;
					let responseShipping = await shippingApi.getShipping(orders_id);
					const { username, address } = responseShipping.data[0];
					const productDetailsData = {
						thumbnail,
						title,
						quantity,
						total,
					};
					const inforDetail = {
						orders_id,
						username,
						address,
						created_date,
						user_phone_number,
						status,
					};
					setProductDetails((prev) => [...prev, productDetailsData]);
					setInforDetails(inforDetail);
				})
			);
		};

		fetchDataDetailOrder();
	}, []);

	const renderInforProduct = () => {
		return productDetails
			.map(
				(el) => `
    <div class="${style.item}">
        <div class="${style.img}">
          <img src="${el.thumbnail}" alt="">
        </div>
        <div class="${style.infor}">
          <a href="">${el.title}</a>
        </div>
        <div class="quantity">
          <p>x<span>${el.quantity}</span></p>
        </div>
        <div class="total">
          $${el.total}
        </div>
    </div>
    `
			)
			.join('');
	};

	const {
		orders_id,
		username,
		address,
		created_date,
		user_phone_number,
		status,
	} = infortDetails;
	const sumTotal = productDetails.reduce((prev, next) => prev + next.total, 0);

	const handleStatus = () => {
		let valueColor = {
			'Đang xử lý': '#007BFF',
			Hủy: '#DC3545',
			'Đã xác nhận': '#28A745',
		};

		for (const value in valueColor) {
			if (value === status) {
				const aTag = `<a style="background-color: ${valueColor[status]}" class="btn-primary btnEdit status_btn">Trạng thái đơn hàng: ${value}</a>`;
				return aTag;
			}
		}
	};

	return `<div class="detai_order">
  <div class="${style.detai_order_top} detailTop">
    <h3>Chi tiết đơn hàng #<span>${orders_id}</span></h3>
		${handleStatus()}
  </div>
  <div class="${style.detai_order_body}">
    <div class="${style.col}">
      <p  class="${style.header}">Thông tin đơn hàng</p>
      <div  class="${style.main}">
        <p>Mã đơn hàng #<span>${orders_id}</span></p>
        <p>Ngày tạo: <span>${created_date}</span></p>
        <p>Tổng giá trị sản phẩm:
          <span class="fs-5 fw-bolder">$${sumTotal}</span>
        </p>
      </div>
    </div>
    <div class="${style.col}">
      <p  class="${style.header}">Thông tin người nhận</p>
      <div  class="${style.main}">
        <p>Họ tên: <span>${username}</span></p>
        <p>Địa chỉ: <span>${address}</span></p>
        <p>SĐT: <span>${user_phone_number}</span></p>
      </div>
    </div>
  </div>
  <div  class="${style.detai_order_bottom}">
      ${renderInforProduct()}
  </div>
</div>`;
};

export default detailOrder;
