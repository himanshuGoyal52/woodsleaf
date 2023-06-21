import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';

import Image from 'next/image';
import Banner from '../components/Banner';
import CartItem from '../components/cartItem';

function CartScreen() {
    const {state } = useContext(Store);
    const router = useRouter();
    const { cart : { cartItems }} = state;

  return (
    <Layout title="Cart" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
        <>
            <Banner bannerText="Shopping Cart" />
			{/* <!-- SHOPPING-CART-AREA START --> */}
			<div className="shopping-cart-area  pt-80 pb-80">
				<div className="container">	
					<div className="row">
						<div className="col-lg-12">
							<div className="shopping-cart">
								{/* <!-- Nav tabs --> */}

								{/* <!-- Tab panes --> */}
								<div className="tab-content">
									{/* <!-- shopping-cart start --> */}
									<div className="tab-pane active" id="shopping-cart">
                                        {cartItems.length === 0 ? 
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
                                        : 
										// yaha pe form tha phele
										<div >
											<div className="shop-cart-table">
												<div className="table-content table-responsive">
													<table>
														<thead>
															<tr>
																<th className="product-thumbnail">Product</th>
																<th className="product-price">Price</th>
																<th className="product-quantity">Quantity</th>
																<th className="product-subtotal">Total</th>
																<th className="product-remove">Remove</th>
															</tr>
														</thead>
														<tbody>
                                                            {cartItems.map((item) => (
																<CartItem key={item._id} item={item} />
                                                            ))}
														</tbody>
													</table>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													
												</div>
												<div className="col-md-6">
													<div className="customer-login payment-details mt-30">
														<h4 className="title-1 title-border text-uppercase">payment details</h4>
														<table>
															<tbody>
																<tr>
																	<td className="text-left">Cart Subtotal</td>
																	<td className="text-end">${cartItems.reduce((a,c) => a+c.quantity * c.price,0)}</td>
																</tr>
																<tr>
																	<td className="text-left">Shipping</td>
																	<td className="text-end">$00</td>
																</tr>
																<tr>
																	<td className="text-left">Order Total</td>
																	<td className="text-end">${cartItems.reduce((a,c) => a+c.quantity * c.price,0)}</td>
																</tr>
															</tbody>
														</table>
                                                        <button  onClick={() => router.push('login?redirect=/shipping')}  data-text="check out" className="button-one submit-button mt-15">CHECK OUT</button>
													</div>
												</div>
											</div>
										</div>		
                                            
                                        }
									</div>
									{/* <!-- shopping-cart end --> */}
									
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- SHOPPING-CART-AREA END --> */}
            </>
    </Layout>
  )
}


export default dynamic(()=>Promise.resolve(CartScreen), {ssr:false});
