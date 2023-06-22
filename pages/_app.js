import '../styles/bootstrap.min.css'
import '../styles/animate.min.css'
// import '../styles/jquery-ui.min.css'
import '../styles/meanmenu.min.css'
import '../styles/lib/css/nivo-slider.css'
import '../styles/lib/css/preview.css'
import '../styles/slick.min.css'
import '../styles/material-design-iconic-font.css'
import '../styles/default.css'
import '../styles/globals.css'
import '../styles/shortcode.css'
import '../styles/responsive.css'
import '../styles/hamburger.css'
import { StoreProvider } from '../utils/Store'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function MyApp({ Component, pageProps :{session , ...pageProps}, }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
        {Component.auth ? (
          <Auth adminOnly={Component.auth.adminOnly}>
            <Component {...pageProps} />
          </Auth>
        ) : 
         ( <Component {...pageProps} />)
        }
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  )
}

/* video 18  */
function Auth({children , adminOnly}) {
  const router = useRouter();
  const { status , data : session } = useSession({
    required : true,
    onUnauthenticated() {
      router.push('/unauthorized?message=Login required')
    }
  });
  if(status === 'loading'){
    return (
      <div className="LoadingGif">
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 p-50">
                    <img src="/img/loader.gif" alt="Loading..." style={{width:'25%' ,height:'25%'}}/>
                </div>
            </div>
        </div>
      </div>
    );
  }
  if(adminOnly && !session.user.isAdmin){
    router.push('/unauthorized?message=Admin login required')
  }
  return children;
}

export default MyApp
