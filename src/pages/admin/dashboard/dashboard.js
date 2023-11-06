import { categoryApi, orderAPI, productAPI, usersAPI } from '@/api';
import { useEffect, useState } from '@/utils';

const dashboard = () => {
	const [itemNumber, setItemNumber] = useState([]);
	useEffect(async () => {
		const fetchData = async () => {
			const cateResponse = await categoryApi.getCategories();
			const productResponse = await productAPI.getProducts();
			const userResponse = await usersAPI.getUsers();
			const orderResponse = await orderAPI.getOrders();
			return {
				cateLength: cateResponse.data.length,
				producLength: productResponse.data.length,
				userLength: userResponse.data.length,
				orderLength: orderResponse.data.length,
			};
		};

		const data = await fetchData();
		setItemNumber(data);
	}, []);

	const { cateLength, orderLength, producLength, userLength } = itemNumber;

	const template = `
<div class="container">
  <div class="cards row mt-5">
    <div class="card-single col d-flex justify-content-around bg-success text-white py-5 ml-3">
      <div>
        <h1 class="font-weight-bold">${cateLength ? cateLength : 0}</h1>
        <span>Danh mục</span>
      </div>
      <div>
        <i class="fas fa-th-list" style="font-size: 80px" aria-hidden="true"></i>
      </div>
    </div>
    <div class="card-single col d-flex justify-content-around bg-warning text-white py-5 ml-3">
      <div>
        <h1 class="font-weight-bold">${producLength ? producLength : 0}</h1>
        <span>Sản phẩm</span>
      </div>
      <div>
        <i class="fas fa-sitemap" style="font-size: 80px" aria-hidden="true"></i>
      </div>
    </div>
    <div class="card-single col d-flex justify-content-around bg-danger text-white py-5 ml-3">
      <div>
        <h1 class="font-weight-bold">${userLength ? userLength : 0}</h1>
        <span>Khách hàng</span>
      </div>
      <div>
        <i class="fas fa-users" style="font-size: 80px" aria-hidden="true"></i>
      </div>
    </div>
    <div class="card-single col d-flex justify-content-around bg-primary text-white py-5 ml-3">
      <div>
        <h1 class="font-weight-bold">${orderLength ? orderLength : 0}</h1>
        <span>Đơn hàng</span>
      </div>
      <div>
        <i class="fas fa-comments" style="font-size: 80px" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</div>  
  `;

	return template;
};

export default dashboard;
