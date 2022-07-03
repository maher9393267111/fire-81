import React from 'react';
import { Card } from "antd";
import {Rate} from "antd";
import {Cart}  from "../../context/cartContext"
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import  Link  from "next/link";

const { Meta } = Card;
const CardComponent = ({product ,show=false,category ,relate=false}) => {

    const { images, name, desc, id } = product;


// add to cart single time
const {addtocart} = Cart();




    return (
        <div>
           
           <>
           <div>
     <div className={ ` ${!show ? 'w-[600px] mx-auto h-auto pb-20' : 'lg:h-[477px] sm:h-[366px] '}  rounded   overflow-hidden shadow-lg`}>

{ images?.length > 0  &&

   <img  className="w-full lg:h-[200px] sm:h-[130px] object-contain" src={images[0]?.image} alt="Sunset in the mountains"/>
}


   <div className="px-6 py-4">
     <div className="font-bold text-xl ">
        
        <div className=" text-center mt-2 ">
            <p>{product?.name}</p>
        </div>
   



        {/* <p className= "  sm:text-sm lg:text-lg text-center">
        { desc &&  desc?.slice(0,40)}
    </p> */}
   </div>
  <div className={ ` px-6  ${!show ? 'w-full' : ''}   pb-2`}>

<div className=" text-center">
    <p className=" font-bold">{product.price}$</p>
</div>

{/* ----rating stars show-- */}

<div className=" w-full">
  <h1 className=" ml-4 text-center">
  <Rate allowHalf disabled defaultValue={ product.rating?.length} />
  </h1>
</div>


{/* in single product page */}

{!show && (<div className='flex justify-center'> <p className='text-md font-bold'>Category</p> <span className='ml-6 inline-block'>{category?.name}</span> </div>)}

{!show && (<div className='flex justify-center'> <p className='text-md font-bold'>Quantity</p> <span className='ml-6 inline-block font-bold text-red-600'>{product?.quantity}</span> </div>)}



{/* // flex icons- */}

<div className={ `  ${show ? 'flex' : "text-center "}  ml-4   justify-between gap-4`}>

<div>
    <img
    
    onClick={()=>addtocart(product)}
    className={ ` ${ show ? '' : 'inline-block '} w-10 h-10  object-contain cursor-pointer rounded-b-full`} src="https://cdn2.iconfinder.com/data/icons/commerce-shadow/100/.svg-3-256.png"/>

<p
  

className={` ${show ? 'text-[12px]' : "text-[18px] font-bold "} cursor-pointer `}>Add to cart</p>
</div>

{show && (

<Link href={`/product/${id}`}><a >

 <div> 
 
    <img
    className=" w-10 h-10  object-contain rounded-b-full"
    src="https://cdn1.iconfinder.com/data/icons/applicon-sty-3/512/seen-128.png" alt="" />

 <p className="text-[10px]">View Product</p> 

 </div>  
</a></Link>
)}



</div>

{/* // end flex icons  */}


   </div>
 </div>
    </div>
</div>
           
           
           </>



        </div>
    );
}

export default CardComponent;
