import { router, useEffect, useState } from '@/utils';
import productAPI from '@/api/productApi';
import { messageQuestion } from '@/components';
import { categoryApi, updateImgApi } from '@/api';

const productsAdd = () => {
	const [cate, setCate] = useState([]);

	useEffect(async () => {
		try {
			const response = await categoryApi.getCategories();
			setCate(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const form = document.querySelector('.form');
		const productName = document.querySelector('#productName');
		const productPrice = document.querySelector('#productPrice');
		const productDescription = document.querySelector('#productDescription');
		const productImg = document.querySelector('#productImg');
		const cateSelect = document.querySelector('.form-select');

		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			const urlImg = await handleUploadFile(productImg.files);
			if (!(await messageQuestion('Add products'))) return;
			try {
				await productAPI.addProduct({
					title: productName.value,
					price: +productPrice.value,
					description: productDescription.value,
					category: cateSelect.value,
					thumbnail: urlImg,
				});
				router.navigate('/admin&products');
			} catch (error) {
				console.log(error);
			}
		});
	});

	const handleUploadFile = async (file) => {
		try {
			const response = await updateImgApi.updateImg(file[0]);
			return response.data.secure_url;
		} catch (error) {
			console.log(error);
		}
	};

	const template = `
  <div class="addProducts">
  <form class="container form" enctype="multipart/form-data>
    <p class="title">Thêm mới sản phẩm</p>
    <div class="row">
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="id" class="form-label"
            >ID</label
          >
          <input
            disabled
            type="text"
            class="form-control"
            id="id"
            placeholder="Auto increment"
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productName" class="form-label"
            >Product name</label
          >
          <input
            type="text"
            class="form-control"
            id="productName"
            placeholder=""
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productPrice" class="form-label"
            >Price</label
          >
          <input
            type="number"
            class="form-control"
            id="productPrice"
            placeholder=""
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productDescription" class="form-label"
            >Description</label
          >
          <input
            type="text"
            class="form-control"
            id="productDescription"
            placeholder=""
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productSelect" class="form-label"
            >Category</label
          >
          <select class="form-select " aria-label="">
            <option selected>Category</option>
            ${cate
							.map(
								(el) => `
              <option value="${el.name}">${el.name}</option>
            `
							)
							.join('')}
        </select>
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productImg" class="form-label"
            >Product Image</label
          >
          <input
            type="file"
            class="form-control"
            id="productImg"
            placeholder="name@example.com"
          />
        </div>
      </div>
    </div>
    <button class="btn btn-primary">Add product</button>
  </form>
</div>
  `;

	return template;
};

export default productsAdd;
