import { updateImgApi, usersAPI } from '@/api';
import * as style from './style.module.css';
import { useLocalStorage } from '@/hooks';
import { useEffect, useState } from '@/utils';
import { messageQuestion } from '@/components';

const account = () => {
	const [userLocal] = useLocalStorage('user');
	const [user, setUser] = useState({});

	useEffect(async () => {
		try {
			const response = await usersAPI.getUser(userLocal);
			setUser(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const formAccount = document.querySelector(`.${style.form_account}`);
		const formBtn = document.querySelector(`.${style.account_btn} `);
		const editBtn = document.querySelector(`.${style.edit}`);
		const cancelBtn = document.querySelector(`.${style.cancel}`);
		const updateBtn = document.querySelector(`.${style.update}`);
		const avatar = document.querySelector(`.${style.account_head_img} img`);
		const editImgBtn = document.querySelector('.btn_editImg');
		const file = document.querySelector('#file');
		const headerImg = document.querySelector('.header-icon img');

		editBtn.addEventListener('click', () => {
			formAccount.classList.add(`${style.show}`);
			formBtn.classList.add(`${style.show}`);
		});
		cancelBtn.addEventListener('click', () => {
			formAccount.classList.remove(`${style.show}`);
			formBtn.classList.remove(`${style.show}`);
		});

		updateBtn.addEventListener('click', async (e) => {
			e.preventDefault();
			let fullname = document.querySelector('#fullname').value;
			let email = document.querySelector('#email').value;
			let gender = +document.querySelector('#gender').value;
			const dataUser = {
				id: userLocal,
				user_fullname: fullname,
				user_email: email,
				gender,
			};
			if (!(await messageQuestion('Update'))) return;
			await usersAPI.updateUser(dataUser);
			formAccount.classList.remove(`${style.show}`);
			formBtn.classList.remove(`${style.show}`);
			document.querySelector('.label_fullname').innerHTML =
				dataUser.user_fullname;
			document.querySelector('.label_gender').innerHTML =
				gender === 1 ? 'Nam' : 'Nữ';
		});

		editImgBtn.addEventListener('click', async (e) => {
			e.preventDefault();
			if (!(await messageQuestion('Update Image'))) return;
			const urlImg = await handleUploadFile(file.files);
			const data = {
				id: userLocal,
				user_avatar: urlImg,
			};
			try {
				await usersAPI.updateUser(data);
				avatar.setAttribute('src', data.user_avatar);
				headerImg.setAttribute('src', data.user_avatar);
			} catch (error) {
				console.log(error);
			}
		});

		const handleUploadFile = async (file) => {
			try {
				const response = await updateImgApi.updateImg(file[0]);
				return response.data.secure_url;
			} catch (error) {
				console.log(error);
			}
		};
	});

	const { user_name, user_fullname, user_email, gender, user_avatar } = user;

	const template = `
      <form method="post" id="changeInfor" enctype="multipart/form-data">
        <div class="account">
          <div class="${style.account_head}">
            <div class="${style.account_head_img}">
              <img src=${
								user_avatar
									? user_avatar
									: '	https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg'
							} alt="">
            </div>
            
              <div class="${style.form_img}">
                <div class="${style.btn_change_img}">
                  <input class="custom-file-input" name="img" type="file" id="file" >
                  <label for="file">Sửa ảnh đại diện</label>
                </div>
                <div class="message" style="margin-top: 20px;"></div>
                <button type="submit" class="btn_editImg" name="edit_img" fdprocessedid="hbjx2">Sửa</button>
              </div>
            
          </div>
          <div class="account_info">
            <h4 class="${style.account_info_head}">
              Thông tin cá nhân
            </h4>
            <div class="${style.account_info_main}">
              <div class="${style.form_account}">
                <div class="${style.form_group}">
                  <label for="">Họ tên</label>
                  <input type="text" name="fullname" id="fullname" value="${
										user_fullname ? user_fullname : ''
									}">
                  <p class="label_fullname">${
										user_fullname ? user_fullname : ''
									}</p>
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
                  <input type="text" name="email" id="email" value="${
										user_email ? user_email : ''
									}">
                  <p >${user_email ? user_email : ''}</p>
                </div>
                <div class="${style.form_group}">
                  <label for="">Giới tính</label>
                  <select name="gender" id="gender">
                    <option value="1" ${
											gender === 1 ? 'selected' : ''
										}>Nam</option>
                    <option value="0" ${
											gender === 0 ? 'selected' : ''
										}>Nữ</option>
                  </select>
                  <p class="label_gender">${gender === 1 ? 'Nam' : 'Nu'}</p>
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
