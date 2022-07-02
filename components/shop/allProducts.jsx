import React from 'react';
import { useAuth } from '../../context/index';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../cards/Card';
import { setsearchmode } from '../../store/global';
const AllProducts = () => {

const dispatch = useDispatch();
const {AllProducts ,searchedproducts,setSearchedproducts  } = useAuth();
const [products, setProducts] = useState([]);
//const [searcheProducts, setSearcheProducts] = useState([]);
const {searchMode} = useSelector((state) => state.global);

useEffect(() => {

AllProducts().then(res => {
    setProducts(res);
})


}, [searchMode])


// exit search mode

const exitSearchMode = () => {

    dispatch(setsearchmode(false));


}




    return (
        <div>
            <h1 className=' relative'>

<div className='absolute -top-2'>
<h4 
onClick={exitSearchMode}

className='  bg-blue-600  mx-4 rounded-full p-2 text-white font-bold'>ALL Products Show</h4>
</div>


<div className='my-12 text-center text-2xl font-bold'>




 {searchMode ?  (<div><h1>Filtered Products</h1></div>) : <div><h1>All Products</h1></div>  } 

</div>

<div>

<div>


{/* -----all products if searchMode is false------ */}


<div>

{!searchMode && (

<div>




<div className=' grid sm:grid-cols-2 lg:grid-cols-3'>

{products.map((product) => (

<div key={product.id}>
<Card product={product} />
</div>

))}

</div>


</div>



)}



</div>




{/* -----Searched products Mode if searchMode is True------ */}


<div>

{searchMode && (

<div>
<div className='grid  sm:grid-cols-2 lg:grid-cols-3'>
    
{searchedproducts.map((product) => (

<div key={product.id}>
<Card product={product} />
</div>

))}

</div>



</div>



)}


</div>












</div>
</div>







                 
            </h1>
        </div>
    );
}

export default AllProducts;
