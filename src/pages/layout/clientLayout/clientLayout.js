import { usersAPI } from '@/api';
import { useLocalStorage } from '@/hooks';
import { useEffect, useState } from '@/utils';

const clientLayout = (page) => {
	const [user] = useLocalStorage('user', '');
	const [member, setMember] = useState();
	useEffect(async () => {
		try {
			const response = await usersAPI.getUser(user);
			setMember(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const bodyTag = document.querySelector('body');
		const userTag = document.querySelector('.header-icon');

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
			userTag.classList.add('login');
			const headImg = document.querySelector('.head-img img');
			const headInfo = document.querySelector('.head-info h3');
			const headInfoSpan = document.querySelector('.head-info span');
			headInfo.innerHTML = member?.user_fullname ? member?.user_fullname : '';
			headInfoSpan.innerHTML = member?.user_email ? member?.user_email : '';
			headImg.setAttribute(
				'src',
				member?.user_avatar
					? member?.user_avatar
					: 'https://media.istockphoto.com/id/1448474701/photo/graphic-designer-smiles-as-she-works-on-a-laptop-in-an-office.webp?b=1&s=612x612&w=0&k=20&c=JFR5nH-aKvlKWR9H9zj6ml6bH5vyR7N_t-MxvBbJexs='
			);
		} else {
			userTag.classList.remove('login');
		}
		//

		//
	});
	return `
    ${page}
  `;
};

export default clientLayout;
