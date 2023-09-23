import callAPI from "./config";

const productAPI = {
  getProducts () {
    const url = "/products";
    return callAPI.get(url);
  },
  getProduct (id) {
    const url = `/products/${id}`;
    return callAPI.get(url)
  },
  deleteProduct (id) {
    const url = `/products/${id}`;
    return callAPI.delete(url);
  },
  addProduct (product) {
    const url = "/products";
    return callAPI.post(url, product)
  },
  updateProduct (product) {
    const productID = product.id;
    const url = `/products/${productID}`;
    return callAPI.put(url, product)
  }
  
  
}




export default productAPI;