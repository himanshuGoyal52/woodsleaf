import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header'
import QuickView from './quickView'
import { useRouter } from 'next/router'
import { initializeBootstrap, initializeCountDown, initializeHome, initializeJquery, initializeJqueryMigrate, initializeJqueryUI, initializeMain, initializeMeanMenu, initializeNiceScroll, initializeNivoSlider, initializePlugin, initializeSlick, initializeTreeview, initializeWOW } from './jquery/initializeJquery'
import Loading from './Loading'


function Layout({children , title , desc , productObj , addToCart , your_products}) {
  const router = useRouter();

  const [loading , setLoading] = useState(false);

  useEffect(() => { 
      const jquery = async () =>{
        
      setLoading(true);
        await initializeJquery();
        await initializeJqueryMigrate();
        await initializeBootstrap();
        await initializeMeanMenu();
        await initializeSlick();
        await initializeTreeview();
        // await initializeLightBox();
        await initializeJqueryUI();
        await initializeNivoSlider();
        await initializeHome();
        await initializeNiceScroll();
        await initializeCountDown();
        await initializeWOW();
        await initializePlugin();
        await initializeMain();
        setLoading(false);
      }
      jquery();
  } , [router.asPath , router.events , router.query])

  return (
    <>
        <Head>
            <title>{title ? title + " - Woodsleaf": "Woodsleaf.com"}</title>
            <meta name="description" content={desc} />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:title" content={title ? title + " - Woodsleaf": "Woodsleaf.com"} />
            <meta
              property="og:description"
              content={desc}
            />
            <meta
              property="og:image"
              content='/laptopHeader.png'
            />
		      
            <meta name="google-site-verification" content="h8Kz2NHxSyGVnfssLvIxqCQYSc6L0vn0XYAxZvbjoW4" />
        </Head>
        {loading ? <Loading /> : `` }

      <ToastContainer position="bottom-center" limit={1} toastStyle={{ backgroundColor: "#e4e0d3" }}/>
      <div className="wrapper bg-dark-white">
          <Header title={title} />
          <main>
              {children}
          </main>
          <Footer title = {title} your_products={your_products}/>
          <QuickView  product={productObj} addToCart={addToCart}/>
      </div>


        
    </>
  )
}

export default Layout;
