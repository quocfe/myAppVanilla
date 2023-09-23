import categoryApi from "@/api/categoryApi";
import { useEffect } from "@/utils";

const categoryAdd = () => {

  useEffect(()=> {
    const form = document.querySelector(".form");
    const categoryName = document.querySelector("#categoryName");

    form.addEventListener("submit", (e) => {
      e.preventDefault()
      try {
        categoryApi.addCategory({
          name: categoryName.value
        });
      } catch (error) {
        console.log(error)
      }
    } )

  })

  const template = `
  <div class="addProducts">
  <form class="container form" enctype="multipart/form-data>
    <p class="title">Thêm mới danh mục</p>
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
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <div class="mb-3">
          <label for="categoryName" class="form-label"
            >Category name</label
          >
          <input
            type="text"
            class="form-control"
            id="categoryName"
            placeholder=""
          />
        </div>
      </div>
    </div>
    <button class="btn btn-primary">Add Category</button>
  </form>
</div>
  `
  return template
};

export default categoryAdd;