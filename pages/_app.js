import '../styles/globals.css'
import { wrapper } from "../store/index";
import Context from '../context/index'


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux( MyApp);
