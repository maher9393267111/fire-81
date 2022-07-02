import '../styles/globals.css'
import { wrapper } from "../store/index";
import Context from '../context/index'
import Script from "next/script";
import React from 'react';
import Navbar  from '../components/dif/navbar'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
function MyApp({ Component, pageProps }) {
  return  (

    <React.Fragment>




<Context>
  <Navbar/>

<Component {...pageProps} />
</Context>

</React.Fragment>

  )
  
  
}

export default wrapper.withRedux( MyApp);
