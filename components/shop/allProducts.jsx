import React from 'react';
import { useAuth } from '../../context/index';
import { useEffect, useState } from 'react';
const AllProducts = () => {


const {   } = useAuth();
const [products, setProducts] = useState([]);

useEffect(() => {




}, [])



    return (
        <div>
            <h1>
                all products
            </h1>
        </div>
    );
}

export default AllProducts;
