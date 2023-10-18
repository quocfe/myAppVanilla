import { productAPI } from '@/api';
import { useEffect, useState } from '@/utils';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs';
import { useQuantity } from '@/hooks';
import { cart } from '@/pages/client';

const homepage = () => {
	localStorage.removeItem('orderID');
	let idLocal = JSON.parse(localStorage.getItem('id')) || [];
	const [productLimit, setProductLimit] = useState([]);
	const [currentID, setCurrentID] = useState(idLocal);

	useEffect(async () => {
		try {
			const response = await productAPI.getProductMuti('_page=1&_limit=5');
			setProductLimit(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		new Swiper('.mySwiper', {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	});

	useEffect(() => {
		if (currentID?.length === 0) {
			cart(JSON.parse(localStorage.getItem('id')));
		} else {
			cart(currentID);
		}
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
			} else {
				setCurrentID((prevID) => [...prevID, prdID]);
			}
		};

		addToCartbtns.forEach((btn) => {
			btn.addEventListener('click', handleClickAdd);
		});
	});

	const template = `
  <section id="site-cover">
  <div class="container site-cover-wrapper">
    <div class="row">
      <div class="site-cover-content">
        <h1 class="mb-2">Finding Your Perfect Shoes</h1>
        <p class="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          at iaculis quam. Integer accumsan tincidunt fringilla
        </p>
        <button>show shop</button>
      </div>
    </div>
  </div>
</section>
<!-- end site cover -->
<!-- site method -->
<section id="site-method">
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4">
        <span class="method-icon">
          <ion-icon name="car-outline"></ion-icon>
        </span>
        <div class="text">
          <h2 class="text-uppercase">Free Shipping</h2>
          <p>
            Miễn phí chi phi vận chuyển toàn quốc với giá trị đơn hàng từ 500.000 VNĐ
          </p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4">
        <span class="method-icon">
          <ion-icon name="time-outline"></ion-icon>
        </span>
        <div class="text">
          <h2 class="text-uppercase">Hỗ trợ 24/7</h2>
          <p>
            Đội ngũ CSKH giải đáp thắc mắc 24/7 kể cả ngày lễ
          </p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4">
        <span class="method-icon">
          <ion-icon name="reload-outline"></ion-icon>
        </span>
        <div class="text">
          <h2 class="text-uppercase">Đổi trả trong vòng 60 ngày</h2>
          <p>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- end site method -->
<!-- site-zoom -->
<section id="site-zoom">
  <div class="container">
    <div class="row">
      <div
        class="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0 aos-init aos-animate"
        data-aos="fade"
        data-aos-delay=""
      >
        <a class="zoom-item" href="#">
          <figure class="image">
            <img src="/src/asset/images/women.jpg" alt="" class="img-fluid" />
          </figure>
          <div class="text">
            <span class="text-uppercase">Collections</span>
            <h3>Women</h3>
          </div>
        </a>
      </div>
      <div
        class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0 aos-init aos-animate"
        data-aos="fade"
        data-aos-delay="100"
      >
        <a class="zoom-item" href="#">
          <figure class="image">
            <img
              src="/src/asset/images/children.jpg"
              alt=""
              class="img-fluid"
            />
          </figure>
          <div class="text">
            <span class="text-uppercase">Collections</span>
            <h3>Children</h3>
          </div>
        </a>
      </div>
      <div
        class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0 aos-init aos-animate"
        data-aos="fade"
        data-aos-delay="200"
      >
        <a class="zoom-item" href="#">
          <figure class="image">
            <img src="/src/asset/images/men.jpg" alt="" class="img-fluid" />
          </figure>
          <div class="text">
            <span class="text-uppercase">Collections</span>
            <h3>Men</h3>
          </div>
        </a>
      </div>
    </div>
  </div>
</section>
<!-- end site-zoom -->
<!-- Featured -->
<section id="featured">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h2 class="featured-heading">Featured Products</h2>
      </div>
    </div>
    <div class="row pt-5 pb-5 swiper-container">
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">

        ${productLimit
					.map(
						(el) => `
        <div class="swiper-slide rounded overflow-hidden">
            <div class="item">
              <figure class="item-image">
                <img src="${el.thumbnail}" alt="${el.title}" class="m-0" />
              </figure>
              <div class="item-text ">
                <h3>${el.title}</h3>
                <p class="brand">${el.brand}</p>
                <span>$${el.price}</span>
                <div > 
                  <div data-id=${el.id} class="btn btn-primary addToCart">Add too cart</div>
                  <a href="/product=${el.id}" class="btn btn-info">See more</a>
                </div>
              </div>
            </div>
          </div>
        `
					)
					.join('')}

        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
  </div>
</section>
<!-- end Featured -->
<!-- sale  -->
<section id="sale">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h2 class="featured-heading">Big sale</h2>
      </div>
    </div>
    <div class="row align-items-center pt-5">
      <div class="col-md-12 col-lg-7 mb-5">
        <a href="#"
          ><img
            src="/src/asset/images/blog_1.jpg"
            alt="Image placeholder"
            class="img-fluid rounded"
        /></a>
      </div>
      <div class="col-md-12 col-lg-5 text-center pl-md-5">
        <h2><a href="#">Giảm ngay từ 5%-15%</a></h2>
        <p>
        Ưu đãi hấp dẫn mùa tựu trường!!! Giảm ngay từ 5%-15% với các sản phẩm như điện thoại, laptop dành riêng cho các bạn học sinh sinh viên
        </p>
        <p><a href="#" class="btn btn-primary btn-sm">Mua ngay</a></p>
      </div>
    </div>
  </div>
</section>
  `;
	return template;
};

export default homepage;
