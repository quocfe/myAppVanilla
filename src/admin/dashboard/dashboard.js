import style from "./dashboard.module.css";

console.log(style)

const dashboard = () => {
  const template = `
  <div class=${style.admin}>
  <div class=${style.adminLayout}>
    <div class=${style.nav}>
      <h1>ShopPoly</h1>
      <ul>
        <li>
          <a href="/admin">DashBoard</a>
          <ion-icon name="cog-outline"></ion-icon>
        </li>
      </ul>
      <ul lass="accordion accordion-flush" id="accordionFlushExample">
        <li class="accordionItem">
          <a
            class="accordion-header"
            id="flush-headingOne"
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            >Sản phẩm</a
          >
          <ion-icon name="cart-outline"></ion-icon>
        </li>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <ul class=${style.accordionBody}>
            <li>
              <a href="/admin/products">Danh sách sản phẩm</a>
            </li>
            <li>
              <a href="">Thêm sản phẩm</a>
            </li>
          </ul>
        </div>
      </ul>
    </div>
    <div class=${style.adminMain}>
      <div class=${style.adminHeader}>
        <img src="./assets/img/profile/img-1.jpg" alt="" />
        <a href="">
          <ion-icon name="log-out-outline"></ion-icon>
        </a>
      </div>
      <div class=${style.content}>
        <table class="table caption-top">
          <caption>
            List of users
          </caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  `
  return template
};

export default dashboard;