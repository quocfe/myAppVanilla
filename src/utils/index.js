import Navigo from "navigo";
const router = new Navigo("/", { linksSelector: "a", hash: true });

const render = (content, dir) => {
  dir.innerHTML = content()
}

export {render, router}