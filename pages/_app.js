import '../styles/globals.css'
import { wrapper } from "../store/index";
import Context from '../context/index'
import Script from "next/script";


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
function MyApp({ Component, pageProps }) {
  return  (

    <React.Fragment>

<Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B2S28WESDV
            ', {
              page_path: window.location.pathname,
            });
                `}
      </Script>



<Context>

<Component {...pageProps} />
</Context>

</React.Fragment>

  )
  
  
}

export default wrapper.withRedux( MyApp);
