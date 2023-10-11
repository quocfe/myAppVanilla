// update number no load
const useQuantity = (quantity) => {
  let number = quantity?.length
  
  const messages = document.querySelectorAll(".message p")

  messages.forEach(message => {
    message.innerText = number ?? 0
  })

};

export default useQuantity;