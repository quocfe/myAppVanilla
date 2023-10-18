import { useLocalStorage } from '@/hooks';
import * as style from './style.module.css';
import { useEffect, useState } from '@/utils';
import { orderAPI, orderDetailsAPI } from '@/api';

const order = () => {
	const [id] = useLocalStorage('user');
	const [order, setOrder] = useState([]);

	const color = (check) => {
		let valueColor = {
			'Đang xử lý': '#007BFF',
			Hủy: '#DC3545',
			'Đã xác nhận': '#28A745',
		};

		for (const key in valueColor) {
			if (check === key) {
				return valueColor[key];
			}
		}
	};

	useEffect(async () => {
		const responseOrder = await orderAPI.getOrder(`user_id=${id}`);
		const fetchData = async () => {
			const fetchDetail = await Promise.all(
				responseOrder.data.map(async (data) => {
					const { created_date, id, status } = data;
					const responseDetailOrder =
						await orderDetailsAPI.getOrderDetailByOrderID(id);
					const sumTotal = responseDetailOrder.data.reduce(
						(accumulator, currentValue) => accumulator + currentValue.total,
						0
					);
					return {
						created_date,
						id,
						sumTotal,
						status,
					};
				})
			);
			setOrder(fetchDetail);
		};
		fetchData();
	}, []);

	const renderRow = () => {
		return order
			.map(
				(el) => `
        <ul class="mb-0">
          <li class="time">
            <p class="mb-0">${el.created_date}</p>
          </li>
          <li>${el.id}</li>
          <li>$${el.sumTotal}</li>
          <li style="color: ${color(el.status)} ">${el.status}</li>
          <li>
            <a href="/member/detailorder/${el.id}">Chi tiết</a>
          </li>
        </ul>
    `
			)
			.join('');
	};
	const template = `
    <div class="${style.order}">
      <div class="${style.heading}">
        <p>Lịch sử mua hàng</p>
        <span>
          Tổng số đơn hàng : <strong>${order ? order.length : 0}</strong> đơn
        </span>
      </div>
      <div class="${style.content}">
        <div class="${style.table}">
          <div class="${style.col_head}">
            <ul class="mb-0"> 
              <li>Thời gian</li>
              <li>Mã đơn hàng</li>
              <li>Tổng tiền</li>
              <li>Trạng thái</li>
              <li></li>
            </ul>
          </div>
          <div class="${style.col_body}">
            ${renderRow()}
            
          </div>
        </div>
      </div>
    </div>
  `;
	return template;
};

export default order;
