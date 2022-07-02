import React from 'react';
import {useAuth} from '../../context/index'
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import {useEffect,useState} from 'react';
import UserLinks from '../../components/user/userLinks';

const Dashboard = () => {
const router = useRouter();
const {userinfo} = useAuth();
const description = `Welcome ${userinfo?.name}`;


useEffect(()=>{
console.log('rendering✴✴✴');
if ( !userinfo?.name) {
  router.push('/auth/login');
}

},[userinfo])



    return (

<Layout
    title="User Page"

    description = {description}


>
<div>

<div className=' grid grid-cols-12 my-8'>


{/* -------user Links --- */}

<div className=' col-span-4'>

<div>

    <UserLinks userid ={userinfo.id} />

</div>



</div>


<div  className=' col-span-8 '>



<div className=' border-2 border-black min-h-[250px] w-[455px] '>


<div>

{/* ---heade- */}

<div className=' text-xl border-2  '>
<h1 className='mt-2 ml-4'>User information</h1>

</div>


<div className='border-b-2'>
<p className='text-md ml-4 mt-4 font-bold'>{userinfo?.name}</p>
</div>


<div className='border-b-2'>
<p className='text-md ml-4 mt-4 font-bold'>{userinfo?.email}</p>
</div>


<div className='border-b-2'>
<p className='text-md ml-4 mt-4 font-bold'>Registered User</p>
</div>








</div>


</div>

</div>





</div>







</div>



</Layout>

       
    );
}

export default Dashboard;
