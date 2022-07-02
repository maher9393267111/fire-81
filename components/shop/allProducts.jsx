import React from 'react';
import { useAuth } from '../../context/index';
import { useEffect, useState } from 'react';
const AllProducts = () => {


const {AllProducts   } = useAuth();
const [products, setProducts] = useState([]);

useEffect(() => {

AllProducts().then(res => {
    setProducts(res);
})


}, [])



    return (
        <div>
            <h1>
                all products  {products.length}
            </h1>
        </div>
    );
}

export default AllProducts;
