// // id
// import { useEffect, useState } from '@/utils';
// import { useQuantity } from '@/hooks';
// import { cart } from '@/pages/client';


// const useAddToCart = (prdID) => {
//   const idLocal = JSON.parse(localStorage.getItem('id'))
//   const currentIDInitial = idLocal != null ?  JSON.parse(localStorage.getItem('id')) : [];
//   const [currentID, setCurrentID] = useState(currentIDInitial);

//     console.log('useAddToCart')
//     console.log('currentID', currentID)

//       if (!(idLocal === null)) {
//         let newPrdID = [...idLocal];
//         console.log('1')
//         newPrdID.push(prdID)
//         setCurrentID(newPrdID);
//         useQuantity(newPrdID)
//       } else {
//         console.log('2')
//         setCurrentID((prevID) => [...prevID, prdID]);
//         useQuantity(currentID)
//       }

//     useEffect(() => {
//       if (currentID?.length === 0) {
//         console.log('3')
//         cart(JSON.parse(localStorage.getItem('id')))
//       } else {
//         console.log('4')
//         cart(currentID)
//       }

//     }, [currentID])

// };

// export default useAddToCart;