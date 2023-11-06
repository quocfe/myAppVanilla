import { useEffect, useState } from '@/utils';
import { useLocalStorage } from '@/hooks';
import { usersAPI } from '@/api';
import { toast } from '@/components';
import { Validator } from '@/lib';

const changePass = () => {
	const [userLocal] = useLocalStorage('user', '');
	const [user, setUser] = useState([]);
	useEffect(async () => {
		try {
			const response = await usersAPI.getUser(userLocal);
			setUser(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		Validator({
			form: '#form_change_pass',
			errorMessage: 'form-message',
			rules: [
				Validator.isRequired('#old_password'),
				Validator.isRequired('#password'),
				Validator.isRequired('#pass_confrim'),
				Validator.isMinLength('#password', 6),
				Validator.isPasswordConfirm(
					'#pass_confrim',
					() => document.querySelector('#password').value
				),
				Validator.isPasswordConfirm('#old_password', () => user.user_password),
			],
			onsubmit: async (data) => {
				const { old_password, password } = data;
				if (old_password == password) {
					toast({
						title: 'Thất bại',
						message: 'Mật khẩu mới phải khác mật khẩu cũ!',
						type: 'error',
						show: true,
					});
				} else {
					const dataUser = {
						id: userLocal,
						user_password: password,
					};
					try {
						await usersAPI.updateUser(dataUser);
						toast({
							title: 'Thành công',
							message: 'Đổi mật khẩu thành công!',
							type: 'success',
							show: true,
						});
						document.querySelector('#old_password').value = '';
						document.querySelector('#password').value = '';
						document.querySelector('#pass_confrim').value = '';
					} catch (error) {
						console.log(error);
					}
				}
			},
		});
	});

	const template = `
<form method="post" id="form_change_pass" class="form w-50 m-auto">
	<!-- old_password input -->
	<div class="form-outline form-group login-form mb-3">
		<label class="form-label" for="old_password">Mật khẩu cũ</label>
			<input
				type="password"
				id="old_password"
				name="old_password"
				class="form-control form-control-lg mb-1 showPassword"
				placeholder="************"
			/>
			<span class="form-message"></span>
	</div>

	<!-- Password input -->
	<div class="form-outline form-group login-form mb-3">
	<label class="form-label" for="password">Mật khẩu mới</label>
		<input
			type="password"
			id="password"
			name="password"
			class="form-control form-control-lg mb-1 showPassword"
			placeholder="************"
		/>
		<span class="form-message"></span>
	</div>

		<!-- Password Confirm input -->
	<div class="form-outline form-group login-form mb-3">
		<label class="form-label" for="pass_confrim">Nhập lại mật khẩu </label>
			<input
				type="password"
				id="pass_confrim"
				name="pass_confrim"
				class="form-control form-control-lg mb-1 showPassword"
				placeholder="************"
			/>
			<span class="form-message"></span>
	</div>

	<div class="d-flex form-group justify-content-between align-items-center">
		<!-- Checkbox -->
		<div class="showPass mb-0">
			<input id="showPass" type="checkbox">
			<label for="showPass" class="showPassBtn">Hiển thị mật khẩu</label>
		</div>
	</div>

	<div class="text-center text-lg-start mt-4 pt-2">
		<button
			type="submit"
			class="btn btn-primary btn-lg"
			style="padding-left: 2.5rem; padding-right: 2.5rem"
		>
			Đổi mật khẩu
		</button>
	</div>
</form>
  `;
	return template;
};

export default changePass;

// <form class="${style.change_password} form_change method="post">
// 		<div class="${style.form_group}">
// 			<label for="">Mật khẩu cũ</label>
// 			<input type="password" name="old_pass" id="oldPass" class="showPassword" value="" fdprocessedid="ikk0bc">
// 			<span class="${style.message}"></span>
// 		</div>
// 		<div class="${style.form_group}">
// 			<label for="">Mật khẩu mới</label>
// 			<input type="password" class="showPassword" id="newPass" name="new_pass" fdprocessedid="tn0bu">
// 			<span class="${style.message}"></span>
// 		</div>
// 		<div class="${style.form_group}">
// 			<label for="">Xác nhận mật khẩu mới</label>
// 			<input type="password" class="showPassword" id="newPassConfrim" name="pass_confirm" fdprocessedid="mh0vu">
// 			<span class="${style.message}"></span>
// 		</div>
// 		<div class="showPass mb-4 user-select-none">
// 			<input id="showPass" type="checkbox">
// 			<label for="showPass" class="showPassBtn">Hiển thị mật khẩu</label>
// 		</div>
// 		<button type="submit" name="change_password" class="${style.btn_change}" fdprocessedid="4abedl">Đổi mật khẩu</button>
// </form>
