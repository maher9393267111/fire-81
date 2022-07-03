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
    

<div>


{ related?.length > 0 && related?.map(product=>{

return  (

    <div>
        <h1>{product?.name}</h1>
    <Card product={product} show={true} key={product.id} />
    </div>
)})}


</div>



</div>

    );
}

export default RelatedProducts;
