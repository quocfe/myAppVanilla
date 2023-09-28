// update number no load
const useQuantity = (quantity) => {
  let number = quantity?.length + 1
  const message = document.querySelector(".message p")
  message.innerText = number ?? 0
};

export default useQuantity;