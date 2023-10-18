import { useLocalStorage } from '@/hooks';
import * as style from './style.module.css';
import { useEffect, useState } from '@/utils';
import { orderAPI, usersAPI } from '@/api';

const home = () => {
	const [id] = useLocalStorage('user');
	const [user, setUser] = useState([]);
	const [quantityOrder, setQuantityOrder] = useState();

	useEffect(async () => {
		try {
			const response = await usersAPI.getUser(id);
			const responseOrder = await orderAPI.getOrder(`user_id=${id}`);
			setQuantityOrder(responseOrder.data.length);
			setUser(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);
	const { user_fullname, user_avatar } = user;
	const template = `
    <div class="${style.content}">
      <div class="${style.box_welcome}">
        <div class="${style.top}">
          <div class="${style.avatar}">
            <img src="${
							user_avatar
								? user_avatar
								: '	https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg'
						}" alt="">
          </div>
          <div class="${style.infor}">
            <p>Xin chào</p>
            <br>
            <span>${user_fullname ? user_fullname : 'Full Name'}</span>
          </div>
        </div>
        <div class="${style.bottom}">
          <div class="${style.left}">
            <div class="${style.content_welcome}">
              <p>Ngày tham gia</p>
              <ion-icon class="icon md hydrated" name="calendar-outline" role="img"></ion-icon>
              <p>20/2/2020</p>
            </div>
            <div class="${style.content_welcome}">
              <p>Hạng thành viên</p>
              <ion-icon class="icon md hydrated" name="trophy-outline" role="img"></ion-icon>
              <p>20/2/2020</p>
            </div>
            <div class="${style.content_welcome}">
              <p>Điểm tích lũy</p>
              <ion-icon class="${
								style.icon
							} md hydrated" name="ribbon-outline" role="img"></ion-icon>
              <p>0</p>
            </div>
          </div>
          <div class="${style.right}">
            <p>Đơn hàng của bạn</p>
            <span>${quantityOrder ? quantityOrder : 0} Đơn hàng</span>
            <a href="/member/order">Xem chi tiết</a>
          </div>
        </div>
      </div>
    </div>    
  `;
	return template;
};

export default home;
