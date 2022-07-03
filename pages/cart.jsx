import React from 'react';
import {doc} from 'firebase/firestore';
import {db} from '../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuth } from '../context';
import {Cart} from '../context/cartContext'
const CartPage = () => {


    const { userinfo } = useAuth();
    const {addtocart,cartdata,cartinfo, deleteProduct,increasequantity, Decreasequantity  } = Cart();

// cart in realtime
const [userdata] = useDocumentData(doc(db, "usmaher", `${userinfo?.email}`),  {
    snapshotListenOptions: { includeMetadataChanges: true,idField: 'id'},
  });




    return (
        <div>
<div>


{/* ---grid ccart items and checkout--- */}


<div className=' grid grid-cols-12'>



{/* ----cart items in carts---- */}

<div className=' col-span-8'>
 

    { userdata?.cart?.length > 0 &&   userdata?.cart?.map((item) => {

return (

    <div key ={item.id}>

{/* content-- */}

<div className=' min-h-[444px]   shadow-2xl my-8 mx-6  border-2 w-[1/3] '>


{/* ---image-- */}

<div className=' w-full h-[78%]'>
    <img  className='w-full h-[300px] object-contain' src={item.image} alt="" />
</div>

{/* --ingfo--- */}
<div>

<div>


{/* ---price-- */}

<div>
    <p className='font-bold text-xl ml-12'>Price: {item.price}</p>
</div>

{/* ----QUantity -- */}

<div className='font-bold text-xl ml-12'>
    <div className=' flex justify-between'>
        <div>
            <p>Quantity: {item.quantity}</p>
        </div>

{/* --Remove from cart-- */}

<div>
    <h1>
        <button
        type="submit"
        onClick={()=> deleteProduct(item.id) }
        
        className=' text-center bg-red-500 rounded-full text-white p-2 -mt-6 mr-4'>Remove From Cart</button>
    </h1>
</div>

    </div>


{/* - increase or decrease quantity---- */}

<div>

<div>


<div className=' flex gap-8'>

{/* ---- decrease quantity-- */}

<div>

<p onClick={() => increasequantity(item)}>
                      <img
                        className=" w-6 h-6 rounded-full"
                        src="https://cdn3.iconfinder.com/data/icons/basicolor-arrows-checks/24/163_plus_add_new-128.png"
                        alt=""
                      />
                    </p>


</div>




{/* quantity---- */}

<div>
    <p><p>{item.quantity}</p></p>
</div>


{/* -----decrease----- */}

<div>
                      <p onClick={() => Decreasequantity(item)}>
                        <img
                          className=" w-6 h-6 rounded-full"
                          src="https://cdn3.iconfinder.com/data/icons/user-interface-buttons/64/_Delete-256.png"
                          alt=""
                        />
                      </p>
                    </div>




</div>




</div>






</div>




    
</div>



</div>




</div>



</div>



        
    </div>
)})}



{/* -------if cart is empty-----  */}
{ userdata?.cart?.length === 0 && (

<div>


<div>
    <h1 className=' mt-24 ml-24 text-2xl'>Cart is Empty</h1>
</div>

</div>

)}





</div>




{/* ----checkout sidebar--- */}


<div className=' col-span-4'>



</div>








</div>









</div>






        </div>
    );
}

export default CartPage;
