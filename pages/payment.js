import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
// import Link from 'next/link'
import CheckoutWizard from '../components/CheckoutWizard'
import { useRouter } from 'next/router'
import { Store } from '../utils/Store'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Banner from '../components/Banner'
import Link from 'next/link'

function PaymentScreen() {

    const router = useRouter();
    const {state , dispatch} = useContext(Store);
    const {cart} = state;
	
    const {shippingAddress , paymentMethod , cartItems} = cart;
    const [selectedPaymentMethod , setSelectedPaymentMethod] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();

        if(!selectedPaymentMethod){
            return toast.error('Payment method is required');
        }

        dispatch({type : 'SAVE_PAYMENT_METHOD' , payload : selectedPaymentMethod});
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod : selectedPaymentMethod,
            })
        );

        router.push('/placeorder');
    };

    useEffect(() => {
        if(!shippingAddress.address){
            router.push('/shipping');
        }
        setSelectedPaymentMethod(paymentMethod || '');
    },[paymentMethod, router, shippingAddress.address]);
 
  return (
    <Layout title="Payment Method" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
			<Banner bannerText="Payment Method" />

            {/* <!-- WISHLIST-AREA START --> */}
			<div className="shopping-cart-area pt-80 pb-80">
				<div className="container">	
					<div className="row">
						<div className="col-lg-12">
							<div className="shopping-cart">
								{/* <!-- Nav tabs --> */}
								<CheckoutWizard  activeStep={3}/>

								{cartItems.length === 0 ? (
									<div className="row">
                                        <div className="col-lg-12">
                                            <div className="error-content text-center">
													<Image width={284} height={119} src="/img/bg/emptycart.png" alt="" />
													<h3 className="text-light-black mt-30">Your cart is currently empty!</h3>
													<p className="text-light-black">Before procced to checkout you must add some products to your shopping cart <br/> you will find a lot of interesting products on our "Shop" page</p>
													<Link href="/shop"><a style={{color:'#fff'}} className="button-one submit-btn-4 go-to-home text-uppercase "  data-text="CONTINUE SHOPPING" >CONTINUE SHOPPING</a></Link>
                                            </div>
                                        </div>
                                    </div>
								) : (
								<div className="tab-content">
									{/* <!-- check-out start --> */}
									<div className="tab-pane active" id="check-out">
										<form onSubmit={submitHandler}>
											<div className="shop-cart-table check-out-wrap">
												<div className="row">
													
													<div className="col-md-12 prt-150 plt-150">
														<div className="billing-details  ">
															<h4 className="title-1 title-border text-uppercase mb-30">Payment Method</h4>
															
                                                            <div className="payment-accordion">
                                                                {/* <!-- Accordion start --> */}
																<h3 className="payment-accordion-toggle active">PayPal</h3>
																<div className="payment-content default">
                                                                    <label className='l-radio'>
		                                                            	<input type="radio" name="paymentMthod" id="paypal" checked={'paypal' === selectedPaymentMethod} onChange={() => setSelectedPaymentMethod('paypal')}/>
		                                                            	<span>Paypal</span>
		                                                            </label>
																	<p>Pay via PayPal, you can pay with your credit or debit card if you don’t have a PayPal account.</p>
																	<a ><img src="/img/payment/1.png" alt="" /></a>
																	<a ><img src="/img/payment/3.png" alt="" /></a>
																	<a ><img src="/img/payment/4.png" alt="" /></a>
																</div>
																{/* <!-- Accordion end -->  */}
																{/* <!-- Accordion start  --> */}
																<h3 className="payment-accordion-toggle ">Razorpay</h3>
																<div className="payment-content ">
                                                                    <label className='l-radio' >
		                                                            	<input type="radio" name="radio" id="razorpay" checked={'razorpay' === selectedPaymentMethod} onChange={() => setSelectedPaymentMethod('razorpay')} />
		                                                            	<span>Razorpay</span>
		                                                            </label>
																	<p>Pay via Razorpay, you can pay with your upi id or cards, recommended for indian users</p>
																	<a ><img src="/img/payment/2.png" alt="" /></a>
																	<a ><img src="/img/payment/5.png" alt="" /></a>
																	<a ><img src="/img/payment/3.png" alt="" /></a>
																	<a ><img src="/img/payment/4.png" alt="" /></a>
																</div> 
																{/* <!-- Accordion end --> */}			
															</div>	

															<div style={{display:'flex'}}>
																<Link href="/shipping"><a style={{marginRight : 'auto'}}  className="button-one submit-button mt-15" data-text="back" >back</a></Link>
																<button   className="button-one submit-button mt-15" data-text="next" type="submit">Next</button>
															</div>
														</div>
													</div>
													
													{/* <!-- payment-method --> */}
													
												</div>
											</div>
											
										</form>											
									</div>
									{/* <!-- check-out end --> */}
								</div>

								)}

							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- WISHLIST-AREA END --> */}
    </Layout>
  )
}

PaymentScreen.auth = true;
export default PaymentScreen;