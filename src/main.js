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
  "/cart&checkout": () => {
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

router.on({
  "/admin": () => {
    render(()=>adminLayout(dashboard()), app)
  },
  "/admin&products": () => {
    render(()=>adminLayout(products()), app)
  },
  "/admin&productsAdd":() => {
    render(()=>adminLayout(productsAdd()), app)
  },
  "/admin&productsEdit=:id": ({data}) => {
    render(()=>adminLayout(productsEdit(data)), app)
  },
  "/admin&categories": () => {
    render(()=>adminLayout(category()), app)
  },
  "/admin&categoriesAdd": () => {
    render(()=>adminLayout(categoryAdd()), app)
  },
  "/admin&categoriesEdit=:id": ({data}) => {
    console.log('data rorting', data)
    render(()=>adminLayout(categoryEdit(data)), app)
  }
})

router.notFound(() => render(notFound, app));

router.resolve();
