import { useEffect, useState } from "@/utils";
import style from "../css/admin.module.css";
import productAPI from "@/api/productApi";
import { messageDelete } from "@/components";

const products =  () => {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await productAPI.getProducts();
        setData(response.data);
      } catch (error) {
          console.log(error);
      }
    })()
    }, []);

    useEffect(() => {
      const btnsDelete = document.querySelectorAll(".btn-danger");
      btnsDelete.forEach(btn => {
        btn.addEventListener('click', async  function ()  {
          let productID = this.dataset.id;
          try {
            if (!(await messageDelete())) return
            await productAPI.deleteProduct(productID);
            let newProduct = data.filter((item) => item.id != productID);
            setData(newProduct);
          } catch (error) {
            console.log(error)
          }
        });
      });
    }, [data]);

    
  
  const template = `
      <table class="table caption-top">
          <thead>
            <tr class=${style.headTable}>
              <th scope="col">ID</th>
              <th scope="col">Name product</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th> <ion-icon name="cog-outline"></ion-icon></th>
            </tr>
          </thead>
          <tbody>
          ${data?.map((product, index) =>`
              <tr class=${style.headBody}>
                <td>${product.id}</td>
                <td style="width: 400px">${product.title}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td>
                  <button data-id=${product.id} type="button" class="btn btn-danger">DELETE</button>
                  <a  href=/admin&productsEdit=${product.id} type="button" class="btn btn-primary">EDIT</a>
                </td>
              </tr>
          `).join("")}
          </tbody>
        </table>
  `
  return template
};

export default products;