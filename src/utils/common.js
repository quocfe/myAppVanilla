// update quatity local
const message = document.querySelector(".message p");
const quatity = JSON.parse(localStorage.getItem('id'))
message.innerText = quatity?.length ?? 0

