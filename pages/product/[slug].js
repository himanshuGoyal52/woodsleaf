import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout'
import { Store } from '../../utils/Store';
import Notfound from '../notfound';
import Image from 'next/image';
import db from '../../utils/db'
import Product from '../../models/Product';
import axios from 'axios';
import { toast } from 'react-toastify';
import Banner from '../../components/Banner';
import Ratingstars from '../../components/Ratingstars';
import { useForm } from 'react-hook-form';
import { getError } from '../../utils/error';
import { useRouter } from 'next/router';

export default function ProductScreen({product}) {
    const {state , dispatch} = useContext(Store);
	const [starState , setStarState] = useState(undefined);
	const [qty , setQty] = useState(1);

	const router = useRouter();
	

    if(!product){
        return (<Notfound />);
    }

    const addToCartHandler =  async () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + qty : qty;
        if(100 < quantity) {
            toast.error("Sorry , Product is out of stock");
            return;
        }

        dispatch({type:'CART_ADD_ITEM' , payload : {...product , quantity }});
		router.push('/cart');
    };

	const addToCartHandlerq =  (product) => {
	        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
	        const quantity = existItem ? existItem.quantity + qty : qty;		
	        dispatch({type:'CART_ADD_ITEM' , payload : {...product , quantity }});	
		toast.success(`${product.name} added to the cart`);
		// router.push('/cart');
    	};

	// wishlist 
	const addToWishlistHandler =  () => {
        const existItem = state.wishlist.wishlistItems.find((x) => x._id === product._id);
		if(existItem){
			toast.error(`${product.name} is already in your wishlist`);
			return ;
		}
        dispatch({type:'WISHLIST_ADD_ITEM' , payload : {...product  }});	
		toast.success(`${product.name} added to the your wishlist`);
		// router.push('/cart');
    };

	const [productObj , setproductObj] = useState({});
	const showProduct = () => {
		setproductObj(product);
	}

	const { 
		handleSubmit,
		register,
		setValue,
		formState : {errors},
	 } = useForm();

	const submitHandler = async ({ review , star}) => {
		let id = product._id;
		try{
			const {data} = await axios.post('/api/products/review' , { id  , review  , star });
			
			// router.reload();
		}catch(err){
			toast.error(getError(err));
		}
	}

	const  tConvert =  (time) =>  {
		// Check correct time format and split into components
		time = time.match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
	  
		if (time.length > 1) { // If time format correct
		  time = time.slice (1);  // Remove full string match value
		  time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
		  time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join (''); // return adjusted time or original string
	  }

    return (
      <Layout title={product.name} productObj={productObj} addToCart={addToCartHandlerq} desc={product.desc}>
            <Banner bannerText={product.name} />
			{/* <!-- PRODUCT-AREA START --> */}
			<div className="product-area single-pro-area pt-80 pb-80 product-style-2">
				<div className="container">	
					<div className="row shop-list single-pro-info no-sidebar">
						{/* <!-- Single-product start --> */}
						<div className="col-lg-12">
							<div className="single-product clearfix">
								{/* <!-- Single-pro-slider Big-photo start --> */}
								<div className="single-pro-slider single-big-photo view-lightbox slider-for">
									<div>
										<Image height={520.5} width={428} src={product.image1} alt={product.name} />
									</div>
									<div>
										<Image height={520.5} width={428} src={product.image2} alt={product.name} />
									</div>
									<div>
										<Image height={520.5} width={428} src={product.image3} alt={product.name} />
									</div>
									<div>
										<Image height={520.5} width={428} src={product.image4} alt={product.name} />
									</div>
									<div>
										<Image height={520.5} width={428} src={product.image5} alt={product.name} />
									</div>
								</div>	
								{/* <!-- Single-pro-slider Big-photo end -->*/}
								<div className="product-info">
									<div className="fix">
										<h4 className="post-title floatleft">{product.name}</h4>
										<span className="pro-rating floatright" style={{float : 'right'}}>
											<Ratingstars reviews={product.reviews} />
											<span >( {product.reviews.length} Rating )</span>
										</span>
									</div>
									<div className="fix mb-20">
										<span className="pro-price">$ {product.price} {product.actual_price ? <sapn style={{textDecoration:'line-through' , fontSize :'0.8rem' , color:'rgb(102 102 102)'}}>({product.actual_price})</sapn>: ''}</span>
									</div>
									<div className="product-description">
										<p>{product.desc} </p>
									</div>
									<div>
										{product.info.dimension && <p>Dimension - <span style={{fontWeight : 'normal'}}>{product.info.dimension} Inches</span></p>}
										{product.info.finish && <p>Finish - <span style={{fontWeight : 'normal'}}>{product.info.finish}</span></p>}
										{product.info.primary_material && <p>Primary Material - <span style={{fontWeight : 'normal'}}>{product.info.primary_material}</span></p>}
										{ product.info.top_material && <p>Top Material - <span style={{fontWeight : 'normal'}}>{product.info.top_material}</span></p>}
									</div>
									<Image width={7150} height={750} alt='Want to customize it ? click on the whatsapp icon below' src="/img/customizeText.png"></Image>
									
									<div className="clearfix responsiveFelxi" style={{display : 'flex'}} >
										<div style={{display:'flex' , backgroundColor : '#6d8c75' , height:'40px' , width : '175px' , alignItems : 'center' , justifyContent : 'space-evenly'}} className='hundredpr'>
											<span className='onhoverMilk' onClick={() =>{ if(qty > 1)setQty(qty-1)}} style={{fontSize : '1.5em'  , fontWeight : 'lighter',  cursor : 'pointer'}}>-</span>
											<input className='cart-plus-minus-box' disabled  style={{ height : '17px', color : "#343434" , borderRight : 'solid #343434 0.5px' , borderLeft : 'solid #343434 0.5px'}} type="text" value={qty}  />	
											<span className='onhoverMilk' onClick={() => setQty(qty+1)} style={{fontSize : '1.5em'  , fontWeight : 'lighter' , cursor : 'pointer'}}>+</span>
										</div>
										<div></div>
										<div className="product-action clearfix">
											{state?.wishlist?.wishlistItems?.find((x) => x.slug == product.slug) ?  (
												<button onClick={() => addToWishlistHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Remove from wishlist"><i className="zmdi zmdi-favorite"></i></button>
											) : (	
												<button onClick={() => addToWishlistHandler(product)} data-bs-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="zmdi zmdi-favorite-outline"></i></button>
											)}
											<a  href={`//api.whatsapp.com/send?phone=917290819777&text=https://woodsleaf.com/product/${product.slug} || please customize this product for me`} title="You like it but want it customized ?"><i className="zmdi zmdi-whatsapp"></i></a>
											<button onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" data-placement="top" title="share"><i className="zmdi zmdi-share"></i></button>
											<button onClick={addToCartHandler} data-bs-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="zmdi zmdi-shopping-cart-plus"></i></button>
										</div>
									</div>
									{/* <!-- Single-pro-slider Small-photo start --> */}
									<div className="single-pro-slider single-sml-photo slider-nav">
										<div>
											<Image height={153.4} width={129.4} src={product.image1} alt={product.name} />
										</div>
										<div>
											<Image height={153.4} width={129.4} src={product.image2} alt={product.name} />
										</div>
										<div>
											<Image height={153.4} width={129.4} src={product.image3} alt={product.name} />
										</div>
										<div>
											<Image height={153.4} width={129.4} src={product.image4} alt={product.name} />
										</div>
										<div>
											<Image height={153.4} width={129.4} src={product.image5} alt={product.name} />
										</div>
									</div>
									{/* <!-- Single-pro-slider Small-photo end --> */}
								</div>
							</div>
						</div>
						{/* <!-- Single-product end --> */}
					</div>
					{/* <!-- single-product-tab start --> */}
					<div className="single-pro-tab">
						<div className="row">
							<div className="col-md-3">
								<div className="single-pro-tab-menu">
									{/* <!-- Nav tabs --> */}
									<ul className="nav d-block">
										<li><a className="active"  href="#description" data-bs-toggle="tab">Description</a></li>
										<li><a href="#reviews"  data-bs-toggle="tab">Reviews</a></li>
										<li><a href="#information" data-bs-toggle="tab">Information and Tags</a></li>
										<li><a href="#tags" data-bs-toggle="tab">FAQ</a></li>
									</ul>
								</div>
							</div>
							<div className="col-md-9">
								{/* <!-- Tab panes --> */}
								<div className="tab-content">
									<div className="tab-pane active" id="description">
										<div className="pro-tab-info pro-description">
											<h3 className="tab-title title-border mb-30">{product.name}</h3>
											<Image src="/img/productPageInfo.png" alt='product page info' width={1200} height={265} />
											<p>{product.desc}</p>
										</div>
									</div>
									<div className="tab-pane " id="reviews">
										<div className="pro-tab-info pro-reviews">
											<div className="customer-review mb-60">
												<h3 className="tab-title title-border mb-30">Customer reviews</h3>
												<ul className="product-comments clearfix">
													{product.reviews.length === 0 ? (<p>There are no reviews yet.</p>) : 
													(	<>
														{product.reviews.map((item) => (
															<li  key={item._id} className="mb-40" style={{ float : 'none'}}>
																<div className="pro-reviewer">
																	<Image width={90} height={100} src="/img/user_review.png" alt="" />
																</div>
																<div className="pro-reviewer-comment">
																	<div className="fix">
																		<div className="floatleft mbl-center">
																			<h5 className="text-uppercase mb-0"><strong>{item.name}</strong></h5>
																			<p className="reply-date">{item.time.slice(4,16)} at {tConvert(item.time.slice(16,21))}</p>
																		</div>
																		<span className="pro-rating floatright prodcutPageRating">
																			<Ratingstars stars={item.star}/>
																		</span>
																	</div>
																	<p className="mb-0">{item.comment}</p>
																</div>
																
															</li>
														))}
														</>
													)
												}
													
												</ul>
											</div>
											<div className="leave-review">
												<h3 className="tab-title title-border mb-30">Leave your review</h3>
												<div className="your-rating mb-30">
													<p className="mb-10"><strong>Your Rating</strong></p>
													<span style={{cursor : 'pointer' , color : "#6d8c75" , fontSize : '16px'}} onClick={() => {setStarState(1); setValue('star',1)} }>
														<i className={starState === 1 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
													</span>
													<span className="separator">|</span>
													<span style={{cursor : 'pointer' , color : "#6d8c75" , fontSize : '16px'}} onClick={() => {setStarState(2); setValue('star',2) }} >
														<i className={starState === 2 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 2 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
													</span>
													<span className="separator">|</span>
													<span style={{cursor : 'pointer' , color : "#6d8c75" , fontSize : '16px'}} onClick={() => {setStarState(3); setValue('star',3)}}>
														<i className={starState === 3 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 3 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 3 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
													</span>
													<span className="separator">|</span>
													<span style={{cursor : 'pointer' , color : "#6d8c75" , fontSize : '16px'}} onClick={() => {setStarState(4); setValue('star',4)}}>
														<i className={starState === 4 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 4 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 4 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 4 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
													</span>
													<span className="separator">|</span>
													<span style={{cursor : 'pointer' , color : "#6d8c75" , fontSize : '16px'}} onClick={() => {setStarState(5); setValue('star',5)}}>
														<i className={starState === 5 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 5 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 5 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 5 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
														<i className={starState === 5 ? "zmdi zmdi-star" : "zmdi zmdi-star-outline"}></i>
													</span>
													{errors.star && (<div style={{color : '#c87065' , marginBottom:'15px' , fontSize:'11px'}}> {errors.star.message} </div>)}
												</div>
												<div className="reply-box">
													<form onSubmit={handleSubmit(submitHandler)}>
														<div className="row">
															<input style={{display:'none'}}  {...register('star' , {required : 'Please select rating'})} type='number' max={5} />
														</div>
														<div className="row">
															<div className="col-md-12">
																<textarea {...register('review' , { required : 'Please enter your review' })} className="custom-textarea" placeholder="Your review here..." ></textarea>
																
																{errors.review && (<div style={{color : '#c87065' , marginBottom:'15px' , fontSize:'11px'}}> {errors.review.message} </div>)}
																<button type="submit" data-text="submit review" className="button-one submit-button mt-20">submit review</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>		
									</div>
									<div className="tab-pane" id="information">
										<div className="pro-tab-info pro-information">
											<h3 className="tab-title title-border mb-30">Product information and tags</h3>
											<div className='mb-20'>
												{ product.sku && <p><span style={{fontWeight : 'bolder'}}>SKU</span> - <span >{product.sku}</span></p>}
												{ product.collection_type && <p><span style={{fontWeight : 'bolder'}}>Collection</span> - <span >{product.collection_type}</span></p>}
												{product.info.dimension && <p><span style={{fontWeight : 'bolder'}}>Dimension</span> - <span >{product.info.dimension} Inches</span></p>}
												{product.info.finish && <p><span style={{fontWeight : 'bolder'}}>Finish</span> - <span >{product.info.finish}</span></p>}
												{product.info.primary_material && <p><span style={{fontWeight : 'bolder'}}>Primary Material</span> - <span >{product.info.primary_material}</span></p>}
												{ product.info.top_material && <p><span style={{fontWeight : 'bolder'}}>Top Material</span> - <span >{product.info.top_material}</span></p>}
												{product.insta && <a style={{display : 'none'}} href={product.insta}>Instagram</a>}
											</div>
										</div>											
									</div>
									<div className="tab-pane" id="tags">
										<div className="pro-tab-info pro-information">
											<h3 className="tab-title title-border mb-30">faq</h3>
											
											<div className="payment-accordion">
                                                {/* <!-- Accordion start --> */}
												{product.faq.length === 0 ? (<div>No FAQ exists for this product</div>) : (
													<>
														{product.faq.map((item , i) => (
															<>
																<h3 style={{textTransform : 'none'}} className={i===0 ? 'payment-accordion-toggle active' : 'payment-accordion-toggle '}>{item.ques}</h3>
																<div className={i===0 ? 'payment-content default' : 'payment-content '}>
																	<p>{item.ans}</p>
																</div>
															</>
														))}			
													</>
												)}
											</div>	
										</div>											
									</div>
								</div>									
							</div>
						</div>
					</div>
					{/* <!-- single-product-tab end --> */}
				</div>
			</div>
			{/* <!-- PRODUCT-AREA END --> */}
      </Layout>
    )
}


export async function getServerSideProps(context){
	const { params } = context;
	const {slug} = params;
	await db.connect();
	// by using .lean we only get the product data not the meta data
	const product = await Product.findOne({slug}).lean();
	await db.disconnect();
	return {
		props : {
			product : product ? db.convertDocToObj(product) : null
		},
	};

}

