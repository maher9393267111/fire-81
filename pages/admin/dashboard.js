import React from 'react';
import {useAuth} from '../../context/index';
const Dashboard = () => {

const {userinfo} = useAuth();

    return (
       <div>
    {userinfo.role}
    {userinfo.name}
       </div>
    );
}

export default Dashboard;
