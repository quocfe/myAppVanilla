import { useEffect, useState } from "@/utils";
import style from "../css/admin.module.css";
import categoryApi from "@/api/categoryApi";
import { messageDelete } from "@/components";


const category = () => {

  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    try {
      const response = await categoryApi.getCategories();
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }, [])  

  useEffect(() => {
      const btnsDelete = document.querySelectorAll(".btn-danger");
      btnsDelete.forEach((btnDelete) => {
      btnDelete.addEventListener("click", async function  () {
        const cateID = this.dataset.id;
        try {
            if (!(await messageDelete())) return
            await categoryApi.deleteCategory(cateID);
            const newCate = categories.filter((item) => item.id != cateID);
            setCategories(newCate);
          
        } catch (error) {
          console.log(error)
        }
      })
    })
  })



  const template = `
      <table class="table caption-top">
          <thead>
            <tr class=${style.headTable}>
              <th >ID</th>
              <th style="width: 400px" >Name category</th>
              <th> <ion-icon name="cog-outline"></ion-icon></th>
            </tr>
          </thead>
          <tbody class=${style.headBody}>
          ${categories.map((cate) => `
              <tr class=${style.headBody}> 
                <td>${cate.id}</td>
                <td>${cate.name}</td>
                <td>
                  <button data-id=${cate.id} type="button" class="btn btn-danger">DELETE</button>
                  <a  href=/admin&categoriesEdit=${cate.id} type="button" class="btn btn-primary">EDIT</a>
                </td>
              </tr>
              `
            ).join(" ")}
          </tbody>
        </table>
  `
  return template
};

export default category;