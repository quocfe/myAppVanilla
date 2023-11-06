import categoryApi from '@/api/categoryApi';
import { messageQuestion } from '@/components';
import { router, useEffect, useState } from '@/utils';

const categoryEdit = (data) => {
	const cateID = data.id;
	const [category, setCategory] = useState({});

	useEffect(() => {
		(async () => {
			try {
				const response = await categoryApi.getCategory(cateID);
				if (response.status === 200) {
					setCategory(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		const form = document.querySelector('.form');
		const categoryName = document.querySelector('#categoryName');
		const idCate = document.querySelector('#idCate');

		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			try {
				if (!(await messageQuestion('Update category'))) return;
				await categoryApi.updateCategoy({
					id: idCate.value,
					name: categoryName.value,
				});
				router.navigate('/admin&categories');
			} catch (error) {
				console.log(error);
			}
		});
	});

	const { id, name } = category;

	const template = `
  <div class="addProducts">
  <form class="container form" enctype="multipart/form-data>
    <p class="title">Thêm mới danh mục</p>
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
            id="idCate"
            placeholder="Auto increment"
            value="${id ?? ''}"
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="categoryName" class="form-label"
            >Category name</label
          >
          <input
            type="text"
            class="form-control"
            id="categoryName"
            placeholder=""
            value="${name ?? ''}"
          />
        </div>
      </div>
    </div>
    <button class="btn btn-primary">Update Category</button>
  </form>
</div>
  `;
	return template;
};

export default categoryEdit;
