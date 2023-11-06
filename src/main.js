import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'sweetalert2/src/sweetalert2.scss';

import { render, router } from './utils';
import { clientLayout, adminLayout } from './pages/layout';
import {
	about,
	cart,
	checkout,
	detail,
	homepage,
	invoice,
	member,
	shop,
	signIn,
	signUp,
	successPay,
} from './pages/client';
import {
	category,
	categoryAdd,
	categoryEdit,
	dashboard,
	products,
	productsAdd,
	productsEdit,
	user,
	userAdd,
	userEdit,
	orderAdmin,
	detailOrder,
	chart,
} from './pages/admin';
import {
	home,
	order,
	account,
	changePass,
	detailOrder as memberdetailOrder,
} from './pages/client/member/components';

const app = document.querySelector('#app');

router.on('/', () => {
	render(() => clientLayout(homepage()), app);
	setActiveNavLink(0);
});
router.on('/about', () => {
	render(() => clientLayout(about()), app);
	setActiveNavLink(1);
});
router.on('/shop', () => {
	render(() => clientLayout(shop()), app);
	setActiveNavLink(2);
});
router.on({
	'/cart': () => {
		render(() => clientLayout(cart()), app);
		setActiveNavLink(3);
	},
	'/cart&checkout': () => {
		render(() => clientLayout(checkout()), app);
	},
	'/cart/checkout/success': () => {
		render(() => clientLayout(successPay()), app);
	},
	'/cart/invoice': () => {
		render(() => clientLayout(invoice()), app);
	},
});

router.on({
	'/product=:id': ({ data }) => {
		render(() => clientLayout(detail(data)), app);
	},
});

router.on({
	'/member': () => render(() => clientLayout(member(home())), app),
	'/member/order': () => render(() => clientLayout(member(order())), app),
	'/member/account': () => render(() => clientLayout(member(account())), app),
	'/member/changePass': () =>
		render(() => clientLayout(member(changePass())), app),
	'/member/detailorder/:id': ({ data }) =>
		render(() => clientLayout(member(memberdetailOrder(data))), app),
});

router.on('/login', () => render(() => clientLayout(signIn()), app));
router.on('/signup', () => render(() => clientLayout(signUp()), app));
router.on('/logout', () => {
	localStorage.removeItem('user');
	localStorage.removeItem('id');
	router.navigate('/');
});

// admin

router.on({
	'/admin': () => {
		render(() => adminLayout(dashboard()), app);
	},
	'/admin/products': () => {
		render(() => adminLayout(products()), app);
	},
	'/admin/products/add': () => {
		render(() => adminLayout(productsAdd()), app);
	},
	'/admin&productsEdit=:id': ({ data }) => {
		render(() => adminLayout(productsEdit(data)), app);
	},
	'/admin&categories': () => {
		render(() => adminLayout(category()), app);
	},
	'/admin&categoriesAdd': () => {
		render(() => adminLayout(categoryAdd()), app);
	},
	'/admin&categoriesEdit=:id': ({ data }) => {
		render(() => adminLayout(categoryEdit(data)), app);
	},
	'/admin/user': () => {
		render(() => adminLayout(user()), app);
	},
	'/admin/user/add': () => {
		render(() => adminLayout(userAdd()), app);
	},
	'admin/user/edit/:id': ({ data }) => {
		render(() => adminLayout(userEdit(data)), app);
	},
	'admin/order': () => {
		render(() => adminLayout(orderAdmin()), app);
	},
	'/admin/detail_order/:id': ({ data }) => {
		render(() => adminLayout(detailOrder(data)), app);
	},
	'/admin/chart': () => {
		render(() => adminLayout(chart()), app);
	},
});

router.resolve();

//-- handle active header --//

function setActiveNavLink(index) {
	var navLinks = document.querySelectorAll('.header-menu li');
	// Xóa active
	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].classList.remove('active');
	}
	// Thêm active
	navLinks[index].classList.add('active');
}
