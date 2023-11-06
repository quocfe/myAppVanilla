import { categoryApi, productAPI, shippingApi } from '@/api';
import { useEffect, useState } from '@/utils';
import Chart from 'chart.js/auto';
import * as style from './style.module.css';

const chart = () => {
	const [cate, setCate] = useState([]);
	const [product, setProduct] = useState([]);
	const [proceed, setProceed] = useState([]);
	const [labelsDay, setLabelsDay] = useState(initializeDay());

	// -- lấy 5 ngày gần nhất
	function initializeDay() {
		let recentDays = [];
		let currentDate = new Date();

		for (let i = 4; i >= 0; i--) {
			let recentDate = new Date(currentDate);
			recentDate.setDate(recentDate.getDate() - i);

			let dd = String(recentDate.getDate());
			let mm = String(recentDate.getMonth() + 1);
			let yyyy = recentDate.getFullYear();

			let formattedDate = `${dd}-${mm}-${yyyy}`;

			recentDays.push(formattedDate);
		}

		return recentDays;
	}
	// --

	useEffect(async () => {
		try {
			setProceed([]);
			for (const label of labelsDay) {
				const response = await shippingApi.getShippingMuti(
					`created_date=${label}`
				);

				const totalProceed = response.data.reduce(
					(prev, next) => prev + next.totalOrder,
					0
				);
				setProceed((prev) => [...prev, totalProceed]);
			}
		} catch (error) {
			console.log(error);
		}
	}, [labelsDay]);

	// category
	useEffect(() => {
		const fetchData = async () => {
			try {
				const cateResponse = await categoryApi.getCategories();

				await Promise.all(
					cateResponse.data.map(async (category) => {
						const productResponse = await productAPI.getProductMuti(
							`category=${category.name}`
						);
						setProduct((prev) => [...prev, productResponse.data.length]);
					})
				);
				setCate(cateResponse.data.map((category) => category.name));
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);
	//

	// pie chart
	useEffect(() => {
		(async function () {
			const data = {
				labels: cate,
				datasets: [
					{
						label: 'Quantity',
						data: product,
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(54, 162, 235)',
							'rgb(255, 205, 86)',
							'rgb(255, 205, 336)',
							'rgb(25, 205, 336)',
							'rgb(25, 225, 36)',
						],
						hoverOffset: 4,
					},
				],
			};

			new Chart(document.getElementById('acquisitions'), {
				type: 'pie',
				data,
				options: {
					responsive: true, // Cho phép biểu đồ tự động thích ứng với kích thước của container
					maintainAspectRatio: false, // Vô hiệu hóa tỷ lệ khung hình mặc định (nếu bạn muốn tự cấu hình kích thước)
					width: 1000, // Chiều rộng
					height: 1000, // Chiều cao
				},
			});
		})();
	});

	useEffect(() => {
		const btnProceed = document.querySelector('.btn-proceed');
		const dateStart = document.querySelector('.date-start');
		const dateEnd = document.querySelector('.date-end');

		// get date in range
		function getDatesInRange(startDate, endDate) {
			let dates = [];
			let currentDate = new Date(startDate);

			while (currentDate <= endDate) {
				let dd = String(currentDate.getDate());
				let mm = String(currentDate.getMonth() + 1);
				let yyyy = currentDate.getFullYear();

				dates.push(`${dd}-${mm}-${yyyy}`);

				currentDate.setDate(currentDate.getDate() + 1);
			}
			return dates;
		}

		btnProceed.addEventListener('click', () => {
			let startDate = new Date(dateStart.value);
			let endDate = new Date(dateEnd.value);

			let datesInRange = getDatesInRange(startDate, endDate);

			setLabelsDay(datesInRange);
		});
		//
		var data = {
			labels: labelsDay,
			datasets: [
				{
					label: 'Doanh thu',
					data: proceed,
					borderColor: 'blue',
					fill: false,
				},
			],
		};

		new Chart(document.getElementById('proceeds'), {
			type: 'line',
			data: data,
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: false,
					},
				},
			},
		});
	});

	return `
    <div> 
      <h5> Thống kê số lượng hàng hóa </h5>
      <div ><canvas id="acquisitions"></canvas></div>
    </div>
    <div> 
      <h5> Thống kê doanh thu theo ngày </h5>
      <div class="${style.date}">
        <input type="date" class="date-start ${style.date_input}"/>
        <input type="date"  class="date-end  ${style.date_input}"/>
        <button class="btn btn-primary btn-proceed">Thống kê</button>
      </div>
      <div ><canvas id="proceeds"></canvas></div>
    </div>
  `;
};

export default chart;
