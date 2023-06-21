import Link from 'next/link'
import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {

  const hrefArray = ['/login' , '/shipping' , '/payment' , '/placeorder'];
  
  return (
    <ul className="cart-page-menu nav row clearfix mb-30">
        {
            ['User Login' , 'Shipping Address' , 'Payment Method'  , 'Place order'].map((step , index) => {

              return <li key={step}><Link href={hrefArray[index]} ><a className={`${index+1 <= activeStep ? 'active': ''}`} >{step}</a></Link></li> 
            } 
        )}
    </ul>
  )
}
