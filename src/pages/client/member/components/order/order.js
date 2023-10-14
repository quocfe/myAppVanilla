import * as style from './style.module.css';

const order = () => {
	const template = `
    <div class="${style.order}">
      <div class="${style.heading}">
        <p>Lịch sử mua hàng</p>
        <span>
          Tổng số đơn hàng : <strong>6</strong> đơn
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
            <ul class="mb-0">
              <li class="time">
                <p class="mb-0">2023-08-12</p>
              </li>
              <li>73</li>
              <li>6,975,000VNĐ</li>
              <li style="color: #DC3545 ">Đã hủy</li>
              <li>
                <a href="">Chi tiết</a>
              </li>
            </ul>
            <ul class="mb-0">
              <li class="time">
                <p class="mb-0">2023-08-12</p>
              </li>
              <li>73</li>
              <li>6,975,000VNĐ</li>
              <li style="color: #DC3545 ">Đã hủy</li>
              <li>
                <a href="">Chi tiết</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
	return template;
};

export default order;
