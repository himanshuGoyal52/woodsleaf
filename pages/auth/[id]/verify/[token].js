import React, { useEffect, useState } from 'react'
import Layout from '../../../../components/Layout'
import Banner from '../../../../components/Banner'
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function EmailVerifyScreen() {
    const [validUrl , setValidUrl] = useState(false);
    const {query} = useRouter();
    const router = useRouter();

     useEffect(() => {
        const verifyEmailUrl = async () => {
            try{
                console.log('once only');
                const url = `${process.env.NEXT_PUBLIC_URL}/api/auth/${query.id}/verify/${query.token}`;
                const {data} = await axios.post(url , {
                    token : query.token,
                    id : query.id,
                });
                if(data.user.verified){
                    setValidUrl(true);
                }
            }catch(err){
                setValidUrl(false);
            }
        }
        if(query.token !== undefined && query.id !== undefined){
            verifyEmailUrl();
        }
    },[query])


  return (
    <Layout title="Email Verified" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">

    <Banner bannerText="Email Verified" />

    {/* <!-- 404-AREA START --> */}
      <div className="area-404 pt-80 pb-80">
          <div className="container">	
              <div className="row">
                  <div className="col-lg-12">   
                    {validUrl ? (
                        <div className="error-content text-center">
                            <Image width={284} height={119} src="/img/bg/verified.png" alt="Verified!!" />
                            <h4 className="text-light-black mt-60">Welcome to Dcraftive!!</h4>
                            <p className="text-light-black">Your email is verified, please login into your account</p>
                            <Link href="/login"><a style={{color:'#fff'}} className="button-one submit-btn-4 go-to-home text-uppercase "  data-text="Login" >Login</a></Link>
                        </div>
                    ) : (
                        <div className="error-content text-center">
                            <Image width={284} height={119} src="/img/bg/error.png" alt="Not Verified" />
                            <h4 className="text-light-black mt-60">Something went wrong!!</h4>
                            <p className="text-light-black">Your email is not verified, please reload</p>
                            <a onClick={() => {router.reload()}} style={{color:'#fff' , cursor : 'pointer'}} className="button-one submit-btn-4 go-to-home text-uppercase "  data-text="Reload" >Reload</a>
                        </div>
                    )}
                  </div>
              </div>
          </div>
      </div>
      {/* <!-- 404-AREA END --> */}
</Layout>
  )
}
