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
const [limit, setLimit] = useState(2);
//const [searcheProducts, setSearcheProducts] = useState([]);
const {searchMode} = useSelector((state) => state.global);

useEffect(() => {

AllProducts(limit).then(res => {
    setProducts(res);
    console.log('✖✖✖✖  Refetching');
})


}, [searchMode,limit])


// exit search mode

const exitSearchMode = () => {

    dispatch(setsearchmode(false));


}



// show more products

const showMore = () => {

setLimit(limit + 2);
console.log("limit",limit);

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

<div className='my-6 mx-6' key={product.id}>
<Card product={product} />
</div>

))}

</div>


<div className='my-12'>

<div>
    <h1 className='text-center'>
        <button
        
        onClick={showMore}
        className='rounded-full bg-black text-white font-bold text-center p-2 w-[200px]'>Show More</button>
    </h1>
</div>

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

<div className='my-6 mx-6' key={product.id}>
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
