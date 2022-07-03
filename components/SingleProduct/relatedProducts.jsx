import React from 'react';
import { useAuth } from '../../context/index';
import Card from '../cards/Card'
import {useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setProducts } from '../../store/global';
const RelatedProducts = ({product,categoryid}) => {

const  { RealatedProducts,related } = useAuth();
//const [related,setRelated] = useState([]);
const dispatch = useDispatch();
const {products} = useSelector((state) => state.global);

useEffect(()=>{

    RealatedProducts(product.name,categoryid)
  

},[])


    return (
       
<div>
    

<div className=' grid sm:grid-cols-1 lg:grid-cols-2'>


{ related?.length > 0 && related?.map(product=>{

return  (

    <div key={product.id} className='w-[400px]'>
        <h1>{product?.name}</h1>
    <Card product={product} relate={true} show={true} key={product.id} />
    </div>
)})}


</div>



</div>

    );
}

export default RelatedProducts;
