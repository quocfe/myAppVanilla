import { useLocalStorage } from "@/hooks"
import { useEffect } from "@/utils"

const clientLayout = (page) => {
  const [user, setUser] = useLocalStorage('user', '')
  useEffect(() => {
    const bodyTag = document.querySelector("body")
    const userTag = document.querySelector(".header-icon")
    const userIconTag = document.querySelector(".icon-user");

    if (document.querySelector("#signin") || document.querySelector("#signup") || document.querySelector("#admin")) {
      bodyTag.querySelector('header').style.display = "none"
      bodyTag.querySelector('footer').style.display = "none"
    } else {
      bodyTag.querySelector('header').style.display = "block"
      bodyTag.querySelector('footer').style.display = "block"
    }
    // 
    if (user) {
      userTag.classList.add('login')
    } else {
      userTag.classList.remove('login')
    }
    // 
    userIconTag.classList.remove('show')
    userIconTag.addEventListener('click', function () {
      this.classList.toggle('show')
    })
    // 
    
  })
  return `
    ${page}
  `
}

export default clientLayout;