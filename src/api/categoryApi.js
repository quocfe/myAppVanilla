import callAPI from './config';

const categoryApi = {
  getCategories () {
    const url = "/categories";
    return callAPI.get(url);
  },
  deleteCategory (id) {
    const url = `/categories/${id}`
    return callAPI.delete(url)
  },
  addCategory (category) {
    const url = `/categories`;
    return callAPI.post(url, category)
  }
}

export default categoryApi