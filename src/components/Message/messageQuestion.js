import  Swal  from 'sweetalert2';

const messageQuestion = async  (title) => {
  return await  Swal.fire({
    title,
    text: "",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Add'
  }).then( async (result) => {
    if (result.isConfirmed) {
      await Swal.fire(`${title} successfully!`)
      return true
    } else if (result.isDismissed) {
      return false
    }
  })
};

export default messageQuestion;