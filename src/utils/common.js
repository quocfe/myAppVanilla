import { productAPI } from '@/api';

function debounce(func, delay) {
	let timeoutId;
	return function (...args) {
		const context = this;
		clearTimeout(timeoutId);

		timeoutId = setTimeout(function () {
			func.apply(context, args);
		}, delay);
	};
}

// update quatity local
const messages = document.querySelectorAll('.message p');
const quatity = JSON.parse(localStorage.getItem('id'));
messages.forEach((message) => {
	message.innerText = quatity?.length ?? 0;
});

// scroll header

const header = document.querySelector('.header-navigation');
const search1 = document.querySelector('.search-form-1');

window.addEventListener('scroll', () => {
	const currentScroll = window.scrollY;
	if (currentScroll > 150) {
		header.classList.add('sticky');
	} else {
		header.classList.remove('sticky');
	}
	if (header.classList.contains('sticky')) {
		search1.style.display = 'none';
	}
});

//

// search toggle

const searchBtns = document.querySelectorAll('.search-btn');
const inputSearchs = document.querySelectorAll('.inputSearch');
const searchResult = document.querySelector('.search-result');

searchBtns.forEach((searchBtn) => {
	searchBtn?.addEventListener('click', (e) => {
		const searchForm = e.currentTarget.parentElement;
		searchForm.classList.toggle('show');
	});
});

// handle search

inputSearchs.forEach((btn) => {
	btn.addEventListener(
		'keyup',
		debounce(async () => {
			let query = btn.value.trim();
			try {
				const response = await productAPI.getProductMuti(`q=${query}`);

				const template = response.data.length
					? response.data
							.map(
								(el) => `
							<li class="search-result-inner">
								<a href="/product=${el.id}">${el.title}</a>
							</li>
						`
							)
							.join('')
					: `
        <li class="search-result-inner">Không tồn tại</li>
      `;
				if (query) {
					searchResult.classList.add('active');
					searchResult.innerHTML = template;
				} else {
					searchResult.classList.remove('active');
					searchResult.innerHTML = '';
				}
				if (searchResult.classList.contains('active')) {
					window.addEventListener('click', (e) => {
						if (
							!e.target.classList.contains('search-result') &&
							!e.target.classList.contains('search-result-inner') &&
							!e.target.classList.contains('form-control')
						) {
							searchResult.classList.remove('active');
							btn.value = '';
						}
					});
				}
			} catch (error) {
				console.log(error);
			}
		}, 300)
	);
});

// show menu-user

const userIconTags = document.querySelectorAll('.icon-user');
userIconTags.forEach((userIconTag) => {
	if (userIconTag.classList.contains('show')) {
		userIconTag.classList.remove('show');
	}
});
userIconTags.forEach((userIconTag) => {
	userIconTag.addEventListener('click', function () {
		if (this.classList.contains('show')) {
			this.classList.remove('show');
		} else {
			this.classList.add('show');
		}
	});
});
