import React from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import Banner from '../components/Banner';
import Link from 'next/link';
import Image from 'next/image';

export default function Unauthorized() {
    const router = useRouter();
    const {message} = router.query;
  return (
    <Layout title="Access Denied" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
        <Banner bannerText="Access Denied" />
        {/* <!-- 404-AREA START --> */}
      <div className="area-404 pt-80 pb-80">
          <div className="container">	
              <div className="row">
                  <div className="col-lg-12">   
                    <div className="error-content text-center">
                        <Image width={284} height={119} src="/img/bg/accessDenial.png" alt="" />
                        <h4 className="text-light-black mt-60">{message}</h4>
                        <Link href="/login"><a style={{color:'#fff'}} className="button-one submit-btn-4 go-to-home text-uppercase "  data-text="Login" >Login</a></Link>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      {/* <!-- 404-AREA END --> */}
    </Layout>
  )
}
