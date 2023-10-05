
// slide show
// $(document).ready(function(){
//   $(".owl-carousel").owlCarousel({
//     loop:true,
//     margin:10,
//     nav:true,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:2
//         },
//         1000:{
//             items:3
//         }
//     }
//   });
// });
// end slide show

// window.addEventListener("DOMContentLoaded", ()=> {
//   const btnDropDowns = document.querySelectorAll("#shop .dropdown-toggle");
//   const checkboxStyle = document.querySelectorAll(".checkbox-style");
  
  
//   let currentOpenBtn = null;
  
//   btnDropDowns.forEach((btn) => {
//     btn.addEventListener('click', handleToggle);
//   });
  
//   function handleToggle(e) {
//     const currentBtn = e.target;
//     const nextEl = currentBtn.nextElementSibling;
  
//     if (currentOpenBtn && currentOpenBtn !== currentBtn) {
//       const previousEl = currentOpenBtn.nextElementSibling;
//       currentOpenBtn.classList.remove("show");
//       previousEl.classList.remove("show");
//     }
  
//     currentBtn.classList.toggle("show");
//     nextEl.classList.toggle("show");
  
//     currentOpenBtn = currentBtn;
//   }
  
//   let prevOpenBox = null
  
//   checkboxStyle.forEach((checkbox) => {
//     checkbox.addEventListener('click', handClickCheckBox)
//   })
  
//   function handClickCheckBox (e) {
//     if (prevOpenBox && prevOpenBox !== e.currentTarget) {
//       prevOpenBox?.classList.remove('checked');
//     };
  
//     e.currentTarget.classList.add('checked');
  
//     prevOpenBox = e.currentTarget;
//   };
  
//   $(".select-form").on('click', (e)=> {
//     if(e.currentTarget.classList.contains("show")) {
//         e.currentTarget.classList.remove("show")
//         e.currentTarget.classList.add("hidden")
//         $("ion-icon.select-icon").attr("name", "chevron-down-outline")
        
//     } else {
//         e.currentTarget.classList.remove("hidden")
//         e.currentTarget.classList.add("show")
//         $("ion-icon.select-icon").attr("name", "chevron-up-outline")
//     }
//   })  
  
//   // handleSearch



// })




