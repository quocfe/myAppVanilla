import { updateImgApi, usersAPI } from '@/api';
import { messageQuestion } from '@/components';
import { router, useEffect, useState } from '@/utils';

const userEdit = ({ id }) => {
	const [user, setUser] = useState({});
	console.log(user);
	useEffect(async () => {
		try {
			const response = await usersAPI.getUser(id);
			setUser(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const form = document.querySelector('.form');
		const id = document.querySelector('#id');
		const username = document.querySelector('#user_name');
		const password = document.querySelector('#password');
		const fullname = document.querySelector('#fullname');
		const email = document.querySelector('#email');
		const roleSelect = document.querySelector('#role-select');
		// const roleValue = roleSelect.options[roleSelect.selectedIndex].value;
		const activeSelect = document.querySelector('#active-select');
		// const activeValue = activeSelect.options[activeSelect.selectedIndex].value;
		const genderMember = document.querySelector('#gender-select');
		// const genderValue = genderMember.options[genderMember.selectedIndex].value;
		const avatarMember = document.querySelector('#avatar-member');
		const avatarOld = document.querySelector('#avatar-old');

		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			if (!(await messageQuestion('Update user'))) return;

			const urlImg = await handleUploadFile(avatarMember.files);
			let checkAva;

			if (avatarOld.value != urlImg && urlImg) {
				checkAva = urlImg;
			} else {
				checkAva = avatarOld.value;
			}

			const dataUser = {
				id: id.value,
				user_name: username.value,
				user_fullname: fullname.value,
				user_password: password.value,
				user_email: email.value,
				user_avatar: checkAva,
				gender: +genderMember.value,
				role: +roleSelect.value,
				active: +activeSelect.value,
			};

			try {
				await usersAPI.updateUser(dataUser);
				router.navigate('/admin/user');
			} catch (error) {
				console.log(error);
			}
		});
	});

	const handleUploadFile = async (file) => {
		try {
			const response = await updateImgApi.updateImg(file[0]);
			return response.data.secure_url;
		} catch (error) {
			console.log(error);
		}
	};

	const template = `
<div class="addProducts">
  <form class="container form" id="user_form" enctype="multipart/form-data>
    <p class="title"></p>
    <div class="row">
      <div class="col-lg-4 mb-3">
        <div class="mb-3 form-group">
          <label for="id" class="form-label"
            >ID</label
          >
          <input
            disabled
            type="text"
            class="form-control"
            id="id"
            placeholder="Auto increment"
            value=${user.id ? user.id : 'ID'}
          />
          <span class="message"> </span>
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3 form-group">
          <label for="user_name" class="form-label"
            >Tên đăng nhập</label
          >
          <input
            type="text"
            class="form-control user_name"
            id="user_name"
            placeholder=""
            value="${user.user_name ? user.user_name : 'user_name'}"
          />
          <span class="message"> </span>
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3 form-group">
          <label for="password" class="form-label"
            >Mật khẩu</label
          >
          <input
            type="text"
            class="form-control"
            id="password"
            placeholder=""
            value="${user.user_password ? user.user_password : 'user_password'}"
          />
          <span class="message"> </span>

        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3 form-group">
          <label for="fullname" class="form-label"
            >Họ tên</label
          >
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder=""
            value="${user.user_fullname ? user.user_fullname : 'user_fullname'}"
          />
          <span class="message"> </span>

        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3 form-group">
          <label for="email" class="form-label"
            >Email</label
          >
          <input
            type="text"
            class="form-control"
            id="email"
            placeholder=""
            value=${user.user_email ? user.user_email : 'user_email'}

          />
          <span class="message"> </span>

        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3 form-group">
          <label for="role" class="form-label"
            >Vai trò</label
          >
          <select class="form-select role-select" id="role-select" aria-label="">
            <option value="1" ${
							user.role === 1 ? 'selected' : ''
						}>Người dùng</option>
            <option value="0" ${
							user.role === 0 ? 'selected' : ''
						}>Admin</option>
          </select>
          <span class="message"> </span>

        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3 form-group">
          <label for="role" class="form-label"
            >Kích hoạt</label
          >
        <select class="form-select" id="active-select" aria-label="">
            <option value="1" ${
							user.active === 1 ? 'selected' : ''
						}>Kích hoạt</option>
            <option value="0" ${
							user.active === 0 ? 'selected' : ''
						}>Chưa kích hoạt</option>
        </select>
        <span class="message"> </span>

        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3 form-group">
          <label for="role" class="form-label"
            >Giới tính</label
          >
          <select class="form-select" id="gender-select" aria-label="">
            <option value="0" ${user.role === 0 ? 'selected' : ''}>Nam</option>
            <option value="1" ${user.role === 1 ? 'selected' : ''}>Nữ</option>
        </select>
        <span class="message"> </span>

        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3 form-group">
          <label for="avatar-member" class="form-label"
            >Image</label
          >
          <input
            type="file"
            class="form-control"
            id="avatar-member"
          />
          <input type="hidden" id="avatar-old" value=${
						user.user_avatar ? user.user_avatar : ' '
					} />
          <span class="message"> </span>

        </div>
      </div>
    </div>
    <button class="btn btn-primary">Update member</button>
  </form>
</div>

  `;
	return template;
};

export default userEdit;
