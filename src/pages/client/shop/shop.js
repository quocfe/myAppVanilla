import {productAPI, categoryApi} from "@/api";
import { useQuantity } from "@/hooks";
import { useEffect, useState } from "@/utils";
import cart from "../cart/cart";
import queryString from 'query-string';


const shop = () => {
  let idLocal = JSON.parse(localStorage.getItem('id'))
  const currentIDInitial = idLocal != null ?  JSON.parse(localStorage.getItem('id')) : [];
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([])
  const [currentID, setCurrentID] = useState(currentIDInitial);
  const [totalRow, setTotalRow] = useState();
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 6
  })
  let totalPage = Math.ceil(totalRow / filter._limit);

  useEffect(async ()=> {
    try {
      const response = await productAPI.getProducts();
      const responseCate = await categoryApi.getCategories();
      setTotalRow(response.data.length)
      setCategory(responseCate.data)
    } catch (error) {
      console.log(error)
    }
  },[])
  

  useEffect(async ()=> {
    const paramString = queryString.stringify(filter);
    try {
      const response = await productAPI.getProductMuti(`${paramString}`);
      setProduct(response.data)
    } catch (error) {
      console.log(error)
    }
  },[])

  useEffect(async ()=> {
    const paramString = queryString.stringify(filter);
    try {
      const response = await productAPI.getProductMuti(`${paramString}`);
      setProduct(response.data)
      console.log(paramString)
    } catch (error) {
      console.log(error)
    }
  },[filter])


  useEffect(()=> {
    if (currentID?.length === 0) {
      cart(JSON.parse(localStorage.getItem('id')))
    } else {
      cart(currentID)
    }
  }, [currentID])

  useEffect(() => {
    const addToCartbtns = document.querySelectorAll('.addToCart');
    const btnsPage = document.querySelectorAll(".btn-page");
    const btnsCate = document.querySelectorAll(".cate-title");

    // 
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
    // 

    function handlePagination (e) {
      if (e.currentTarget.classList.contains('pre-page')) {
        if (filter._page > 1) {
          let newPage =  filter._page - 1 ;
          setFilter({
            ...filter,
            _page: newPage
          })
        } else {
          e.preventDefault()
        }
        
      } else  if (e.currentTarget.classList.contains('next-page')) {
        if (filter._page < totalPage) {
          let newPage = filter._page + 1
          setFilter({
            ...filter,
            _page: newPage
          })
        } else if (filter._page === totalPage) {
          e.preventDefault()
        }
      }
    }

    btnsPage.forEach((btn) => {
      btn.addEventListener('click', handlePagination)
    })

    // 

    btnsCate.forEach((btn) => {
      btn.addEventListener('click', handeSelectCate)
    })

    function handeSelectCate () {
      const query = this.innerText;
      if (query == 'All') {
        setFilter({
          _page: 1,
          _limit: 6
        })
      } else {
        setFilter({
          category: query
        })
      }
      
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
                <div class="d-flex pagination">
                  <div class="pre-page btn-page ${filter._page === 1 ? 'disabled' : ''}">Prev</div>
                  <div class="next-page btn-page ${filter._page === totalPage ? 'disabled' : ''}">Next</div>
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
                  <p class="cate-title">All</p>
                </li>
              ${category.map((el) => `
                <li class="mb-2">
                  <p class="cate-title">${el.name}</p>
                </li>
              `).join("")}
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