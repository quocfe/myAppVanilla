import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import { render, router } from "./utils";
import { about, footer, header, homepage, notFound } from "./pages";
import { dashboard } from "./admin";

const app = document.querySelector("#app");

const clientLayout = (page) => {
  return `
    ${header}
    ${page}
    ${footer}
  `
}



router.on("/", () => {
  render(()=>clientLayout(homepage()), app);
});
router.on("/about", () => {
  render(()=>clientLayout(about()), app);
});
router.on("/admin/dashboard", () => {
  render(dashboard, app)
})
// admin
router.notFound(() => render(notFound, app));

router.resolve();
