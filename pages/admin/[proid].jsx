import React from 'react';
import {useRouter} from 'next/router';
import { doc, getDoc } from 'firebase/firestore';

  import { db, } from "../../firebase";
const Proid = ({product}) => {

const router = useRouter();

    const { proid } = router.query;





    return (
        <div>
        
        {product?.name}
        </div>
    );
}

export default Proid;




export async function getServerSideProps(context) {
    const id = context.params.proid;
    const snapshot = await getDoc(doc(db, 'Pro3', id));
  
    const product = snapshot.data();
  
    if (!product) {
      return {
        notFound: true,
      };
    }
  
    product.id = snapshot.id;
  
    return {
      props: { product },
    };
  }