import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import Banner from '../components/Banner'

export default function Custom404() {
  return (
    <Layout title="404" desc="Sorry, But the page you are looking for does't exist">

        <Banner bannerText="404" />

        {/* <!-- 404-AREA START --> */}
          <div className="area-404 pt-80 pb-80">
              <div className="container">	
                  <div className="row">
                      <div className="col-lg-12">
                          <div className="error-content text-center">
                              <Image width={284} height={119} src="/img/bg/error.png" alt="" />
                              <h4 className="text-light-black mt-60">Ooops.... Error 404</h4>
                              <h5 className="text-light-black">Sorry, But the page you are looking for does't exist</h5>
                              <Link href="/"><a style={{color:'#fff'}} className="button-one submit-btn-4 go-to-home text-uppercase "  data-text="Go to home page" >Go to home page</a></Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/* <!-- 404-AREA END --> */}
    </Layout>
  )
}
