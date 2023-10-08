import {productAPI} from "@/api";
import { toast } from "@/components";
import { useLocalStorage, useQuantity } from "@/hooks";
import { router, useEffect, useState } from "@/utils";

const cart = (ids) => {
  const [products, setProducts] = useState([]);
  const [cartLocal, setCartLocal] = useLocalStorage("id", []);
  const [user, setUser] = useLocalStorage("user", '');

  // * ids được truyền khi click addtocart tại components shop. khi không click
  // * mà qua thẳng components cart thì ids không tồn tại vì vậy phải set ids vào local

  if (ids != undefined) {
    setCartLocal(ids)
  }

  // todo api 
  useEffect(()=> {
    const currentID = cartLocal ?? '';
    (async()=> {
      let uniqueArrayID = new Set()

      let newArrPrd = [];
      for (const id of currentID) {
        if (!uniqueArrayID.has(id)) {
          const response = await productAPI.getProduct(id);
          newArrPrd.push(response.data);
          uniqueArrayID.add(id)
        } 
      }
      setProducts(newArrPrd)
    })()

  }, [])
  // 
  
  useEffect(()=> {
    const cartItems = document.querySelectorAll(".cartItem");
    const totalCart = document.querySelector(".totalCart");
    const subTotalCart = document.querySelector(".subTotalCart");
    const totalValues = document.querySelectorAll('.total');
    const btnCheckout = document.querySelector(".btn-checkout");

    cartItems.forEach((cartItem) => { 
      const btnsDelele = cartItem.querySelectorAll(".btnDelete")
      const quantityResult = cartItem.querySelector(".quantity-result p");
      const price = cartItem.querySelector('.price');
      let quantityResultValue = quantityResult.dataset.quantity;
      let priceValue = price.dataset.price;
      const total = cartItem.querySelector('.total');
      const btnHanleQuantitys = cartItem.querySelectorAll('.btnHanleQuantity');

      // todo tăng giảm số lượng
      function handleClick () {
        if (this.classList.contains("increment")) {
          let cloneArr = [...cartLocal]
          cloneArr.push(+cartItem.dataset.cartid);
          setCartLocal(cloneArr)
          useQuantity(cloneArr)
        } else if (this.classList.contains("decrement")) {
          let cloneArr = [...cartLocal];
          let oldArr = (cloneArr.filter((id) => id != +cartItem.dataset.cartid));
          let newArr = (cloneArr.filter((id) => id === +cartItem.dataset.cartid));
          let indexToRemove = newArr.lastIndexOf(+cartItem.dataset.cartid);
          if (indexToRemove !== -1 && newArr.length > 1) {
            newArr.splice(indexToRemove, 1);
            const combinedArr = [...oldArr, ...newArr];
            setCartLocal(combinedArr);
            useQuantity(combinedArr);
          }
        }
      }
      // todo xóa item
      async function handleDelete  () {
        let currentId = +cartItem.dataset.cartid;
        let newArr = cartLocal.filter((id) => id != currentId);
        let newArrRender = [];
        for (const id of newArr) {
            const response = await productAPI.getProduct(id);
            newArrRender.push(response.data)
        }

        setProducts(newArrRender);
        setCartLocal(newArr)
        useQuantity(newArr)
        
      }
      // 
      btnHanleQuantitys.forEach((btn) =>
        btn.addEventListener("click", handleClick )
      )
      // 
      btnsDelele.forEach((btnDelete) => {
        btnDelete.addEventListener("click", handleDelete)
      })
      // todo tính tổng
      const totalNumber = +quantityResultValue * +priceValue
      total.innerHTML = `$${totalNumber ?? 0}`
      total.setAttribute("data-prd", totalNumber)
      // 
    })
    
  
    let sum = 0;
    totalValues.forEach((totalValue) => {
      sum += +totalValue.dataset.prd;
    })

    totalCart ? totalCart.innerHTML = `$${sum}` : ''
    subTotalCart? subTotalCart.innerHTML = `$${sum}` : ''

    // check checkout

    if (btnCheckout) {
      btnCheckout.addEventListener("click", () => {
        if (user) {
          router.navigate('/cart&checkout')
        } else {
          toast({
            title: "Thất bại",
            message: "Đăng nhập để thanh toán !",
            type: "error",
            show: true
          })
        }
      })
    }
    
  })


  
  // 
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
                    <tr data-cartid = ${el.id}  class="cartItem">
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
                      <td class="price" data-price="${el.price}">$${el.price}</td>
                      <td>
                        <div class="quatity-group d-flex">
                          <span  class="btnHanleQuantity decrement">-</span>
                          <div class="quantity-result">
                            <p data-quantity="${cartLocal.filter(id => id === el.id).length}">
                              ${cartLocal.filter(id => id === el.id).length}
                            </p>
                          </div>
                          <span  class="btnHanleQuantity increment">+</span>
                        </div>
                      </td>
                      <td  class="total"></td>
                      <td><div class="btn btn-primary btn-sm btnDelete">X</div></td>
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
                    <strong class="text-black subTotalCart"></strong>
                  </div>
                </div>
                <div class="row mb-5">
                  <div class="col-md-6">
                    <span class="text-black">Total</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black totalCart"></strong>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <button class="btn btn-primary btn-lg py-3 btn-block btn-checkout">
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