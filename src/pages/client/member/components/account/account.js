import { usersAPI } from '@/api';
import * as style from './style.module.css';
import { useLocalStorage } from '@/hooks';
import { useEffect, useState } from '@/utils';

const account = () => {
	const [userLocal] = useLocalStorage('user');
	const [user, setUser] = useState({});
	console.log(user);
	useEffect(async () => {
		try {
			const response = await usersAPI.getUser(userLocal);
			setUser(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);
	const { user_name, user_fullname, user_email, gender, user_avatar } = user;

	console.log(gender);

	const template = `
      <form method="post" enctype="multipart/form-data">
        <div class="account">
          <div class="${style.account_head}">
            <div class="${style.account_head_img}">
              <img src=${
								user_avatar
									? user_avatar
									: 'https://kenh14cdn.com/thumb_w/620/203336854389633024/2022/11/4/photo-6-16675562029442139900239.jpg'
							} alt="">
            </div>
            
              <div class="${style.form_img}">
                <div class="${style.btn_change_img}">
                  <input class="custom-file-input" name="img" type="file" id="file" accept="image/*">
                  <label for="file">Sửa ảnh đại diện</label>
                </div>
                <div class="message" style="margin-top: 20px;"></div>
                <button type="submit" name="edit_img" fdprocessedid="hbjx2">Sửa</button>
              </div>
            
          </div>
          <div class="account_info">
            <h4 class="${style.account_info_head}">
              Thông tin cá nhân
            </h4>
            <div class="${style.account_info_main}">
              <div class="${style.form_account} _show_1mqw7_115">
                <div class="${style.form_group}">
                  <label for="">Họ tên</label>
                  <input type="text" name="fullname" id="" value=${
										user_fullname ? user_fullname : ''
									}>
                  <p>Họ tên</p>
                </div>
                <div class="${style.form_group}">
                  <label for="">Tên đăng nhập</label>
                  <input readonly="" type="text" name="username" id="" value="${
										user_name ? user_name : ''
									}">
                  <p>${user_name ? user_name : ''}</p>
                </div>
                <div class="${style.form_group}">
                  <label for="">Email</label>
                  <input type="text" name="email" id="" value="${
										user_email ? user_email : ''
									}">
                  <p>${user_email ? user_email : ''}</p>
                </div>
                <div class="${style.form_group}">
                  <label for="">Giới tính</label>
                  <select name="gender" id="">
                    <option value="Nam" ${
											gender === 1 ? 'selected' : ''
										}>Nam</option>
                    <option value="Nữ" ${
											gender === 2 ? 'selected' : ''
										}>Nữ</option>
                  </select>
                  <p>${gender === 1 ? 'Nam' : 'Nu'}</p>
                </div>
                <div class="${style.form_group}">
                  <label for="">Địa chỉ</label>
                  <input type="text" name="address" id="" value="Liên Chiểu, Đà Nẵng">
                  <p>Liên Chiểu, Đà Nẵng</p>
                </div>
              </div>
            </div>
          </div>
          <div class="${style.account_btn} ">
            <a class="${style.edit}">Chỉnh sửa thông tin</a>
            <a class="${style.cancel} ">Hủy</a>
            <button type="submit" name="update" class="${
							style.update
						}">Cập nhật thông tin</button>
          </div>
        </div>
      </form>
  `;
	return template;
};

export default account;

//** class="${style.form_account} _show_1mqw7_115" show edit  */
