import { usersAPI } from '@/api';
import { useLocalStorage } from '@/hooks';
import { useEffect, useState } from '@/utils';

const clientLayout = (page) => {
	const [user] = useLocalStorage('user', '');
	const [member, setMember] = useState([]);
	// const { role } = member;
	useEffect(async () => {
		try {
			const response = await usersAPI.getUser(user);
			setMember(response.data);
		} catch (error) {
			console.log(error);
		}
	}, [user]);

	useEffect(() => {
		const bodyTag = document.querySelector('body');
		const userTags = document.querySelectorAll('.icon-user');

		if (
			document.querySelector('#signin') ||
			document.querySelector('#signup') ||
			document.querySelector('#admin') ||
			document.querySelector('#invoice') ||
			document.querySelector('#success')
		) {
			bodyTag.querySelector('header').style.display = 'none';
			bodyTag.querySelector('footer').style.display = 'none';
		} else {
			bodyTag.querySelector('header').style.display = 'block';
			bodyTag.querySelector('footer').style.display = 'block';
		}
		//
		if (user) {
			// --- add img -- //
			userTags.forEach((userTag) => {
				userTag.classList.add('login');
			});
			const imgUsers = document.querySelectorAll('.img-user');
			const headImgs = document.querySelectorAll('.head-img img');

			const headInfors = document.querySelectorAll('.head-info h3');
			const headInfoSpans = document.querySelectorAll('.head-info span');
			headInfors.forEach((headInfo) => {
				headInfo.innerHTML = member?.user_name ? member?.user_name : 'my name';
			});
			headInfoSpans.forEach((headInfoSpan) => {
				headInfoSpan.innerHTML = member?.user_email
					? member?.user_email
					: 'abc@gmail.com';
			});
			imgUsers.forEach((imgUser) => {
				imgUser.setAttribute(
					'src',
					member?.user_avatar
						? member?.user_avatar
						: 'https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg'
				);
			});
			headImgs.forEach((headImg) => {
				headImg.setAttribute(
					'src',
					member?.user_avatar
						? member?.user_avatar
						: 'https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg'
				);
			});
			// -- //
		} else {
			userTags.forEach((userTag) => {
				userTag.classList.remove('login');
			});
		}
		//

		//
	});

	useEffect(() => {
		//-- handle view passs --///
		const btnPassShow = document.querySelector('.showPassBtn');
		const inputPasswords = document.querySelectorAll('.showPassword');

		btnPassShow?.addEventListener('click', () => {
			inputPasswords?.forEach((input) => {
				if (input.type === 'password') {
					input.type = 'text';
				} else {
					input.type = 'password';
				}
			});
		});
		// ---- //
	});

	// useEffect(() => {
	// 	const parent = document.querySelector('.user-menu');
	// 	const child = parent.querySelectorAll('ul');
	// 	if (member.role === 0) {
	// 		console.log('test trang');
	// 		const adminPage = `
	// 		<ul class="user-item">
	// 			<li><a href="/admin">Trang quản trị</a></li>
	// 		</ul>
	// 		`;
	// 		child[0].insertAdjacentHTML('beforeend', adminPage);
	// 	} else {
	// 		child[0].insertAdjacentHTML('beforeend', '');
	// 	}
	// });

	return `
    ${page}
  `;
};

export default clientLayout;
