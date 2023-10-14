import { updateImgApi, usersAPI } from '@/api';
import { messageQuestion } from '@/components';
import { router, useEffect } from '@/utils';

const userAdd = () => {
	useEffect(() => {
		const form = document.querySelector('.form');
		const username = document.querySelector('#user_name');
		const password = document.querySelector('#password');
		const fullname = document.querySelector('#fullname');
		const email = document.querySelector('#email');
		const roleSelect = document.querySelector('#role-select');
		const roleValue = roleSelect.options[roleSelect.selectedIndex].value;
		const activeSelect = document.querySelector('#active-select');
		const activeValue = activeSelect.options[activeSelect.selectedIndex].value;
		const genderMember = document.querySelector('#gender-select');
		const genderValue = genderMember.options[genderMember.selectedIndex].value;
		const avatarMember = document.querySelector('#avatar-member');
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			const urlImg = await handleUploadFile(avatarMember.files);
			console.log(urlImg);
			const dataUser = {
				user_name: username.value,
				user_fullname: fullname.value,
				user_password: password.value,
				user_email: email.value,
				user_avatar: urlImg ? urlImg : '',
				gender: genderValue,
				role: roleValue,
				active: activeValue,
			};
			try {
				if (!(await messageQuestion('Add user'))) return;
				await usersAPI.addUser(dataUser);
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
            value=""
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
            <option value="1">Người dùng</option>
            <option value="0">Admin</option>
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
            <option value="1">Kích hoạt</option>
            <option value="0">Chưa kích hoạt</option>
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
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
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
          <span class="message"> </span>

        </div>
      </div>
    </div>
    <button class="btn btn-primary">Add member</button>
  </form>
</div>

  `;

	return template;
};

export default userAdd;
