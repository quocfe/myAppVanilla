import { useEffect, useState } from '@/utils';
import * as style from './style.module.css';
import { usersAPI } from '@/api';

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
                        <td>0</td>
                        <td>1</td>
                        <td>
                          <a href="/admin/user/edit/${
														el.id
													}" type="button" class="btn btn-primary">Sửa</a>
                        </td>
                          <td>
                            <a href="" type="button" class="btn btn-danger">Vô hiệu hóa</a>
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
