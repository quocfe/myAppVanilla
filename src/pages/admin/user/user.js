/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from '@/utils';
import * as style from './style.module.css';
import { usersAPI } from '@/api';
import { messageQuestion } from '@/components';

const user = () => {
	const [member, setMember] = useState([]);
	useEffect(async () => {
		try {
			const response = await usersAPI.getUsers();
			setMember(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		const btnDisables = document.querySelectorAll('.btnClick');
		btnDisables.forEach((btnDisable, index) => {
			btnDisable.addEventListener('click', async () => {
				if (!(await messageQuestion('Update user'))) return;
				const newActive = member[index].active === 0 ? 1 : 0;
				const dataUser = {
					id: member[index].id,
					active: newActive,
				};
				try {
					await usersAPI.updateUser(dataUser);
					location.reload();
				} catch (error) {
					console.log(error);
				}
			});
		});
	});

	const template = `
      <div class="main">
        <div class="container-fluid">
          <div class="card w-80 mx-auto mt-5 overflow-hidden">
            <div class=${style.card_body}>
              <table class="table mb-0" >
                <thead class="thead-dark">
                  <tr class="thead-dark-top text-center">
                    <th>ID</th>
                    <th>Tên đăng nhập</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>vai trò</th>
                    <th>Hoạt động</th>
                    <th>Sửa</th>
                    <th>Vô hiệu hóa</th>
                  </tr>
                </thead>
                <tbody class=${style.body}>
                  ${member
										.map(
											(el) => `
                      <tr class="text-center">
                        <td>${el.id}</td>
                        <td>${el.user_name}</td>
                        <td>${
													el.user_fullname ? el.user_fullname : 'Họ tên'
												}</td>
                        <td>${el.user_email ? el.user_email : 'Họ tên'}</td>
                        <td>${el.role}</td>
                        <td>${el.active}</td>
                        <td>
                          <a href="/admin/user/edit/${
														el.id
													}" type="button" class="btn btn-primary">Sửa</a>
                        </td>
                          <td>
                            <input ${
															el.active === 0
																? `class="btn btn-success btnEnable btnClick" value="Kích hoạt" ${
																		el.role === 0 ? 'disabled' : ''
																  }`
																: `class="btn btn-danger btnDisable btnClick" value="Vô hiệu hóa" ${
																		el.role === 0 ? 'disabled' : ''
																  }`
														}  type="button" />
                          </td>
                      </tr>
                  `
										)
										.join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  `;
	return template;
};

export default user;
