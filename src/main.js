import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import 'sweetalert2/src/sweetalert2.scss'

import { render, router } from "./utils";
import { clientLayout,adminLayout } from "./pages/layout";
import { about, cart, checkout, homepage, shop, signIn, signUp } from "./pages/client";
import { category, categoryAdd, dashboard, products, productsAdd, productsEdit } from "./pages/admin";
import categoryEdit from './pages/admin/category/categoryEdit';

const app = document.querySelector("#app");

router.on("/", () => {
  render(() => clientLayout(homepage()), app);
});
router.on("/about", () => {
  render(() => clientLayout(about()), app);
});
router.on("/shop", () => {
  render(() => clientLayout(shop()), app)
});
router.on({
  "/cart": () => {
    render(() => clientLayout(cart()), app)
  },
  "/cart/:checkout": () => {
    render(() => clientLayout(checkout()), app)
  }
})
router.on("/login", ()=> render(() => clientLayout(signIn()), app));
router.on("/signup", ()=> render(() => clientLayout(signUp()), app))
router.on("/logout", ()=> {
  localStorage.removeItem("user")
  router.navigate('/')
})

// admin

router.on("/admin", () => {
  render(()=>adminLayout(dashboard()), app)
})
// product
router.on("/admin/products", () => {
  render(()=>adminLayout(products()), app)
})
router.on("/admin/products/add", () => {
  render(()=>adminLayout(productsAdd()), app)
})
router.on("/admin/products/:id/edit", ({data}) => {
  render(()=>adminLayout(productsEdit(data)), app)
})
// category
router.on("/admin/categories", () => {
  render(()=>adminLayout(category()), app)
})
router.on("/admin/categories/add", () => {
  render(()=>adminLayout(categoryAdd()), app)
})
router.on("/admin/categories/:id/edit", ({data}) => {
  render(()=>adminLayout(categoryEdit(data)), app)
})
// admin
router.notFound(() => render(notFound, app));

router.resolve();
