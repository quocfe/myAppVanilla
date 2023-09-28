import productAPI from "@/api/productApi";
import { useEffect, useState } from "@/utils";

const detail = ({id}) => {
  const [detail, setDetail] = useState([])
  console.log(detail)
  useEffect(()=> {
    (async ()=>{
      try {
        const response = await productAPI.getProduct(id);
        if (response.status === 200) {
          setDetail(response.data)
          console.log(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const template = `
  <section id="detail-product">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <a
          href=""
          class="MagicZoom"
          data-options="zoomWidth:300px; zoomHeight:300px"
          ><img class="mx-auto" src=""
        /></a>
      </div>
      <div class="col-md-6">
        <h2 class="text-black">Tank Top T-Shirt</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Pariatur, vitae, explicabo? Incidunt facere, natus soluta dolores
          iusto! Molestiae expedita veritatis nesciunt doloremque sint
          asperiores fuga voluptas, distinctio, aperiam, ratione dolore.
        </p>
        <p class="mb-4">
          Ex numquam veritatis debitis minima quo error quam eos dolorum
          quidem perferendis. Quos repellat dignissimos minus, eveniet nam
          voluptatibus molestias omnis reiciendis perspiciatis illum hic
          magni iste, velit aperiam quis.
        </p>
        <p><strong class="text-primary h4">$50.00</strong></p>
        <div class="mb-4">
          <div class="input-group mb-3" style="max-width: 150px">
            <div class="quatity-group d-flex mx-0">
              <span class="d-block text-center">-</span>
              <div class="quantity-result">
                <p>1</p>
              </div>
              <span class="d-block text-center">+</span>
            </div>
          </div>
        </div>
        <p>
          <a href="cart.html" class="buy-now btn btn-sm btn-primary"
            >Add To Cart</a
          >
        </p>
      </div>
    </div>
  </div>
</section>
  `
  return template 
};

export default detail;