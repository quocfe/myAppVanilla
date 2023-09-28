import callAPI from './config';

const categoryApi = {
  getCategories () {
    const url = "/categories";
    return callAPI.get(url);
  },
  getCategory (id) {
    const url = `/categories/${id}`;
    return callAPI.get(url);
  },
  deleteCategory (id) {
    const url = `/categories/${id}`
    return callAPI.delete(url)
  },
  addCategory (category) {
    const url = `/categories`;
    return callAPI.post(url, category)
  },
  updateCategoy (category) {
    const cateID = category.id;
    const url = `/categories/${cateID}`;
    return callAPI.put(url, category);
  }

}

export default categoryApi