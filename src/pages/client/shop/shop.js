import { productAPI, categoryApi } from '@/api';
import { useDebounce, useQuantity } from '@/hooks';
import { useEffect, useState } from '@/utils';
import cart from '../cart/cart';
import queryString from 'query-string';
import skeleton from './components/Skeleton/skeleton';

const shop = () => {
	let idLocal = JSON.parse(localStorage.getItem('id')) || [];
	// const currentIDInitial = idLocal != null ?  JSON.parse(localStorage.getItem('id')) : [];
	const [isLoading, setIsloading] = useState(true);
	const [product, setProduct] = useState([]);
	const [category, setCategory] = useState([]);
	const [currentID, setCurrentID] = useState(idLocal);
	const [totalRow, setTotalRow] = useState();
	const [minValue, setMinValue] = useState();
	const [maxValue, setMaxValue] = useState();
	const [filter, setFilter] = useState({
		_page: 1,
		_limit: 6,
	});

	let totalPage = Math.ceil(totalRow / filter._limit);

	useEffect(async () => {
		const paramString = queryString.stringify(filter);
		try {
			const responseProductMuti = await productAPI.getProductMuti(
				`${paramString}`
			);
			const response = await productAPI.getProducts();
			const responseCate = await categoryApi.getCategories();
			setTotalRow(response.data.length);
			setCategory(responseCate.data);
			setProduct(responseProductMuti.data);
			setIsloading(!isLoading);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(async () => {
		const paramString = queryString.stringify(filter);
		try {
			const response = await productAPI.getProductMuti(`${paramString}`);
			setProduct(response.data);
			setIsloading(!isLoading);
		} catch (error) {
			console.log(error);
		}
	}, [filter]);

	useEffect(() => {
		// if (currentID?.length === 0) {
		// 	cart(JSON.parse(localStorage.getItem('id')));
		// } else {
		// }
		cart(currentID);
	}, [currentID]);

	useEffect(() => {
		const addToCartbtns = document.querySelectorAll('.addToCart');

		if (currentID.length > 0) {
			useQuantity(currentID);
		}

		const handleClickAdd = (e) => {
			const prdID = +e.currentTarget.dataset.id;
			if (!(idLocal === null)) {
				let newPrdID = [...idLocal];
				newPrdID.push(prdID);
				setCurrentID(newPrdID);
			}
			//  else {
			// 	setCurrentID((prevID) => [...prevID, prdID]);
			// 	console.log(' null');
			// }
		};

		addToCartbtns.forEach((btn) => {
			btn.addEventListener('click', handleClickAdd);
		});
		//
	});

	useEffect(() => {
		const btnsPage = document.querySelectorAll('.btn-page');
		const btnsCate = document.querySelectorAll('.cate-title');
		const inputRanges = document.querySelectorAll('.price-field input');

		function handeSelectCate() {
			const query = this.innerText.toLowerCase();
			if (query == 'all') {
				setIsloading(!isLoading);
				setFilter({
					_page: 1,
					_limit: 6,
				});
			} else {
				setIsloading(!isLoading);
				setFilter({
					category: query,
				});
			}
		}

		function handlePagination(e) {
			if (e.currentTarget.classList.contains('pre-page')) {
				if (filter._page > 1) {
					let newPage = filter._page - 1;
					setFilter({
						...filter,
						_page: newPage,
					});
					setIsloading(!isLoading);
				} else {
					e.preventDefault();
				}
			} else if (e.currentTarget.classList.contains('next-page')) {
				if (filter._page < totalPage) {
					let newPage = filter._page + 1;
					setFilter({
						...filter,
						_page: newPage,
					});
					setIsloading(!isLoading);
				} else if (filter._page === totalPage) {
					e.preventDefault();
				}
			}
		}

		btnsPage.forEach((btn) => {
			btn.addEventListener('click', handlePagination);
		});

		//

		btnsCate.forEach((btn) => {
			btn.addEventListener('click', handeSelectCate);
		});

		// filter price

		function handleFilterPrice(e) {
			let priceGap = 100;
			let minValue = +inputRanges[0].value;
			let maxValue = +inputRanges[1].value;

			if (maxValue - minValue < priceGap) {
				if (e.target.className === 'range-min') {
					minValue = inputRanges[0].value = maxValue - priceGap;
				} else {
					maxValue = inputRanges[1].value = minValue + priceGap;
				}
			}
			setMinValue(minValue);
			setMaxValue(maxValue);
			setFilter({
				price_gte: minValue,
				price_lte: maxValue,
			});
			setIsloading(!isLoading);
		}

		inputRanges.forEach((btn) => {
			btn.addEventListener(
				'input',
				useDebounce(() => handleFilterPrice(), 500)
			);
		});
	});

	const template = `
  <div id="shop">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-9 order-2">
            <div class="row">
              <div
                class="col-md-12 mb-5 "
              >
                <div class="d-flex pagination justify-content-start">
                  <div class="pre-page btn-page ${
										filter._page === 1 ? 'disabled' : ''
									}">Prev</div>
                  <div class="next-page btn-page ${
										filter._page === totalPage ? 'disabled' : ''
									}">Next</div>
                </div>
              </div>
            </div>
            <div class="row mb-5">
            ${isLoading ? skeleton() : ''}
            ${
							!isLoading
								? product
										?.map(
											(el) =>
												` <div class="col-lg-4 mb-4 col-md-6 col-sm-6 text-decoration-none">
                  <div class="item border">
                    <figure class="item-image">
                      <img src="${el.thumbnail}" alt="" class="m-0" />
                    </figure>
                    <div class="item-container"> 
                      <div class="item-text">
                        <h3>${el.title}</h3>
                        <p>${el.description}</p>
                        <span>$${el.price}</span>
                      </div>
                      <div class="mt-20"> 
                        <div data-id=${el.id} class="btn btn-primary addToCart">Add too cart</div>
                        <a href="/product=${el.id}" class="btn btn-info">See more</a>
                      </div>
                    </div>
                  </div>  
                </div>`
										)
										.join('')
								: ''
						}
            </div>
          </div>

          <div class="sidebar col-md-3 order-1 mb-5 mb-md-0">
            <div class="border p-4 rounded mb-4">
              <h3 class="mb-3 h6 text-uppercase text-black d-block">
                Categories
              </h3>
              <ul class="list-unstyled mb-0">
                <li class="mb-2">
                  <p class="cate-title">All</p>
                </li>
              ${category
								?.map(
									(el) => `
                <li class="mb-2">
                  <p class="cate-title">${el.name}</p>
                </li>
              `
								)
								.join('')}
              </ul>
            </div>

            <div class="border p-4 rounded mb-4">
              <div class="mb-4">
                <h3 class="mb-3 h6 text-uppercase text-black d-block">
                  Filter by Price
                </h3>
                <div class="price-filter">
									<div class="price-progress"> </div>
										<div class="price-field">
											<input type="range" min="0" max="1000" step="100" value="${
												minValue ? minValue : 0
											}" class="range-min">
											<input type="range" min="0" max="1000" step="100" value="${
												maxValue ? maxValue : 1000
											}" class="range-max">
										</div>
										<div class="price-container"> 
											<div class="min-price range-text">$${minValue ? minValue : 0}</div>
											<div class="max-price range-text">$${maxValue ? maxValue : 1000}</div>
										</div>
									</div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
	return template;
};

export default shop;
