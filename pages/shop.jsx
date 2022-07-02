import React from 'react';
import Layout from '../components/layout';
import {useAuth} from '../context/index';
import { useEffect,useState } from 'react';
import AllProducts from '../components/shop/allProducts';
import Filterbar from '../components/shop/filterbar';
const Shop = () => {

const [categories, setCategories] = useState([]);
const {Categories,ProductsBySelectedCategories} = useAuth();

useEffect(() => {


    Categories().then(res => {
        console.log('cats',res);
        setCategories(res);

    })
}
    ,[])



useEffect(() => {
    const cararr =['HRhFymZCvRvOzKRdPj34']
    
    ProductsBySelectedCategories(cararr).then(res => {
console.log('✖✖✖✖',res);

    });

},[])




    return (

        <Layout
        title="Shop"
        description=" E-commerce App"
      >

        <div>

<div >

<div className=' my-12 mx-8'>


{/* -grid sidebar and products */}

<div className=' grid  grid-cols-12'>

{/* ---sidebar-- */}

<div className='col-span-3'>

    <Filterbar categories={categories}/>

</div>


{/* products--- */}

<div className=' col-span-9'>


<div>
    <AllProducts/>
</div>


</div>


</div>






</div>











</div>




        </div>
        </Layout>
    );
}

export default Shop;
