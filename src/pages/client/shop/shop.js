import {productAPI} from "@/api";
import { useLocalStorage, useQuantity } from "@/hooks";
import { useEffect, useState } from "@/utils";
import cart from "../cart/cart";

const shop = () => {
  let idLocal = JSON.parse(localStorage.getItem('id'))
  const currentIDInitial = idLocal != null ?  JSON.parse(localStorage.getItem('id')) : [];
  const [product, setProduct] = useState([]);
  const [currentID, setCurrentID] = useState(currentIDInitial);

  useEffect(() => {
    ( async()=>{
      const response = await productAPI.getProducts();
      if (response.status === 200) {
        setProduct(response.data)
      } 
    })()
  }, [])

  useEffect(()=> {
    if (currentID?.length === 0) {
      cart(JSON.parse(localStorage.getItem('id')))
    } else {
      cart(currentID)
    }
  }, [currentID])

  useEffect(() => {
    const addToCartbtns = document.querySelectorAll('.addToCart');
    const handleClickAdd = (e) => {
      const prdID = +e.currentTarget.dataset.id;
        if (!(idLocal === null)) {
          let newPrdID = [...idLocal];
          newPrdID.push(prdID)
          setCurrentID(newPrdID);
          useQuantity(newPrdID)
        } else {
          setCurrentID((prevID) => [...prevID, prdID]);
          useQuantity(currentID)

        }
    }

    addToCartbtns.forEach((btn) => {
      btn.addEventListener(('click'), handleClickAdd)
    })
    return ()=> {
      addToCartbtns.forEach((btn) => {
        btn.removeEventListener(('click'), handleClickAdd)
      })
    }
    
  })



  const template = `
  <div id="shop">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-9 order-2">
            <div class="row">
              <div
                class="col-md-12 mb-5 d-flex align-items-center justify-content-between"
              >
                <div class="">
                  <h2 class="text-black h5">Shop All</h2>
                </div>
                <div class="d-flex dropdown-header">
                  <div class="dropdown mr-1 ml-md-auto">
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm dropdown-toggle"
                    >
                      Latest
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuOffset"
                    >
                      <a class="dropdown-item" href="#">Men</a>
                      <a class="dropdown-item" href="#">Women</a>
                      <a class="dropdown-item" href="#">Children</a>
                    </div>
                  </div>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm dropdown-toggle"
                      id="dropdownMenuReference"
                      data-toggle="dropdown"
                      fdprocessedid="v3jglr"
                      aria-expanded="false"
                    >
                      Reference
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuReference"
                      x-placement="bottom-start"
                      style="
                        position: absolute;
                        will-change: transform;
                        top: 0px;
                        left: 0px;
                        transform: translate3d(0px, 43px, 0px);
                      "
                    >
                      <a class="dropdown-item" href="#">Relevance</a>
                      <a class="dropdown-item" href="#">Name, A to Z</a>
                      <a class="dropdown-item" href="#">Name, Z to A</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Price, low to high</a>
                      <a class="dropdown-item" href="#">Price, high to low</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-5">
            ${product?.map(el => `
              <a class="col-lg-4 mb-4 col-md-6 col-sm-6 text-decoration-none">
                <div class="item border">
                  <figure class="item-image">
                    <img src="${el.thumbnail}" alt="" class="m-0" />
                  </figure>
                  <div class="item-container"> 
                    <div class="item-text">
                      <h3>${el.title}</h3>
                      <p>${el.description}</p>
                      <span>$${el.price}</span>
                    </div>
                    <div class="mt-20"> 
                      <div data-id=${el.id} class="btn btn-primary addToCart">Add too cart</div>
                      <button class="btn btn-info">See more</button>
                    </div>
                  </div>
                </div>
              </a>
            `).join("")}
           
            </div>
          </div>

          <div class="sidebar col-md-3 order-1 mb-5 mb-md-0">
            <div class="border p-4 rounded mb-4">
              <h3 class="mb-3 h6 text-uppercase text-black d-block">
                Categories
              </h3>
              <ul class="list-unstyled mb-0">
                <li class="mb-2">
                  <a href="#" class="d-flex justify-content-between"
                    ><span>Men</span>
                    <span class="text-black ml-auto">(2,220)</span></a
                  >
                </li>
                <li class="mb-2">
                  <a href="#" class="d-flex justify-content-between"
                    ><span>Women</span>
                    <span class="text-black ml-auto">(2,550)</span></a
                  >
                </li>
                <li class="mb-2">
                  <a href="#" class="d-flex justify-content-between"
                    ><span>Children</span>
                    <span class="text-black ml-auto">(2,124)</span></a
                  >
                </li>
              </ul>
            </div>

            <div class="border p-4 rounded mb-4">
              <div class="mb-4">
                <h3 class="mb-3 h6 text-uppercase text-black d-block">
                  Filter by Price
                </h3>
                <div id="slider-range" class="border-primary">
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 25%"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span class="corner-bar" style="left: 25%"></span>
                </div>
                <input
                  type="text"
                  name="text"
                  id="amount"
                  class="form-control border-0 pl-0 bg-white mt-2"
                  value="$0 - $500"
                />
              </div>

              <div class="mb-4 filter-size">
                <h3 class="mb-3 h6 text-uppercase text-black d-block">Size</h3>
                <label for="s_sm" class="d-flex mb-2 align-items-center">
                  <input type="checkbox" id="s_sm" class="mr-2 mt-1" />
                  <span class="text-black">Small (2,319)</span>
                </label>
                <label for="s_md" class="d-flex mb-2 align-items-center">
                  <input type="checkbox" id="s_md" class="mr-2 mt-1" />
                  <span class="text-black">Medium (1,282)</span>
                </label>
                <label for="s_lg" class="d-flex mb-2 align-items-center">
                  <input type="checkbox" id="s_lg" class="mr-2 mt-1" />
                  <span class="text-black">Large (1,392)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  return template
};

export default shop;