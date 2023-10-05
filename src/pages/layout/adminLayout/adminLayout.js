import { useEffect } from "@/utils";
import style from "../../admin/css/admin.module.css";

const adminLayout = (content) => {

  useEffect(() => {
    const bodyTag = document.querySelector("body")
    if (document.querySelector("#signin") || document.querySelector("#signup") || document.querySelector("#admin")) {
      bodyTag.querySelector('header').style.display = "none"
      bodyTag.querySelector('footer').style.display = "none"
    } else {
      bodyTag.querySelector('header').style.display = "block"
      bodyTag.querySelector('footer').style.display = "block"
    }
  })

  const template = `
  <div class=${style.admin} id="admin">
  <div class=${style.adminLayout}>
    <div class=${style.nav}>
      <a href="/">Poly Shop</a>
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
              <a href="/admin/products" >Danh sách sản phẩm</a>
            </li>
            <li>
              <a href="/admin/products/add" >Thêm sản phẩm</a>
            </li>
          </ul>
        </div>
      </ul>
      
      <ul lass="accordion accordion-flush" id="accordionCate">
        <li class="accordionItem">
          <a
            class="accordion-header"
            id="flush-headingCate"
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseCate"
            aria-expanded="false"
            aria-controls="flush-collapseCate"
            >Danh mục</a
          >
          <ion-icon name="cart-outline"></ion-icon>
        </li>
        <div
          id="flush-collapseCate"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingCate"
          data-bs-parent="#accordionCate"
        >
          <ul class=${style.accordionBody}>
            <li>
              <a href="/admin/categories" >Danh sách danh mục</a>
            </li>
            <li>
              <a href="/admin/categories/add" >Thêm danh mục</a>
            </li>
          </ul>
        </div>
      </ul>
    </div>
    <div class=${style.adminMain}>
      <div class=${style.adminHeader}>
        <a href="">
          <ion-icon name="log-out-outline"></ion-icon>
        </a>
      </div>
      <div class=${style.content}>
        ${content}
      </div>
    </div>
  </div>
</div>
  `
  return template
};

export default adminLayout;