import { useEffect } from '@/utils';
import * as style from './style.module.css';

const changePass = () => {
	useEffect(() => {
		const btn = document.querySelector('.showPassBtn');
		const inputPasswords = document.querySelectorAll('.showPassword');

		btn.addEventListener('click', () => {
			inputPasswords.forEach((input) => {
				if (input.type == 'password') {
					input.type = 'text';
				} else {
					input.type = 'password';
				}
			});
		});
	});

	const template = `
    <form class="${style.change_password} form_change form" action="" method="post">
        <div class="${style.form_group}">
          <label for="">Mật khẩu cũ</label>
          <input type="password" name="old_pass" class="showPassword" value="" fdprocessedid="ikk0bc">
          <span class="${style.message}"></span>
        </div>
        <div class="${style.form_group}">
          <label for="">Mật khẩu mới</label>
          <input type="password" class="showPassword" name="new_pass" fdprocessedid="tn0bu">
          <span class="${style.message}"></span>
        </div>
        <div class="${style.form_group}">
          <label for="">Xác nhận mật khẩu mới</label>
          <input type="password" class="showPassword" name="pass_confirm" fdprocessedid="mh0vu">
          <span class="${style.message}"></span>
        </div>
        <div class="showPass">
          <input id="showPass" type="checkbox">
          <label for="showPass" class="showPassBtn">Hiển thị mật khẩu</label>
        </div>
        <button type="submit" name="change_password" class="${style.btn_change}" fdprocessedid="4abedl">Đổi mật khẩu</button>
    </form>  
  `;
	return template;
};

export default changePass;
