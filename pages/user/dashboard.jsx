import React from 'react';
import {useAuth} from '../../context/index'
import Layout from '../../components/layout';
const Dashboard = () => {

const {userinfo} = useAuth();
const description = `Welcome ${userinfo?.name}`;

    return (

<Layout
    title="User Page"

    description = {description}


>
<div>

user page

</div>



</Layout>

       
    );
}

export default Dashboard;
