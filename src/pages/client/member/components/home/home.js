import * as style from './style.module.css';

const home = () => {
	const template = `
    <div class="${style.content}">
      <div class="${style.box_welcome}">
        <div class="${style.top}">
          <div class="${style.avatar}">
            <img src="" alt="">
          </div>
          <div class="${style.infor}">
            <p>Xin chào</p>
            <br>
            <span>PhuQuocNguyen</span>
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
              <ion-icon class="${style.icon} md hydrated" name="ribbon-outline" role="img"></ion-icon>
              <p>0</p>
            </div>
          </div>
          <div class="${style.right}">
            <p>Đơn hàng của bạn</p>
            <span>6 Đơn hàng</span>
            <a href="">Xem chi tiết</a>
          </div>
        </div>
      </div>
    </div>    
  `;
	return template;
};

export default home;
