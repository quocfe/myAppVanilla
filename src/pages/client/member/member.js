import * as style from './style.module.css';

const member = (page) => {
	const template = `
    <div class="member container"> 
      <div class="row"> 
        <div class="${style.member_sidebar} col-lg-3">
          <ul class="p-4"> 
            <li><a href="/member">Trang chủ</a></li>
            <li><a href="/member/order">Lịch sử mua hàng</a></li>
            <li><a href="/member/changePass">Đổi mật khẩu</a></li>
            <li><a>Tra cứu bảo hành</a></li>
            <li><a>Ưu đãi của bạn</a></li>
            <li><a href="/member/account">Tài khoản của bạn</a></li>
            <li><a>Đăng xuất</a></li>
          </ul>
        </div>
        <div class="${style.member_content} col-lg-9"> ${page} </div>
      </div>
    </div>
  `;
	return template;
};

export default member;
