import React from 'react';
import {useAuth} from '../../context/index';
import { useEffect,useState } from 'react';
import {useRouter} from 'next/router';
import { Divider, List, Typography } from 'antd';
const Dashboard = () => {

const {userinfo} = useAuth();
const router = useRouter();

useEffect(() => {

   if (userinfo?.role !== 'admin') {


      router.push('/');


   }

}, [userinfo]);



    return (
       <div>
    {userinfo.role}
    {userinfo.name}
       </div>
    );
}

export default Dashboard;
