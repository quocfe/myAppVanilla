import productAPI from "@/api/productApi";
import { router, useEffect, useState } from "@/utils";
import Swal from "sweetalert2";

const productsEdit = (data) => {
  const productID = data.id;
  const [product, setProduct] = useState({});

  useEffect( async ()=> {
    try {
      const response = await productAPI.getProduct(productID);
      if (response.status === 200) {
        setProduct(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    const form = document.querySelector(".form");
    const productName = document.querySelector("#productName");
    const productPrice = document.querySelector("#productPrice");
    const productDescription = document.querySelector("#productDescription");
    const productImg = document.querySelector("#productImg");
    const cateSelect = document.querySelector(".form-select");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'UPDATE PRODUCT',
        text: "",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'UPDATE'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await productAPI.updateProduct({
              id: productID,
              title:productName.value,
              price:+productPrice.value,
              description:  productDescription.value,
              category: cateSelect.value,
              image :  productImg.value
          });
            Swal.fire(
              'UPDATE successfully!',
            )
              router.navigate("/admin/products")
          } catch (error) {
            console.log(error)
          }
        }
      })
    });
  })

  const template = `
  <div class="addProducts">
  <form class="container form" enctype="multipart/form-data>
    <p class="title">Cập nhật sản phẩm</p>
    <div class="row">
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="id" class="form-label"
            >ID</label
          >
          <input
            disabled
            type="text"
            class="form-control"
            id="id"
            placeholder="Auto increment"
            value="${product.id ?? ""}"
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productName" class="form-label"
            >Product name</label
          >
          <input
            type="text"
            class="form-control"
            id="productName"
            placeholder=""
            value="${product.title ?? ""}"
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productPrice" class="form-label"
            >Price</label
          >
          <input
            type="number"
            class="form-control"
            id="productPrice"
            placeholder=""
            value="${product.price ?? ""}"
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productDescription" class="form-label"
            >Description</label
          >
          <input
            type="text"
            class="form-control"
            id="productDescription"
            placeholder=""
            value="${product.description ?? ""}"
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productSelect" class="form-label"
            >Category</label
          >
          <select class="form-select " aria-label="">
            <option selected>${product.category ?? "Category"}</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="productImg" class="form-label"
            >Product Image</label
          >
          <input
            type="file"
            class="form-control"
            id="productImg"
            placeholder="name@example.com"
            value="${product.image ?? ""}"
          />
        </div>
      </div>
    </div>
    <button class="btn btn-primary">Update product</button>
  </form>
</div>
  `;

  return template
};

export default productsEdit;