import React from 'react';
import {useRouter} from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import safeJsonStringify from "safe-json-stringify";
  import { db, } from "../../firebase";
const Proid = ({product}) => {

const router = useRouter();

    const { proid } = router.query;





    return (
        <div>
        
        {product?.name}
        {product?.id}
        </div>
    );
}

export default Proid;




export async function getServerSideProps(context) {
    const id = context.params.proid;
    const snapshot = await getDoc(doc(db, 'Pro3', id));
  
    const productdata = snapshot.data();
  
    if (!productdata) {
      return {
        notFound: true,
      };
    }
  
   // productdata.id = snapshot.id;
    
    // strignfy the data
    const product = JSON.parse(
        safeJsonStringify({ id: snapshot.id, ...snapshot.data() }) // needed for dates
      )
  
    return {
      props: { product },
    };
  }