import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard'
import { Store } from '../utils/Store'
import Image from 'next/image';
import {  useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';
import Banner from '../components/Banner';
import Link from 'next/link';

export default function PlaceOrderScreen() {
	const {state , dispatch} = useContext(Store);
	const {cart} = state;
	const router = useRouter();
	const {cartItems , shippingAddress , paymentMethod} = cart;

	const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
	const itemsPrice = round2(cartItems.reduce((a,c) => a+c.quantity * c.price,0));
	const taxPrice = round2(itemsPrice * 0.18);
	const totalPrice = round2(taxPrice + itemsPrice);

	const [USDtoINR , setUSDtoINR] = useState({rate : 82.45});
	useEffect(()=>{
		const getusdtoinr =  async () => {
			try{
				const _data = await axios.get('https://anyapi.io/api/v1/exchange/convert?base=USD&to=INR&amount=1&apiKey=2jkrf9duc2gab4gdrcbek8vbhmmuc7u9gt9erh17f09o87q758kla9o' ,{
				  headers : {
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				  }
				});
				setUSDtoINR(_data);
			}catch(err){
				setUSDtoINR({rate : 82.45});
			}
		}
		getusdtoinr();
	},[])
	
	useEffect(() => {
		if(!paymentMethod){
			router.push("/payment");
		}
		
	},[paymentMethod, router])

	
	let totalPriceINR = round2(totalPrice * USDtoINR.rate);
	let totalPriceUSD = round2(totalPrice / USDtoINR.rate);

	const [loading , setLoading] = useState(false);

	const placeOrderHandler = async () => {
		try{
			setLoading(true);
			const {data} = await axios.post('/api/orders' , {
				orderItems : cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				totalPrice,
				totalPriceINR,
				totalPriceUSD,
			});
			setLoading(false);
			dispatch({type : "CART_CLEAR_ITEMS"});
			Cookies.set(
				'cart' ,
				JSON.stringify({
					...cart,
					cartItems : [],
				})
			)

			router.push(`/order/${data._id}`);
		}catch(err){
			setLoading(false);
			toast.error(getError(err));
		}
	}

  return (
	<Layout title="Place Order" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
			<Banner bannerText="place order" />

			{/* <!-- WISHLIST-AREA START --> */}
			<div className="shopping-cart-area pt-80 pb-80">
				<div className="container">	
					<div className="row">
						<div className="col-lg-12">
							<div className="shopping-cart">
								<CheckoutWizard  activeStep={4}/>

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
										<div  className="tab-pane active" id="order-complete">
										<form action="#">
											
											<div  className="shop-cart-table check-out-wrap">
												<div  className="row">
													<div  className="col-md-6">
														<div  className="our-order payment-details pr-20">
															<h4  className="title-1 title-border text-uppercase mb-30">Your order</h4>
															<table>
																<thead>
																	<tr>
																		<th><strong>Product</strong></th>
																		<th  className="text-end"><strong>Total</strong></th>
																	</tr>
																</thead>
																<tbody>
																	{
																		cartItems.map((item) => (
																			<tr key={item.slug}>
																				<td>{item.name}  x {item.quantity}</td>
																				<td  className="text-end">${item.price * item.quantity}</td>
																			</tr>
																		))
																	}
																	<tr>
																		<td>Cart Subtotal</td>
																		<td  className="text-end">₹ {itemsPrice}</td>
																	</tr>
																	
																	<tr>
																		<td>Tax (GST)</td>
																		<td  className="text-end">₹ {taxPrice}</td>
																	</tr>
																	<tr>
																		<td>Order Total</td>
																		<td  className="text-end">₹ {totalPrice}</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
													{/* <!-- payment-method --> */}
													<div  className="col-md-6 mt-xs-30">
														<Link href='/shipping'><a  className="button-one floatright text-uppercase " data-text="edit">Edit</a></Link>
														<div  className="payment-method  pl-20" style={{marginBottom : '44px'}}>
															<h4  className="title-1 title-border text-uppercase mb-30">Shipping Address</h4>
															<p>{shippingAddress.fullName} , {shippingAddress.address} , {shippingAddress.city} , {shippingAddress.state} , {shippingAddress.country} , {shippingAddress.postalCode}</p>
															<p >Phone number : {shippingAddress.phone}  </p>		 
															<Link href='/payment'><a  className="button-one floatright text-uppercase " data-text="edit" style={{marginTop : '31px'}}>Edit</a></Link> 
														</div>
														<div  className="payment-method  pl-20">
															<h4  className="title-1 title-border text-uppercase mb-30">Payment Method</h4>
															<div className="payment-content default" style={{padding : '0px'}}>
																{
																	paymentMethod === 'paypal' ? (
																		<>
																			<p>Pay via PayPal, you can pay with your credit or debit card if you don’t have a PayPal account.</p>
																			<a ><img src="/img/payment/1.png" alt="" /></a>
																			<a ><img src="/img/payment/3.png" alt="" /></a>
																			<a ><img src="/img/payment/4.png" alt="" /></a>
																		</>
																		
																		) : (
																			<>
																				<p>Pay via Razorpay, you can pay with your upi id or cards, recommended for indian users</p>
																				<a ><img src="/img/payment/2.png" alt="" /></a>
																				<a ><img src="/img/payment/5.png" alt="" /></a>
																				<a ><img src="/img/payment/3.png" alt="" /></a>
																				<a ><img src="/img/payment/4.png" alt="" /></a>
																			</>
																	)
																}
															</div>
														</div>
														<button disabled={loading} onClick={placeOrderHandler}  className="button-one submit-button mt-15" data-text={loading ? 'Loading...':'Place Order'} type="submit">{loading ? 'Loading...':'Place Order'}</button>
													</div>
												</div>
											</div>
										</form>										
									</div>
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

PlaceOrderScreen.auth = true;