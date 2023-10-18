import {
	orderAPI,
	orderDetailsAPI,
	productAPI,
	provinceApi,
	shippingApi,
	usersAPI,
} from '@/api';
import { messageQuestion } from '@/components';
import { useLocalStorage } from '@/hooks';
import { Validator } from '@/lib';
import { router, useEffect, useState } from '@/utils';
import getCurrentDay from '@/utils/fn';

const checkout = () => {
	const [products, setProducts] = useState([]);
	const [user, setUser] = useState({});
	const [idLocal] = useLocalStorage('id', []);
	const [userLocal] = useLocalStorage('user');
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);

	useEffect(async () => {
		const currentID = idLocal ?? '';
		let uniqueArrayID = new Set();
		let newArrPrd = [];
		for (const id of currentID) {
			if (!uniqueArrayID.has(id)) {
				try {
					const response = await productAPI.getProduct(id);
					newArrPrd.push(response.data);
					uniqueArrayID.add(id);
				} catch (error) {
					console.log(error);
				}
			}
		}
		try {
			const response = await usersAPI.getUser(userLocal);
			setUser(response.data);
		} catch (error) {
			console.log(error);
		}
		setProducts(newArrPrd);
	}, []);

	// get list Provinces, District, Ward
	useEffect(async () => {
		try {
			const response = await provinceApi.getProvince();
			if (response.status === 200) {
				setProvinces(response.data);
			}
		} catch (error) {
			console.log(error);
		}
		try {
			const response = await provinceApi.getDistrict();
			if (response.status === 200) {
				setDistricts(response.data);
			}
		} catch (error) {
			console.log(error);
		}
		try {
			const response = await provinceApi.getWard();
			if (response.status === 200) {
				setWards(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const selectForms = document.querySelectorAll('.select-form');
		const btnDropDowns = document.querySelectorAll('#shop .dropdown-toggle');
		const checkboxStyle = document.querySelectorAll('.checkbox-style');
		const totalCart = document.querySelector('.totalCart');
		const subTotalCart = document.querySelector('.subTotalCart');
		const els = document.querySelectorAll('.el');

		let currentOpenBtn = null;
		let prevOpenBox = null;
		let totalOrder = 0;

		btnDropDowns.forEach((btn) => {
			btn.addEventListener('click', handleToggle);
		});

		function handleToggle(e) {
			const currentBtn = e.target;
			const nextEl = currentBtn.nextElementSibling;

			if (currentOpenBtn && currentOpenBtn !== currentBtn) {
				const previousEl = currentOpenBtn.nextElementSibling;
				currentOpenBtn.classList.remove('show');
				previousEl.classList.remove('show');
			}

			currentBtn.classList.toggle('show');
			nextEl.classList.toggle('show');

			currentOpenBtn = currentBtn;
		}

		// ** handle checkbox method shipping
		const value_method = document.querySelector('.value_method');
		checkboxStyle.forEach((checkbox) => {
			checkbox.addEventListener('click', function (e) {
				if (prevOpenBox && prevOpenBox !== e.currentTarget) {
					prevOpenBox?.classList.remove('checked');
				}

				e.currentTarget.classList.add('checked');
				value_method.setAttribute(
					'value',
					e.currentTarget.querySelector('.checkbox-input').getAttribute('name')
				);
				prevOpenBox = e.currentTarget;
			});
		});
		// ** end  handle checkbox method shipping

		// ** handle select option
		selectForms.forEach((selectForm) => {
			selectForm.addEventListener('click', function () {
				const selectIcon = this.querySelector('.select-icon');
				if (this.classList.contains('show')) {
					this.classList.remove('show');
					this.classList.add('hidden');
					selectIcon.setAttribute(
						'class',
						'fa-solid fa-chevron-down select-icon'
					);
				} else {
					this.classList.remove('hidden');
					this.classList.add('show');
					selectIcon.setAttribute(
						'class',
						'fa-solid fa-chevron-up select-icon'
					);
				}
			});
		});
		// ** end handle select option

		// ** calc total
		els.forEach((el) => {
			const number = el.querySelector('.total');
			let numberValue = number.dataset.price;
			totalOrder += +numberValue;
			totalCart.innerHTML = `$${totalOrder.toFixed(2)}`;
			subTotalCart.innerHTML = `$${totalOrder.toFixed(2)}`;
		});
		// ** end calc total
		// ** handle validation
		Validator({
			form: '#checkout',
			errorMessage: 'form-message',
			rules: [
				Validator.isRequired('#c_fname'),
				Validator.isRequired('#c_fname'),
				Validator.isRequired('#c_email_address'),
				Validator.isEmail('#c_email_address'),
				Validator.isRequired('#c_phone'),
				Validator.isNumberPhone('#c_phone'),
				Validator.isRequired('#province'),
				Validator.isRequired('#district'),
				Validator.isRequired('#ward'),
				Validator.isRequired('#c_stress'),
			],
			onsubmit: async (data) => {
				const created_date = getCurrentDay();
				const {
					c_email_address,
					c_fname,
					c_phone,
					c_order_notes,
					district,
					province,
					ward,
					c_stress,
				} = data;

				const user_address = `${c_stress} - ${ward} - ${district} - ${province}`;

				const dataOrder = {
					user_id: userLocal,
					user_address,
					user_email: c_email_address,
					user_phone_number: c_phone,
					created_date,
					status: 'Đang xử lý',
				};
				if (!(await messageQuestion('Thanh toán'))) return;
				let sumTotal = 0;
				const order = await orderAPI.addOrder(dataOrder);
				products.forEach(async ({ id, price }) => {
					const quantity = idLocal.filter((idlocal) => idlocal === id).length;
					const total = quantity * price;
					sumTotal += total;
					const dataDetailOrder = {
						orders_id: order.data.id,
						product_id: id,
						quantity,
						unit_price: price,
						total,
					};
					await orderDetailsAPI.addOrderDetails(dataDetailOrder);
				});
				const dataShipping = {
					orders_id: order.data.id,
					username: c_fname,
					address: user_address,
					method: value_method.value,
					status: 'Đang gửi',
					note: c_order_notes ? c_order_notes : '',
					created_date,
					totalOrder: sumTotal,
				};
				await shippingApi.addShipping(dataShipping);
				localStorage.setItem('orderID', JSON.stringify(order.data.id));
				localStorage.removeItem('id');
				router.navigate('/cart/checkout/success');
			},
		});
		// ** end handle validation
	});

	useEffect(() => {
		// * select province
		const provinceBtns = document.querySelectorAll('.select-province');
		provinceBtns.forEach((pr) => {
			pr.addEventListener('click', handleSelectProvince);
		});

		function handleSelectProvince() {
			const selected = document.querySelector('.selected-province');
			const provinceHidden = document.querySelector('.province-hidden');
			let text = this.innerText;
			selected.innerHTML = text;
			let idProvince = this.dataset.province;
			provinceHidden.setAttribute('value', text);
			selectDistrict(idProvince);
		}

		function selectDistrict(idProvince) {
			const districtTag = document.querySelector('.district');
			const filterDistrict = districts.filter(
				(el) => el.province_code === +idProvince
			);
			const district = filterDistrict
				.map(
					(di) =>
						` 
        <p class="select-district" data-district = ${di.code} >${di.name}</p>
        
        `
				)
				.join('');
			districtTag.innerHTML = district;

			const districtBtn = document.querySelectorAll('.select-district');
			districtBtn.forEach((di) => {
				di.addEventListener('click', handleSelectDistrict);
			});
		}

		function handleSelectDistrict() {
			const selected = document.querySelector('.selected-district');
			const districtHidden = document.querySelector('.district-hidden');
			let text = this.innerText;
			selected.innerHTML = text;
			let idDistrict = this.dataset.district;
			districtHidden.setAttribute('value', text);
			selectWard(idDistrict);
		}

		function selectWard(idWard) {
			const wardTag = document.querySelector('.ward');
			const filterWard = wards.filter((el) => el.district_code === +idWard);
			const ward = filterWard
				.map((wa) => ` <p class="select-ward" >${wa.name}</p>`)
				.join('');
			wardTag.innerHTML = ward;

			const wardBtn = document.querySelectorAll('.select-ward');
			wardBtn.forEach((wa) => {
				wa.addEventListener('click', handleSelectWard);
			});
		}

		function handleSelectWard() {
			const selected = document.querySelector('.selected-ward');
			const wardHidden = document.querySelector('.ward-hidden');
			let text = this.innerText;
			selected.innerHTML = text;
			wardHidden?.setAttribute('value', text);
		}
	});

	const template = `

  <form id="checkout" method="post">
    <div class="container">
      <div class="row mb-5"></div>
      <div class="row">
        <div class="col-md-6 mb-5 mb-md-0">
          <h2 class="h3 mb-3 text-black">Billing Details</h2>
          <div class="p-1 p-lg-5 border">
            
            <div class=" row">
              <div class="form-group col-md-12">
                <label for="c_fname" class="text-black"
                  >Người nhận hàng <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="c_fname"
                  name="c_fname"
                  fdprocessedid="ncsc9qg"
                  placeholder="Nguyễn Văn A"
                  value="${user.user_name ? user.user_name : 'Nguyễn Văn A'}"
                />
                <span class="form-message"></span>
              </div>
            </div>

            <div class="row">
              <div class="form-group col-lg-12">
                <label for="c_address" class="text-black"
                  >Tỉnh/Thành phố  <span class="text-danger">*</span></label
                >
                <input class="province-hidden" id="province" name="province" hidden />
                <div class="select-form ">
                  <span class="selected form-control d-flex align-items-center">
                    <p class="mb-0 selected-province">Chọn tỉnh thành</p>
                    <i class="fa-solid fa-chevron-down select-icon"></i>
                  </span>
                  <div class="province select form-control">
                    ${provinces
											.map(
												(pr) => `
                    <p class="select-province" data-province = ${pr.code} >${pr.name}</p>
                    `
											)
											.join('')}
                  </div>
                </div>
                
              </div>
              <div class="form-group col-lg-6">
                <label for="c_address" class="text-black"
                  >Quận/Huyện <span class="text-danger">*</span></label
                >
                <input class="district-hidden" id="district" name="district" hidden />
                <div class="select-form user">
                  <span class="selected form-control d-flex align-items-center">
                    <p class="mb-0 selected-district">Chọn Quận/Huyện</p>
                    <i class="fa-solid fa-chevron-down select-icon"></i>
                  </span>
                  <div class="district select form-control">
                  
                  </div>
                </div>
              </div>
              <div class="form-group col-lg-6">
                <label for="c_address" class="text-black"
                  >Phường/Xã <span class="text-danger">*</span></label
                >
                <input class="ward-hidden" id="ward" name="ward" hidden />
                <div class="select-form user">
                  <span class="selected form-control d-flex align-items-center">
                    <p class="mb-0 selected-ward">Chọn Phường/Xã</p>
                    <i class="fa-solid fa-chevron-down select-icon"></i>
                  </span>
                  <div class="ward select form-control">
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group ">
              <label for="c_stress" class="text-black"
                >Số nhà/Tên đường <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="c_stress"
                name="c_stress"
                placeholder="137 Nguyễn Thị Thập"
              />
              <span class="form-message"></span>
            </div>


            <div class="row mb-2">
              <div class="form-group col-md-6">
                <label for="c_email_address" class="text-black"
                  >Email Address <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="c_email_address"
                  name="c_email_address"
                  fdprocessedid="gih485"
                  placeholder="abc@domain.com"
                  value="${
										user.user_email ? user.user_email : 'abc@domain.com'
									}"
                />
                <span class="form-message"></span>
              </div>
              <div class="form-group col-md-6">
                <label for="c_phone" class="text-black"
                  >Phone <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="c_phone"
                  name="c_phone"
                  placeholder="Phone Number"
                  fdprocessedid="ijflrg"
                />
                <span class="form-message"></span>
              </div>
            </div>

            <div class="form-group">
              <label for="c_order_notes" class="text-black"
                >Order Notes</label
              >
              <input  name="c_order_notes" id="c_order_notes"  
              class="form-control" placeholder="Write your notes here..."/> 
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row mb-5">
            <div class="col-md-12">
              <h2 class="h3 mb-3 text-black">Coupon Code</h2>
              <div class="p-3 p-lg-5 border">
                <label for="c_code" class="text-black mb-3"
                  >Enter your coupon code if you have one</label
                >
                <div class="input-group w-75">
                  <input
                    type="text"
                    class="form-control coupon"
                    id="c_code"
                    placeholder="Coupon Code"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      id="button-addon2"
                      fdprocessedid="02ptlq"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-5">
            <div class="col-md-12">
              <h2 class="h3 mb-3 text-black">Your Order</h2>
              <div class="p-3 p-lg-5 border">
                <table class="table site-block-order-table mb-5">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${products
										.map(
											(el) => `
                    <tr class="el">
                      <td class="el-quantity" data-quantity="${
												idLocal.filter((id) => id === el.id).length
											}">
                        ${el.title}<strong class="mx-2">x</strong>${
												idLocal.filter((id) => id === el.id).length
											}
                      </td>
                      <td data-price="${
												el.price * idLocal.filter((id) => id === el.id).length
											}" class="total">$${(
												el.price * idLocal.filter((id) => id === el.id).length
											).toFixed(2)}</td>
                    </tr>
                    `
										)
										.join('')}
                    <tr>
                      <td class="text-black font-weight-bold">
                        <strong>Cart Subtotal</strong>
                      </td>
                      <td class="text-black subTotalCart "></td>
                    </tr>
                    <tr>
                      <td class="text-black font-weight-bold">
                        <strong>Order Total</strong>
                      </td>
                      <td class="text-black font-weight-bold">
                        <strong class="totalCart"></strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="row payment-method mb-3">
                  <input class="value_method" value="" hidden />
                  <div class="col-lg-12 mb-3">
                    <label for="cod" class="checkbox-style ">
                      <input
                        type="checkbox "
                        name="cod"
                        id="cod"
                        class="checkbox-input"
                      />
                      <div class="checkbox-box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <label for="cod" class="checkbox-label">
                        <span
                          ><img
                            src="https://www.coolmate.me/images/COD.svg"
                            alt=""
                        /></span>
                        <span>COD<br>Thanh toán khi nhận hàng</br>
                      </label>
                    </label>
                  </div>
                  <div class="col-lg-12 mb-3">
                    <label for="momo" class="checkbox-style">
                      <input
                        type="checkbox"
                        name="momo"
                        id="momo"
                        class="checkbox-input"
                      />
                      <div class="checkbox-box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <label for="momo" class="checkbox-label">
                        <span
                          ><img
                            src="https://www.coolmate.me/images/momo-icon.png"
                            alt=""
                        /></span>
                        <span>Thanh toán MOMO</br>
                      </label>
                    </label>
                  </div>
                  <div class="col-lg-12 mb-3">
                    <label for="vnpay" class="checkbox-style">
                      <input
                        type="checkbox"
                        name="vnpay"
                        id="vnpay"
                        class="checkbox-input"
                      />
                      <div class="checkbox-box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <label for="vnpay" class="checkbox-label">
                        <span
                          ><img
                            src="https://www.coolmate.me/images/vnpay.png"
                            alt=""
                        /></span>
                        <span>Thẻ ATM / Thẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card)</br>
                      </label>
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <button
                    class="btn btn-primary btn-lg py-3 btn-block"
                    fdprocessedid="tzrnkg"> Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  </form>
  `;
	return template;
};

export default checkout;
