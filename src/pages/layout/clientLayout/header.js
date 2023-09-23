
const header = () => {
  window.addEventListener("DOMContentLoaded", ()=> {
    const searchBtn = document.querySelector(".search-btn")
    searchBtn?.addEventListener("click", (e)=> {
      const searchForm = e.currentTarget.parentElement;
      searchForm.classList.toggle("show")
    })
  })
  const template = `
  <header id="header">
  <div class="header-top">
    <div class="container">
      <div class="row align-items-center">
        <div
          class="col-6 col-md-4 order-2 order-md-1 text-left d-flex align-items-center justify-content-start search-form"
        >
          <span class="search-btn">
            <ion-icon name="search-outline"></ion-icon>
          </span>
          <input
            type="text"
            class="form-control border-0"
            placeholder="Search"
          />
          <ul class="search-result">
            <li>result</li>
            <li>result</li>
            <li>result</li>
            <li>result</li>
            <li>result</li>
            <li>result</li>
            <li>result</li>
          </ul>
        </div>
        <div
          class="header-center col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center"
        >
          <div class="header-logo">
            <a href="">shopeeES6</a>
          </div>
        </div>
        <div class="col-6 col-md-4 order-3 order-md-3">
          <div class="d-flex align-items-center justify-content-end">
            <a href="#" class="header-icon">
              <ion-icon name="person"></ion-icon>
            </a>
            <a href="#" class="header-icon">
              <ion-icon name="heart-outline"></ion-icon>
            </a>
            <a href="./cart.html" class="header-icon icon-cart">
              <ion-icon name="cart"></ion-icon>
              <div class="message">
                <p>10</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="header-navigation text-right text-md-center">
    <div class="container">
      <ul class="header-menu">
        <li class="has-children show">
          <a href="">HOME</a>
          <ul class="dropdown">
            <li><a href="">Home 1</a></li>
            <li><a href="">Home 1</a></li>
            <li><a href="">Home 1</a></li>
          </ul>
        </li>
        <li>
          <a href="/about">ABOUT</a>
        </li>
        <li>
          <a href="">SHOP</a>
        </li>
        <li>
          <a href="">CONTACT</a>
        </li>
      </ul>
    </div>
  </div>
</header>
  
  `
  return template
};

export default header();