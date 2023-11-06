import { categoryApi, updateImgApi } from '@/api';
import productAPI from '@/api/productApi';
import { messageQuestion } from '@/components';
import { router, useEffect, useState } from '@/utils';

const productsEdit = (data) => {
	const productID = data.id;
	const [product, setProduct] = useState({});
	const [cate, setCate] = useState([]);

	useEffect(async () => {
		try {
			const response = await productAPI.getProduct(productID);
			const responseCate = await categoryApi.getCategories();
			setCate(responseCate.data);
			if (response.status === 200) {
				setProduct(response.data);
			}
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
		const productImgOld = document.querySelector('#productImgOld');
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			if (!(await messageQuestion('Update product'))) return;

			const urlImg = await handleUploadFile(productImg.files);
			let checkImg;

			if (productImgOld.value != urlImg && urlImg) {
				checkImg = urlImg;
			} else {
				checkImg = productImgOld.value;
			}
			try {
				await productAPI.updateProduct({
					id: productID,
					title: productName.value,
					price: +productPrice.value,
					description: productDescription.value,
					category: cateSelect.value,
					thumbnail: checkImg,
				});
				router.navigate('/admin/products');
			} catch (error) {
				console.log(error);
			}
		});
		const handleUploadFile = async (file) => {
			try {
				const response = await updateImgApi.updateImg(file[0]);
				return response.data.secure_url;
			} catch (error) {
				console.log(error);
			}
		};
	});
	const { category, description, id, price, thumbnail, title } = product;
	const template = `
  <div class="addProducts">
  <form class="container form" enctype="multipart/form-data>
    <p class="title">Cập nhật sản phẩm</p>
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
            value="${id ?? ''}"
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
            value="${title ?? ''}"
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
            value="${price ?? ''}"
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
            value="${description ?? ''}"
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
              <option  ${el.name === category ? 'selected' : ''} value="${
									el.name
								}">${el.name}</option>
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
            value=""
          />
          <input type="hidden" id="productImgOld" value=${thumbnail ?? ' '} />
        </div>
      </div>
    </div>
    <button class="btn btn-primary">Update product</button>
  </form>
</div>
  `;

	return template;
};

export default productsEdit;
