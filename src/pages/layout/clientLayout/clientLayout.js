import footer from "./footer";
import header from "./header";

const clientLayout = (page) => {
  
  return `
    ${header}
    ${page}
    ${footer}
  `
}

export default clientLayout;