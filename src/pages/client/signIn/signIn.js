import usersAPI from '@/api/usersApi';
import { toast } from '@/components';
import { useLocalStorage } from '@/hooks';
import { Validator } from '@/lib';
import { router, useEffect, useState } from '@/utils';

const signIn = () => {
	const [users, setUsers] = useState([]);
	const [userLocal, setUserLocal] = useLocalStorage('user', {});

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
			form: '#signin',
			errorMessage: 'form-message',
			rules: [
				Validator.isRequired('#email'),
				Validator.isEmail('#email'),
				Validator.isRequired('#password'),
				Validator.isMinLength('#password', 6),
				// Validator.isStrongPass("#password")
			],
			onsubmit: (data) => {
				const { email, password } = data;
				const user = users.filter((user) => user.user_email === email);
				let emailEmpty = users.some((user) => user.user_email === email);
				const [{ id, user_password }] = user;

				if (!emailEmpty) {
					toast({
						title: 'Thất bại',
						message: 'Email không tại trên hệ thống !',
						type: 'error',
						show: true,
					});
				} else {
					if (password != user_password) {
						toast({
							title: 'Thất bại',
							message: 'Mật khẩu không chính xác !',
							type: 'error',
							show: true,
						});
					} else {
						setUserLocal(id);
						router.navigate('/');
					}
				}
			},
		});
	});
	const template = `
      
      <section class="vh-100" id="signin">
        <div class="container-fluid h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid"
                alt="Sample image"
              />
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

              <a href="/" class="d-flex align-items-center justify-content-between rounded gap-2 text-white bg-primary p-2" style="width: 70px;">
                <i class="fa-solid fa-backward"></i>
                <span>Back</span>
              </a>
              <form method="post" id="signin">
                <div class="login-social">
                  <p class="mb-0 text-center mb-2">Sign in with</p>
                  <div class="social-method">
                    <button
                      type="button"
                      class="btn btn-primary btn-floating mx-1"
                    >
                      <ion-icon name="logo-facebook"></ion-icon>
                    </button>

                    <button
                      type="button"
                      class="btn btn-primary btn-floating mx-1"
                    >
                      <ion-icon name="logo-twitter"></ion-icon>
                    </button>

                    <button
                      type="button"
                      class="btn btn-primary btn-floating mx-1"
                    >
                      <ion-icon name="logo-linkedin"></ion-icon>
                    </button>
                  </div>
                </div>

                <div class="divider d-flex align-items-center my-4">
                  <p class="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <!-- Email input -->
                <div class="form-outline form-group login-form mb-4">
                  <label class="form-label" for="email">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      class="form-control form-control-lg mb-1"
                      placeholder="Enter a valid email address"
                    />
                    <span class="form-message"></span>
                </div>

                <!-- Password input -->
                <div class="form-outline form-group login-form mb-3">
                <label class="form-label" for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control form-control-lg mb-1"
                    placeholder="Enter password"
                  />
                  <span class="form-message"></span>
                </div>

                <div class="d-flex form-group justify-content-between align-items-center">
                  <!-- Checkbox -->
                  <div class="form-check mb-0 d-flex aligns-item-center">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      name="checkbox"
                      value="checked"
                      id="remember"
                    />
                    <label class="form-check-label user-select-none" for="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" class="text-body">Forgot password?</a>
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg"
                    style="padding-left: 2.5rem; padding-right: 2.5rem"
                  >
                    Login
                  </button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a href="./signup" class="link-danger">Sign Up</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  `;
	return template;
};

export default signIn;
