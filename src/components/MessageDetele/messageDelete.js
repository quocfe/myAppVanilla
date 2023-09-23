import  Swal  from 'sweetalert2';

const messageDelete = async  () => {
  return await  Swal.fire({
    title: 'DELETE',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then( async (result) => {
    if (result.isConfirmed) {
      await Swal.fire({
        title: 'Deleted!',
        icon: 'success',
      })
    } 
  })
};

export default messageDelete;