import usersAPI from '@/api/usersApi';
import { toast } from '@/components';
import { Validator } from '@/lib';
import { router, useEffect, useState } from '@/utils';

const signUp = () => {
	const [users, setUsers] = useState({});

	useEffect(async () => {
		try {
			const response = await usersAPI.getUsers();
			if (response.status === 200) {
				setUsers(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		Validator({
			form: '#signup',
			errorMessage: 'form-message',
			rules: [
				Validator.isRequired('#username'),
				Validator.isTrim('#username'),
				Validator.isRequired('#email'),
				Validator.isEmail('#email'),
				Validator.isRequired('#password'),
				Validator.isMinLength('#password', 6),
				// Validator.isStrongPass("#password"),
				Validator.isRequired('#passwordconfirm'),
				Validator.isPasswordConfirm(
					'#passwordconfirm',
					() => document.querySelector('#password').value
				),
			],
			onsubmit: async (data) => {
				console.log(data);
				const { username, passwordconfirm, email } = data;
				let mailsLocal = [];
				users.forEach((user) => {
					mailsLocal.push(user.user_email);
				});

				const emailExits = mailsLocal.filter(
					(mailLocal) => mailLocal === email
				);
				if (emailExits.length != 0) {
					toast({
						title: 'Thất bại',
						message: 'Email đã tồn tại trên hệ thống!',
						type: 'error',
						show: true,
					});
				} else {
					let userData = {
						user_name: username,
						user_fullname: '',
						user_password: passwordconfirm,
						user_email: email,
						user_avatar: '',
					};
					try {
						await usersAPI.addUser(userData);
						toast({
							title: 'Thành công',
							message: 'Đăng ký tài khoản thành công!',
							type: 'success',
							show: true,
						});
						router.navigate('/login');
					} catch (error) {
						console.log(error);
					}
				}
			},
		});
	});

	const template = `
  <section class="vh-100" id="signup" style="background-color: #eee">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <a href="/" class="d-flex align-items-center justify-content-between rounded gap-2 text-white bg-primary p-2" style="width: 70px;">
                  <i class="fa-solid fa-backward"></i>
                  <span>Back</span>
                </a>
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>
                <form class="mx-1 mx-md-4" method="post" id="signup">
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline form-group  flex-fill mb-0">
                    <label class="form-label" for="username"
                        >UserName</label
                      >
                      <input
                        type="text"
                        id="username"
                        name="username"
                        class="form-control mb-2"
                      />
                      <span class="form-message"></span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline form-group flex-fill mb-0">
                      <label class="form-label" for="email"
                        >Email</label
                      >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        class="form-control mb-2"
                      />
                      <span class="form-message"></span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline form-group flex-fill mb-0">
                      <label class="form-label" for="password"
                        >Password</label
                      >
                      <input
                        type="password"
                        id="password"
                        name"password"
                        class="form-control mb-2"
                      />
                      <span class="form-message"></span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline form-group flex-fill mb-0">
                      <label class="form-label" for="passwordconfirm"
                        >Repeat your password</label
                      >
                      <input
                        type="password"
                        id="passwordconfirm"
                        name="passwordconfirm"
                        class="form-control mb-2"
                      />
                      <span class="form-message"></span>
                    </div>
                  </div>

                  <p class="form-check small fw-bold mt-2 pt-1 mb-2">
                    You have an account?
                    <a href="/login" class="link-danger">Login</a>
                  </p>

                  <div
                    class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                  >
                    <button type="submit" class="btn btn-primary btn-lg">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
              <div
                class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid"
                  alt="Sample image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  `;
	return template;
};

export default signUp;
