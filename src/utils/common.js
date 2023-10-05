
// update quatity local
const messages = document.querySelectorAll(".message p");
const quatity = JSON.parse(localStorage.getItem('id'))
messages.forEach(message => {
  message.innerText = quatity?.length ?? 0
})

// scroll header

const header = document.querySelector(".header-navigation");
const search1 = document.querySelector(".search-form-1");

const toggleClass = "sticky";

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 150) {
    header.classList.add(toggleClass);
  } else {
    header.classList.remove(toggleClass);
  }
  if (header.classList.contains(toggleClass)){
    search1.style.display = "none"
  } 
});

//  

// search toggle 

const searchBtns = document.querySelectorAll(".search-btn")
searchBtns.forEach((searchBtn) => {
  searchBtn?.addEventListener("click", (e)=> {
    const searchForm = e.currentTarget.parentElement;
    searchForm.classList.toggle("show")
  })
})

// get current day


// 






