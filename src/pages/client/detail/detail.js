import productAPI from '@/api/productApi';
import { useEffect, useState } from '@/utils';
import { cart } from '@/pages/client';
import { useLocalStorage, useQuantity } from '@/hooks';

const detail = ({ id }) => {
	const [detail, setDetail] = useState([]);
	const [idLocal, setIdLocal] = useLocalStorage('id', []);
	const [cunrrentQuantity, setCunrrentQuantity] = useState([+id]);

	useEffect(() => {
		(async () => {
			try {
				const response = await productAPI.getProduct(id);
				if (response.status === 200) {
					setDetail(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		const addToCartbtn = document.querySelector('.addToCart');
		const btnHanleQuantitys = document.querySelectorAll('.btnHanleQuantity');

		addToCartbtn.addEventListener('click', () => {
			if (!(idLocal === null)) {
				let newPrdID = [...idLocal];
				newPrdID.push(...cunrrentQuantity);
				setIdLocal(newPrdID);
				useQuantity(newPrdID);
				// setCurrentID(newPrdID);
			} else {
				// setCurrentID((prevID) => [...prevID, prdID]);
			}
		});

		btnHanleQuantitys.forEach((btn) => {
			btn.addEventListener('click', function () {
				if (this.classList.contains('increment')) {
					setCunrrentQuantity((prev) => [...prev, +this.dataset.id]);
					// console.log(cunrrentQuantity);
				} else if (this.classList.contains('decrement')) {
					let cloneArr = [...cunrrentQuantity];
					cloneArr.pop();
					setCunrrentQuantity(cloneArr);
				}
			});
		});
	});

	const template = `
  <section id="detail-product">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <img class="mx-auto" src="${detail.thumbnail}"/>
      </div>
      <div class="col-md-6">
        <h2 class="text-black">${detail.title}</h2>
        <p>
        ${detail.description}
        </p>
        <p><strong class="text-primary h4">$${detail.price}</strong></p>
        <div class="mb-4">
          <div class="input-group mb-3" style="max-width: 150px">
            <div class="quatity-group d-flex mx-0">
              <span data-id=${detail.id} class="d-block text-center btnHanleQuantity decrement">-</span>
              <div class="quantity-result">
                <p>${cunrrentQuantity.length}</p>
              </div>
              <span data-id=${detail.id} class="d-block text-center btnHanleQuantity increment">+</span>
            </div>
          </div>
        </div>
        <p>
          <div data-id=${detail.id} class="btn btn-primary addToCart">Add too cart</div>
        </p>
      </div>
    </div>
  </div>
</section>
  `;
	return template;
};

export default detail;
