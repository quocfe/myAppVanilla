import { useEffect, useState } from '@/utils';
import * as style from './style.module.css';
import { orderAPI, orderDetailsAPI } from '@/api';
import { messageQuestion } from '@/components';

const OrderAdmin = () => {
	const [orders, setOrders] = useState([]);
	const [totalOrder, setTotalOrder] = useState([]);
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await orderAPI.getOrders();
				setOrders(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchOrders();
	}, []);

	useEffect(() => {
		const calculateTotalOrder = async () => {
			const totalOrderData = await Promise.all(
				orders.map(async (el) => {
					const response = await orderDetailsAPI.getOrderDetailByOrderID(el.id);
					const sumTotal = response.data.reduce(
						(accumulator, currentValue) => accumulator + currentValue.total,
						0
					);
					return {
						id: el.id,
						total: sumTotal,
					};
				})
			);
			setTotalOrder(totalOrderData);
		};

		calculateTotalOrder();
	}, [orders]);

	useEffect(() => {
		const btnHandleEdit = document.querySelectorAll('.btn_handle_edit');
		const btnHandleCancel = document.querySelectorAll('.btn_handle_cancel');
		const btnHandleUpdate = document.querySelectorAll('.btn_handle_update');
		const trTag = document.querySelectorAll('._show_edit_1nygu_17');
		const selectStatus = document.querySelectorAll('.select_value');
		const textOption = document.querySelectorAll(`.${style.text_option}`);

		const handleAdd = (index) => () => {
			trTag[index].classList.add('_edit_1nygu_17');
		};

		const handleRemove = (index) => () => {
			trTag[index].classList.remove('_edit_1nygu_17');
		};

		const handleUpdate = (index) => async () => {
			if (!(await messageQuestion('Edit status'))) return;

			const valueUpdate = {
				status: selectStatus[index].value,
			};

			const id = btnHandleUpdate[index].dataset.id;

			await orderAPI.updateOrder(id, valueUpdate);
			trTag[index].classList.remove('_edit_1nygu_17');
			textOption[index].innerHTML = selectStatus[index].value;
		};

		btnHandleEdit.forEach((btn, index) =>
			btn.addEventListener('click', handleAdd(index))
		);
		btnHandleCancel.forEach((btn, index) =>
			btn.addEventListener('click', handleRemove(index))
		);
		btnHandleUpdate.forEach((btn, index) =>
			btn.addEventListener('click', handleUpdate(index))
		);
	});

	const generateOrderRows = () => {
		return orders
			.map(
				(el) => `
      <tr class="${style.show_edit}">
        <td>${el.id}</td>
        <td>${el.user_id}</td>
        <td>${el.created_date}</td>
        <td>$${totalOrder.find((to) => to.id === el.id)?.total || 0}</td>
        <td class="${style.option_wrapper}">
          <select class="${style.status_option} select_value" name="status">
            <option value="Đã xác nhận">Đã xác nhận</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đã hủy">Hủy</option>
          </select>
          <p class="${style.text_option}">${el.status}</p>
        </td>
        <td class="d-flex justify-content-around">
          <input type="hidden" value="73" name="order_id">
          <button type="submit" data-id="${el.id}" name="updateorder" class="${
					style.btn_update_order
				} btn btn-success btn_handle_update">Cập nhật</button>
          <a style="" class="btn btn-primary ${
						style.btn_edit
					} btn_handle_edit">Sửa</a>
          <a class="${
						style.btn_cacel_order
					} btn btn-danger btn_handle_cancel">Hủy</a>
        </td>
        <td>
          <a href="/admin/detail_order/${el.id}">
            <i class="fas fa-eye" aria-hidden="true"></i>
          </a>
        </td>
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
                  <th>Mã đơn hàng</th>
                  <th>ID khách hàng</th>
                  <th>Thời gian đặt hàng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>
                    <i class="fas fa-cog" aria-hidden="true"></i>
                  </th>
                  <th><i class="fas fa-eye" aria-hidden="true"></i></th>
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

export default OrderAdmin;
