import productAPI from "@/api/productApi";
import { useLocalStorage } from "@/hooks";
import { useEffect, useState } from "@/utils";

const cart = (ids) => {
  const [products, setProducts] = useState([]);
  const [cartLocal, setCartLocal] = useLocalStorage("id", []);

  if (ids != undefined) {
    setCartLocal(ids)
  }

  useEffect(()=> {
    const currentID = cartLocal() ?? '';

    (async()=> {
      let newArrPrd = [];
      for (const id of currentID) {
        const response = await productAPI.getProduct(id);
        newArrPrd.push(response.data);
      }

      setProducts(newArrPrd)
    })()

  }, [])
  

  const template = `
    <section id="cart">
      <div class="container">
        <div class="row mb-5">
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="product-thumbnail">Image</th>
                    <th class="product-name">Product</th>
                    <th class="product-price">Price</th>
                    <th class="product-quantity">Quantity</th>
                    <th class="product-total">Total</th>
                    <th class="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  ${products?.map((el)=> `
                    <tr>
                      <td class="product-thumbnail">
                        <img
                          src="${el.thumbnail}"
                          alt="Image"
                          class="img-fluid"
                        />
                      </td>
                      <td class="product-name">
                        <h2 class="h5 text-black">${el.title}</h2>
                      </td>
                      <td>$${el.price}</td>
                      <td>
                        <div class="quatity-group d-flex">
                          <span>-</span>
                          <div class="quantity-result">
                            <p>1</p>
                          </div>
                          <span>+</span>
                        </div>
                      </td>
                      <td>$${el.price}</td>
                      <td><a href="#" class="btn btn-primary btn-sm">X</a></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="row mb-5">
              <div class="col-md-6 mb-3 mb-md-0">
                <button
                  class="btn btn-primary btn-sm btn-block"
                  fdprocessedid="vwneb"
                >
                  Update Cart
                </button>
              </div>
              <div class="col-md-6">
                <button
                  class="btn btn-outline-primary btn-sm btn-block"
                  fdprocessedid="ir76hr"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label class="text-black h4" for="coupon">Coupon</label>
                <p class="text-left">Enter your coupon code if you have one.</p>
              </div>
              <div class="row">
                <div class="col-md-8 mb-3 mb-md-0">
                  <input
                    type="text"
                    class="form-control h-100"
                    id="coupon"
                    placeholder="Coupon Code"
                  />
                </div>
                <div class="col-md-4">
                  <button class="btn btn-primary btn-sm" fdprocessedid="esjxv">
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 pl-5">
            <div class="row justify-content-end">
              <div class="col-md-7">
                <div class="row">
                  <div class="col-md-12 text-right border-bottom mb-5">
                    <h3 class="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <span class="text-black">Subtotal</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">$230.00</strong>
                  </div>
                </div>
                <div class="row mb-5">
                  <div class="col-md-6">
                    <span class="text-black">Total</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">$230.00</strong>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <button
                      class="btn btn-primary btn-lg py-3 btn-block"
                      onclick="window.location='checkout.html'"
                      fdprocessedid="wk6cl2"
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
  return template
};

export default cart;