import React, { useContext } from 'react'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';

function WishlistScreen() {
    const {state , dispatch} = useContext(Store);
    const router = useRouter();
    const { wishlist : { wishlistItems } } = state;

    const addToCartHandler =  (product , qty) => {
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + qty : qty;
        if(100 < quantity) {
            toast.error("Sorry. Product is out of Stock");
            return;
        }

		
        dispatch({type:'CART_ADD_ITEM' , payload : {...product , quantity }});	
        dispatch({type : 'WISHLIST_REMOVE_ITEM' , payload : product})
		router.push('/cart');
    };

    const removeItemHandler = (item)=>{
        dispatch({type:'WISHLIST_REMOVE_ITEM' , payload:item});
    };

    const mapping ={
		coffeTable : "Coffe Table",
		sofa : "Sofa",
		studyTable : "Study Table",
		consoleTable : "Console Table",
		endTable : "End Table",
		bedsideTable : "Bedside Table",
		bed : "Beds",
		bunkBed : "Bunk Bed",
		dressing : "Dressing",
		cabinet : "Cabinet",
		tvUnit : "TV Unit",
		chestOfDrawer : "Chest of Drawer",
		sideBoard : "Side Board",
		diningTable : "Dining Table",
		chair : "Chair",
		stool : "Stool",
		ottoman : "Ottoman",
	}

  return (
    <Layout title='Wishlist' desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
        <Banner bannerText="Wishlist" />
        {/* <!-- SHOPPING-CART-AREA START --> */}
			<div className="shopping-cart-area  pt-80 pb-80">
				<div className="container">	
                {wishlistItems.length === 0 ? 
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="error-content text-center">
                            <Image width={284} height={119} src="/img/bg/emptywishlist.png" alt="" />
                            <h3 className="text-light-black mt-30">Your wishlist is currently empty!</h3>
                            <p className="text-light-black">Seems like you don't have wishes here <br/> Make a wish!</p>
                            <Link href="/shop"><a style={{color:'#fff'}} className="button-one submit-btn-4 go-to-home text-uppercase "  data-text="CONTINUE SHOPPING" >CONTINUE SHOPPING</a></Link>
                        </div>
                    </div>
                    </div>
                 : (
					<div className="row">
						<div className="col-lg-12">
							<div className="shopping-cart">
								{/* <!-- Nav tabs --> */}

								{/* <!-- Tab panes --> */}
								<div className="tab-content">
                                {/* <!-- wishlist start --> */}
									<div className="tab-pane active" id="wishlist">
										<form action="#">
											<div className="shop-cart-table">
												<div className="table-content table-responsive">
													<table>
														<thead>
															<tr>
																<th className="product-thumbnail">Product</th>
																<th className="product-price">Price</th>
																<th className="product-stock">stock status</th>
																<th className="product-add-cart">Add to cart</th>
																<th className="product-remove">Remove</th>
															</tr>
														</thead>
														<tbody>
                                                            {wishlistItems.map((item) => (
                                                                <tr key={item._id}>
                                                                    <td className="product-thumbnail  text-left">
                                                                        {/* <!-- Single-product start --> */}
                                                                        <div className="single-product">
                                                                            <div className="product-img">
                                                                                <Link href={`/product/${item.slug}`}><a ><Image width={110} height={110} src={item.image} alt="" /></a></Link>
                                                                            </div>
                                                                            <div className="product-info">
                                                                                <h4 className="post-title"><Link href={`/product/${item.slug}`}><a className="text-light-black"> {item.name.slice(0,22)}</a></Link></h4>
                                                                                <p className="mb-0">Category : {mapping[item.category]}</p>
                                                                                <p className="mb-0">SKU : {item.sku}</p>
                                                                            </div>
                                                                        </div>
                                                                        {/* <!-- Single-product end -->				 */}
                                                                    </td>
                                                                    <td className="product-price">${item.price}</td>
                                                                    <td className="product-stock">in stock</td>
                                                                    <td className="product-add-cart" >
                                                                        <button className="text-light-black" onClick={() => {addToCartHandler(item , 1)}}><i className="zmdi zmdi-shopping-cart-plus"></i></button>
                                                                    </td>
                                                                    <td className="product-remove">
                                                                        <button onClick={() => removeItemHandler(item)}><i className="zmdi zmdi-close"></i></button>
                                                                    </td>
                                                                </tr>
                                                            ))}
														</tbody>
													</table>
												</div>
											</div>
										</form>									
									</div>
									{/* <!-- wishlist end --> */}
									
								</div>

							</div>
						</div>
					</div>
                )}
				</div>
			</div>
			{/* <!-- SHOPPING-CART-AREA END --> */}
    </Layout>
  )
}


export default dynamic(()=>Promise.resolve(WishlistScreen), {ssr:false});
