import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard'
import { useForm } from 'react-hook-form';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import countries from '../utils/countries';
import Image from 'next/image';
import Banner from '../components/Banner';

export default function ShippingScreeen() {
  const router = useRouter();
  const {state , dispatch} = useContext(Store);
	const { 
		handleSubmit,
		register,
		formState : {errors},
		setValue,
		getValues,
	 } = useForm();


	 const {cart} = state;
	 const { cartItems ,shippingAddress } = cart;
   	const [country , setCountry] = useState(getValues('country'));

	 useEffect(() => {
		setValue('fullName' , shippingAddress.fullName);
    	setValue('phone' , shippingAddress.phone);
		setValue('company' , shippingAddress.company);
		setValue('country' , shippingAddress.country );
		setValue('state' , shippingAddress.state );
		setValue('city' , shippingAddress.city);
		setValue('address' , shippingAddress.address);
		setValue('postalCode' , shippingAddress.postalCode);
		setValue('notes' , shippingAddress.notes);
		setCountry(getValues('country'))
	 } , [setValue , shippingAddress  , getValues]);

	const submitHandler = ({fullName , phone , company , country , state , city , address , postalCode , notes}) => {
    
		dispatch({
			type : "SAVE_SHIPPING_ADDRESS",
			payload : {fullName , phone , company , country , state , city , address , postalCode , notes }
		});

		Cookies.set(
			'cart',
			JSON.stringify({
				...cart,
				shippingAddress : {
					fullName ,
					phone ,
					company ,
					country ,
					state ,
					city ,
					address ,
					postalCode ,
					notes,
				},
			})
		);

		router.push('/payment');
	};


  return (
    <Layout title="Shipping" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">

			<Banner bannerText="Shipping address" />
			{/* <!-- WISHLIST-AREA START --> */}
			<div className="shopping-cart-area pt-80 pb-80">
				<div className="container">	
					<div className="row">
						<div className="col-lg-12">
							<div className="shopping-cart">
								{/* <!-- Nav tabs --> */}
								<CheckoutWizard  activeStep={2}/>

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
										<form onSubmit={handleSubmit(submitHandler)}>
											<div className="shop-cart-table check-out-wrap">
												<div className="row">
													
													<div className="col-md-12 prt-150 plt-150">
														<div className="billing-details pl-20">
															<h4 className="title-1 title-border text-uppercase mb-30">Shipping address</h4>
															<input  type="text" placeholder="Full name" 
                                								autoFocus
                                								{...register('fullName' , {
                                								  required : 'Please enter your full name',
                                								})}
                              								/>
															{errors.fullName && (<div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors.fullName.message} </div>)}

															<input type="text" placeholder="Contact number" 
                                								{...register('phone' , {required : "Please enter your contact number" , pattern : {value:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im , message : "Please enter valid phone number"}})}
                              								/>
                              								{errors.phone && (<div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.phone.message}</div>)}
															
															<input type="text" placeholder="Company name (optional)" 
                                								{...register('company')}
                              								/>

															<select id="country" name="country"   className='selectOfShipping' 
																{ ...register('country' , { required : "Please select your country"}) } 
																onChange={() => {  setCountry(document.getElementById('country').value)}} 
															>
																<option value="" disabled>Select country</option>
																{
																	countries.map((ele, index) => {
																		return (
																			<option key={index+1} value={ele.country}>{ele.country}</option>
																		)
																	})
																}
															</select>
															{errors.country && <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.country.message}</div>}

															<select name="state" defaultValue="" className='selectOfShipping' { ...register('state' , { required : "Please select your state", }) }>
																<option value="" disabled >Select state</option>
																{
																		countries.find(item => item.country === country)?.states.map((ele , index) => {
																			return (
																				<option value={ele} key={index+1}>{ele}</option>
																			)
																		})
																}
															</select>
															{errors.state && <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.state.message}</div>}

															<input type="text" placeholder="City" id='city'
																{...register('city' , {
																	required : "Please enter your city",
																})} />
                                							{errors.city && <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.city.message}</div>}

															<input  id="address"  type="text" placeholder="Street address" {...register('address' , {required : 'Please enter your address' , minLength : {value : 6 , message : "Address is more than 5 chars"}, })}/>
                              								{errors.address && (<div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.address.message}</div>)}

															<input type="text" placeholder="Postal code" id='postalCode'
																{...register('postalCode' , {
																	required : "Please enter your postal code",
																})} />
                                							{errors.postalCode && <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.postalCode.message}</div>}

                                								
															<textarea {...register('notes')}  className="custom-textarea" placeholder="Notes about your order, e.g. special notes for delivery." ></textarea>
															<div style={{display:'flex'}}>
																<Link href='/cart'><a style={{marginRight : 'auto'}}  className="button-one submit-button mt-15" data-text="cart">cart</a></Link>
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

ShippingScreeen.auth = true;