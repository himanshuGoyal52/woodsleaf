import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useContext, useState } from 'react';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import db from '../utils/db';
import Product from '../models/Product';
import Blog from '../models/Blogs';
import Home from '../models/Home'
import Ratingstars from '../components/Ratingstars';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';


export default function HomeScreen(props) {
	const { status , data : session } = useSession();
	const {state , dispatch} = useContext(Store);
	const [productObj , setproductObj] = useState({});
	const showProduct = (product) => {
		setproductObj(product);
	}

	const {
		handleSubmit,
		register,
		formState : {errors},
	} = useForm();


	const addToCartHandler =  async (product) => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

		toast.success(`${product.name} added to the cart`);

        dispatch({type:'CART_ADD_ITEM' , payload : {...product , quantity }});	
    };

	const addToWishlistHandler =  (product) => {
        const existItem = state.wishlist.wishlistItems.find((x) => x._id === product._id);
		if(existItem){
			toast.error(`${product.name} is already in your wishlist`);
			return ;
		}
        dispatch({type:'WISHLIST_ADD_ITEM' , payload : {...product  }});	
		toast.success(`${product.name} added to the your wishlist`);
    };

	const submitHandler = async ({email , password}) => {
        try {
			const result = await signIn('credentials' , {
				redirect : false,
				email,
				password,
			});
			if(result.error){
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
    };

	// search function //
	const router = useRouter();
	const [query , setQuery] = useState('');
	const submitHandlerSearch = (e) => {
		e.preventDefault();
		router.push(`/shop?query=${query}`)
	}
	

  return (
    <Layout title="Home" productObj={productObj} addToCart={addToCartHandler} your_products={props.home[0].your_products} desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
            {/* <!-- SLIDER-BANNER-AREA START --> */}
			<section className="slider-banner-area clearfix">
				{/* <!-- Sidebar-social-media start --> */}
				<div className="sidebar-social d-none d-md-block">
					<div className="table">
						<div className="table-cell">
							<ul>
								<li><a rel='noreferrer' href="https://www.instagram.com/woods_leaf/" target="_blank" title="Instagram"><i className="zmdi zmdi-instagram"></i></a></li>
								<li><a rel='noreferrer' href="https://twitter.com/woods__leaf" target="_blank" title="Twitter"><i className="zmdi zmdi-twitter"></i></a></li>
								<li><a rel='noreferrer' href="https://www.facebook.com/profile.php?id=100083983436524" target="_blank" title="Facebook"><i className="zmdi zmdi-facebook"></i></a></li>
								<li><a rel='noreferrer' href="https://www.linkedin.com/company/dcraftive/" target="_blank" title="Linkedin"><i className="zmdi zmdi-linkedin"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
				{/* <!-- Sidebar-social-media start --> */}
				<div className="banner-left floatleft">
					{/* <!-- Slider-banner start --> */}
					<div className="slider-banner">
						<div className="single-banner banner-1">
							<Link className="banner-thumb" href={`/product/${props.home[0].front_two_products[0].slug}`}><a><img src={props.home[0].front_two_products[0].image} alt={props.home[0].front_two_products[0].name} /></a></Link>
							<span className="pro-label new-label">{props.home[0].front_two_products[0].tag}</span>
							<span className="price">${props.home[0].front_two_products[0].price}.00</span>
							<div className="banner-brief">
								<h2 className="banner-title"><Link href={`/product/${props.home[0].front_two_products[0].slug}`}>{props.home[0].front_two_products[0].name}</Link></h2>
								<p className="mb-0">{props.home[0].front_two_products[0].collection_type}</p>
							</div>
							<Link href={`/product/${props.home[0].front_two_products[0].slug}`}><a className="button-one font-16px" data-text="Buy now">Buy now</a></Link> 
						</div>
						<div className="single-banner banner-2">
							<Link className="banner-thumb" href={`/product/${props.home[0].front_two_products[1].slug}`}><a><img src={props.home[0].front_two_products[1].image} alt={props.home[0].front_two_products[1].name} /></a></Link>
							<div className="banner-brief">
								<h2 className="banner-title"><Link href={`/product/${props.home[0].front_two_products[1].slug}`}><a>{props.home[0].front_two_products[1].name}</a></Link></h2>
								<p className="hidden-md hidden-sm d-none d-md-block">{props.home[0].front_two_products[1].desc}</p>
								<Link href={`/product/${props.home[0].front_two_products[1].slug}`} ><a className="button-one font-16px" data-text="Buy now">Buy now</a></Link>
							</div>
						</div>
					</div>
					{/* <!-- Slider-banner end --> */}
				</div>
				<div className="slider-right floatleft">
					{/* <!-- Slider-area start --> */}
					<div className="slider-area">
						<div className="bend niceties preview-2">
							<div id="ensign-nivoslider" className="slides">
								<img src={props.home[0].slider[0].image} alt={props.home[0].slider[0].head1} title="#slider-direction-1"  />
								<img src={props.home[0].slider[1].image} alt={props.home[0].slider[0].head2} title="#slider-direction-2"  />
								<img src={props.home[0].slider[2].image} alt={props.home[0].slider[0].head3} title="#slider-direction-3"  />
							</div>
							{/* <!-- direction 1 --> */}
							<div id="slider-direction-1" className="t-cn slider-direction">
								<div className="slider-progress"></div>
								<div className="slider-content t-lfl s-tb slider-1">
									<div className="title-container s-tb-c title-compress">
										<div className="layer-1">
											<div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
												<h2 className="slider-title3 text-uppercase mb-0" >{props.home[0].slider[0].head1}</h2>
											</div>
											<div className="wow fadeIn" data-wow-duration="1.5s" data-wow-delay="1.5s">
												<h2 className="slider-title1 text-uppercase mb-0">{props.home[0].slider[0].head2}</h2>
											</div>
											<div className="wow fadeIn" data-wow-duration="2s" data-wow-delay="2.5s">
												<h3 className="slider-title2 text-uppercase" >{props.home[0].slider[0].head3}</h3>
											</div>
											<div className="wow fadeIn" data-wow-duration="2.5s" data-wow-delay="3.5s">
												<Link href='/shop'><a className="button-one style-2 text-uppercase mt-20" data-text="Shop now">Shop now</a></Link> 
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <!-- direction 2 --> */}
							<div id="slider-direction-2" className="slider-direction">
								<div className="slider-progress"></div>
								<div className="slider-content t-lfl s-tb slider-1">
									<div className="title-container s-tb-c title-compress">
										<div className="layer-1">
											<div className="wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.5s">
												<h2 className="slider-title3 text-uppercase mb-0" >{props.home[0].slider[1].head1}</h2>
											</div>
											<div className="wow fadeInUpBig" data-wow-duration="1.5s" data-wow-delay="0.5s">
												<h2 className="slider-title1 text-uppercase">{props.home[0].slider[1].head2}</h2>
											</div>
											<div className="wow fadeInUpBig" data-wow-duration="2s" data-wow-delay="0.5s">
												<p className="slider-pro-brief">{props.home[0].slider[1].para}</p>
											</div>
											<div className="wow fadeInUpBig" data-wow-duration="2.5s" data-wow-delay="0.5s">
												<Link href='/shop'><a className="button-one style-2 text-uppercase mt-20" data-text="Shop now">Shop now</a></Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <!-- direction 3 --> */}
							<div id="slider-direction-3" className="slider-direction">
								<div className="slider-progress"></div>
								<div className="slider-content t-lfl s-tb slider-1">
									<div className="title-container s-tb-c title-compress">
										<div className="layer-1">
											<div className="wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.5s">
												<h2 className="slider-title3 text-uppercase mb-0" >{props.home[0].slider[2].head1}</h2>
											</div>
											<div className="wow fadeInUpBig" data-wow-duration="1.5s" data-wow-delay="0.5s">
												<h2 className="slider-title1 text-uppercase mb-0">{props.home[0].slider[2].head2}</h2>
											</div>
											<div className="wow fadeInUpBig" data-wow-duration="2s" data-wow-delay="0.5s">
												<h3 className="slider-title2 text-uppercase" >{props.home[0].slider[2].head3}</h3>
											</div>
											<div className="wow fadeInUpBig" data-wow-duration="2.5s" data-wow-delay="0.5s">
												<p className="slider-pro-brief">{props.home[0].slider[2].para}</p>
											</div>
											<div className="wow fadeInUpBig" data-wow-duration="3s" data-wow-delay="0.5s">
												<Link href='/shop'><a className="button-one style-2 text-uppercase mt-20" data-text="Shop now">Shop now</a></Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- Slider-area end --> */}
				</div>
				{/* <!-- Sidebar-social-media start --> */}
				<div className="sidebar-account d-none d-md-block">
					<div className="table">
						<div className="table-cell">
							<ul>
								<li><a className="search-open" style={{cursor:'pointer'}} title="Search"><i className="zmdi zmdi-search"></i></a></li>
								{  status === 'loading' ? (<a  title="Profile"><i className="zmdi zmdi-more"></i></a>) :
									session?.user ? ( <li><Link href="/profile"><a  title="Profile"><i className="zmdi zmdi-account"></i></a></Link></li> )
									:(
										<li><Link href="/login"><a title="Login"><i className="zmdi zmdi-lock"></i></a></Link>
											<div className="customer-login text-left">
												<form onSubmit={handleSubmit(submitHandler)}>
													<h4 className="title-1 title-border text-uppercase mb-30">Registered customers</h4>
													<p className="text-gray">If you have an account with us, Please login!</p>
													<input {...register('email' , {required:"Please enter email" , pattern : {value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i , message : "Please enter valid email"} })} type="text" name="email" placeholder="Email here..." />
													{errors.email && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors.email.message}</div>)}
													<input  {...register('password' , {required:"Please enter password" , minLength : {value:6 , message : 'password is more than 5 character'}, })}  type="password" placeholder="Password" />
													{errors.password && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors.password.message}</div>)}
													<button className="button-one submit-button mt-15" data-text="login" type="submit">login</button>
												</form>
											</div>
										</li>
									)
								}
								<li><Link href='/wishlist' ><a title="Wishlist"><i className="zmdi zmdi-favorite"></i></a></Link></li>
								<li><Link href='/blogs' ><a title="blogs"><i className="zmdi zmdi-collection-text"></i></a></Link></li>
							</ul>
						</div>
					</div>
				</div>
				{/* <!-- Sidebar-social-media start --> */}
			</section>
			{/* <!-- End Slider-section --> */}
			{/* <!-- sidebar-search Start --> */}
			<div className="sidebar-search animated slideOutUp">
				<div className="table">
					<div className="table-cell">
						<div className="container">
							<div className="row">
								<div className="col-md-8 offset-md-2 p-0">
									<div className="search-form-wrap">
										<button className="close-search"><i className="zmdi zmdi-close"></i></button>
										<form onSubmit={submitHandlerSearch}>
											<input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search here..." />
											<button className="search-button" type="submit">
												<i className="zmdi zmdi-search"></i>
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- sidebar-search End --> */}
			{/* <!-- PRODUCT-AREA START --> */}
			<div className="product-area pt-80 pb-35">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="section-title text-center">
								<h2 className="title-border">Featured Products</h2>
							</div>
							<div className="product-slider style-1 arrow-left-right">
								{props.featuredProducts.map((product) => (
									<div key={product.slug} className="single-product">
										<div className="product-img">
											{ product.tag && <span className="pro-label new-label">{product.tag}</span>}
											<Link href={`/product/${product.slug}`} style={{cursor:'pointer'}}><img style={{cursor:'pointer'}} src={product.image} alt={product.name} /></Link>
											<div className="product-action clearfix">
												{state.wishlist?.wishlistItems?.find((x) => x.slug == product.slug) ?  (
													<button onClick={() => addToWishlistHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Remove from wishlist"><i className="zmdi zmdi-favorite"></i></button>
												) : (	
													<button onClick={() => addToWishlistHandler(product)} data-bs-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="zmdi zmdi-favorite-outline"></i></button>
												)}
												<button onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View"><i className="zmdi zmdi-zoom-in"></i></button>
												<button  onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Share"><i className="zmdi zmdi-share"></i></button>
												<button onClick={() => addToCartHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="zmdi zmdi-shopping-cart-plus"></i></button>
											</div>
										</div>
										<div className="product-info clearfix">
											<div className="fix">
												<h4 className="post-title floatleft"><Link href={`/product/${product.slug}`}>{product.name}</Link></h4>
											</div>
											<div className="fix">
												<span className="pro-price floatleft">₹ {product.price}</span>
												{product.actual_price ? <span className="old-price font-16px ml-10 " style={{position:'relative' , top:'3.5px'}}><del>₹ {product.actual_price}</del></span> : ''}
												<span className="pro-rating floatright">
													<Ratingstars reviews={product.reviews} />
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- PRODUCT-AREA END --> */}
			{/* <!-- DISCOUNT-PRODUCT START --> */}
			<div className="discount-product-area">
				<div className="container">
					<div className="row">
						<div className="discount-product-slider dots-bottom-right">
							{props.home[0].discounted_products.map((item , index) => (
								<div key={index} className="col-lg-12">
									<div className="discount-product">
										<Image width={1170} height={500} src={item.image} alt={item.slug} />
										<div className="discount-img-brief">
											<div className="onsale">
												<span className="onsale-text">On Sale</span>
												<span className="onsale-price">₹ {item.price}.00</span>
											</div>
											<div className="discount-info">
												<h1 className="text-dark-red d-none d-md-block">Discount {item.off}%</h1>
												<p className="d-none d-md-block">{item.desc}</p>
												<Link href={`/product/${item.slug}`}><a  className="button-one font-16px style-3 text-uppercase mt-md-5" data-text="Buy now">Buy now</a></Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{/* <!-- DISCOUNT-PRODUCT END --> */}
			{/* <!-- PURCHASE-ONLINE-AREA START --> */}
			<div className="purchase-online-area pt-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="section-title text-center">
								<h2 className="title-border">Collection at Dcraftive</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12 text-center">
							{/* <!-- Nav tabs --> */}
							<ul className="tab-menu nav clearfix">
								<li><a className="active" href="#new-arrivals" data-bs-toggle="tab">Bone Inlay</a></li>
								<li><a href="#best-seller"  data-bs-toggle="tab">Wooden furniture</a></li>
								<li><a href="#most-view" data-bs-toggle="tab">Marble furniture</a></li>
								<li><a href="#discounts" data-bs-toggle="tab">Carving furniture</a></li>
							</ul>
						</div>
						<div className="col-lg-12">
							{/* <!-- Tab panes --> */}
							<div className="tab-content">
								<div className="tab-pane active" id="new-arrivals">
									<div className="row">
										{props.boneInlayProducts?.map((product) => (
											<div key={product.slug} className="single-product col-xl-3 col-lg-4 col-md-6">
												<div className="product-img">
													{product.tag && <span className="pro-label new-label">{product.tag}</span>}
													<Link  href={`/product/${product.slug}`}><img style={{cursor:'pointer'}} src={product.image} alt="" /></Link>
													<div className="product-action clearfix">
														{state.wishlist?.wishlistItems?.find((x) => x.slug == product.slug) ?  (
															<button onClick={() => addToWishlistHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Remove from wishlist"><i className="zmdi zmdi-favorite"></i></button>
														) : (	
															<button onClick={() => addToWishlistHandler(product)} data-bs-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="zmdi zmdi-favorite-outline"></i></button>
														)}
														<button onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View"><i className="zmdi zmdi-zoom-in"></i></button>
														<button  onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Share"><i className="zmdi zmdi-share"></i></button>
														<button onClick={() => addToCartHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="zmdi zmdi-shopping-cart-plus"></i></button>
													</div>
												</div>
												<div className="product-info clearfix">
													<div className="fix">
														<h4 className="post-title floatleft"><Link href={`/product/${product.slug}`}>{product.name}</Link></h4>
														
													</div>
													<div className="fix">
														<span className="pro-price floatleft">₹ {product.price}</span>
														{product.actual_price ? <span className="old-price font-16px ml-10 " style={{position:'relative' , top:'3.5px'}}><del>₹ {product.actual_price}</del></span> : ''}
														<span className="pro-rating floatright">
															<Ratingstars reviews={product.reviews}/>
														</span>
													</div>
												</div>
											</div>

										))}
									</div>
								</div>
								<div className="tab-pane" id="best-seller">
									<div className="row">
										{props.woodenProducts?.map((product) => (
											<div key={product.slug} className="single-product col-xl-3 col-lg-4 col-md-6">
												<div className="product-img">
													{product.tag && <span className="pro-label new-label">{product.tag}</span>}
													<Link href={`/product/${product.slug}`}><img style={{cursor:'pointer'}} src={product.image}alt="" /></Link>
													<div className="product-action clearfix">
														{state.wishlist?.wishlistItems?.find((x) => x.slug == product.slug) ?  (
															<button onClick={() => addToWishlistHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Remove from wishlist"><i className="zmdi zmdi-favorite"></i></button>
														) : (	
															<button onClick={() => addToWishlistHandler(product)} data-bs-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="zmdi zmdi-favorite-outline"></i></button>
														)}
														<button onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View"><i className="zmdi zmdi-zoom-in"></i></button>
														<button  onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Share"><i className="zmdi zmdi-share"></i></button>
														<button onClick={() => addToCartHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="zmdi zmdi-shopping-cart-plus"></i></button>
													</div>
												</div>
												<div className="product-info clearfix">
													<div className="fix">
														<h4 className="post-title floatleft"><Link href={`/product/${product.slug}`}>{product.name}</Link></h4>
														
													</div>
													<div className="fix">
														<span className="pro-price floatleft">₹ {product.price}</span>
														{product.actual_price ? <span className="old-price font-16px ml-10 " style={{position:'relative' , top:'3.5px'}}><del>₹ {product.actual_price}</del></span> : ''}
														<span className="pro-rating floatright">
															<Ratingstars reviews={product.reviews}/>
														</span>
													</div>
												</div>
											</div>

										))}
									</div>
								</div>
								<div className="tab-pane" id="most-view">
									<div className="row">
										{props.marbleProducts?.map((product) => (
											<div key={product.slug} className="single-product col-xl-3 col-lg-4 col-md-6">
												<div className="product-img">
													{product.tag && <span className="pro-label new-label">{product.tag}</span>}
													<Link href={`/product/${product.slug}`}><img style={{cursor:'pointer'}} src={product.image} alt="" /></Link>
													<div className="product-action clearfix">
														{state.wishlist?.wishlistItems?.find((x) => x.slug == product.slug) ?  (
															<button onClick={() => addToWishlistHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Remove from wishlist"><i className="zmdi zmdi-favorite"></i></button>
														) : (	
															<button onClick={() => addToWishlistHandler(product)} data-bs-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="zmdi zmdi-favorite-outline"></i></button>
														)}
														<button onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View"><i className="zmdi zmdi-zoom-in"></i></button>
														<button  onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Share"><i className="zmdi zmdi-share"></i></button>
														<button onClick={() => addToCartHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="zmdi zmdi-shopping-cart-plus"></i></button>
													</div>
												</div>
												<div className="product-info clearfix">
													<div className="fix">
														<h4 className="post-title floatleft"><Link href={`/product/${product.slug}`}>{product.name}</Link></h4>
														
													</div>
													<div className="fix">
														<span className="pro-price floatleft">₹ {product.price}</span>
														{product.actual_price ? <span className="old-price font-16px ml-10 " style={{position:'relative' , top:'3.5px'}}><del>₹ {product.actual_price}</del></span> : ''}
														<span className="pro-rating floatright">
															<Ratingstars reviews={product.reviews}/>
														</span>
													</div>
												</div>
											</div>

										))}
									</div>
								</div>
								<div className="tab-pane" id="discounts">
									<div className="row">
										{props.carvingProducts?.map((product) => (
											<div key={product.slug} className="single-product col-xl-3 col-lg-4 col-md-6">
												<div className="product-img">
													{product.tag && <span className="pro-label new-label">{product.tag}</span>}
													<Link href={`/product/${product.slug}`}><img style={{cursor:'pointer'}} src={product.image} alt="" /></Link>
													<div className="product-action clearfix">
														{state.wishlist?.wishlistItems?.find((x) => x.slug == product.slug) ?  (
															<button onClick={() => addToWishlistHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Remove from wishlist"><i className="zmdi zmdi-favorite"></i></button>
														) : (	
															<button onClick={() => addToWishlistHandler(product)} data-bs-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="zmdi zmdi-favorite-outline"></i></button>
														)}
														<button onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View"><i className="zmdi zmdi-zoom-in"></i></button>
														<button  onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Share"><i className="zmdi zmdi-share"></i></button>
														<button onClick={() => addToCartHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="zmdi zmdi-shopping-cart-plus"></i></button>
													</div>
												</div>
												<div className="product-info clearfix">
													<div className="fix">
														<h4 className="post-title floatleft"><Link href={`/product/${product.slug}`}>{product.name}</Link></h4>
														
													</div>
													<div className="fix">
														<span className="pro-price floatleft">₹ {product.price}</span>
														{product.actual_price ? <span className="old-price font-16px ml-10 " style={{position:'relative' , top:'3.5px'}}><del>₹ {product.actual_price}</del></span> : ''}
														<span className="pro-rating floatright">
															<Ratingstars reviews={product.reviews}/>
														</span>
													</div>
												</div>
											</div>

										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- PURCHASE-ONLINE-AREA END --> */}
			{/* <!-- BLGO-AREA START --> */}
			<div className="blog-area pt-55">
				<div className="container">
					{/* <!-- Section-title start --> */}
					<div className="row">
						<div className="col-lg-12">
							<div className="section-title text-center">
								<h2 className="title-border">From The Blog</h2>
							</div>
						</div>
					</div>
					{/* <!-- Section-title end --> */}
					<div className="row">
						{/* <!-- Single-blog start --> */}
						{
							props.blogs.length === 0 ? (<div>No blogs yet</div>) : (
								props.blogs.map((blog) => (
									<div key={blog.slug} className="col-lg-6">
										<div className="single-blog mt-30">
											<div className="row">
												<div className="col-xl-6 col-md-7">
													<div className="blog-info">
														<div className="post-meta fix">
															<div className="post-date floatleft"><span className="text-dark-red">{blog.createdAt.slice(8,10)}</span></div>
															<div className="post-year floatleft">
																<p className="text-uppercase text-dark-red mb-0">{blog.createdAt.slice(4,8)}, {blog.createdAt.slice(10,16)}</p>
																<h4 className="post-title">{blog.title.slice(0,22)}...</h4>
															</div>
														</div>
														<div className="like-share fix">
															<a><i className="zmdi zmdi-share"></i><span>{blog.shareCount} Share</span></a>
														</div>
														<p>{blog.content[0].content.slice(0,167)}...</p>
														<Link href={`/blogs/${blog.slug}`} className="button-2 text-dark-red">Read more...</Link>
													</div>
												</div>
												<div className="col-xl-6 col-md-5">
													<div className="blog-photo">
														<Link href={`/blogs/${blog.slug}`}><img style={{cursor:'pointer'}} src={blog.homeImage} alt={blog.title} /></Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								))
							)
						}
						{/* <!-- Single-blog end --> */}
					</div>
				</div>
			</div>
			{/* <!-- BLGO-AREA END --> */}

    </Layout>
  )
}


export async function getServerSideProps(){
	
	await db.connect();
	const featuredProducts = await Product.find({featured : true}).lean().limit(5);
	const boneInlayProducts = await Product.find({home_page : true , collection_type : 'boneInlay'}).lean().limit(8);
	const woodenProducts = await Product.find({home_page : true , collection_type : 'wooden'} ).lean().limit(8);
	const marbleProducts = await Product.find({home_page : true , collection_type : 'marble'} ).lean().limit(8);
	const carvingProducts = await Product.find({home_page : true , collection_type : 'carving'} ).lean().limit(8);
	const blogs = await Blog.find({} ).lean().limit(2);
	const home = await Home.find({}).lean();
	return {
		props : {
			featuredProducts : featuredProducts.map(db.convertDocToObj),
			boneInlayProducts : boneInlayProducts.map(db.convertDocToObj),
			woodenProducts : woodenProducts.map(db.convertDocToObj),
			marbleProducts : marbleProducts.map(db.convertDocToObj),
			carvingProducts : carvingProducts.map(db.convertDocToObj),
			blogs : blogs.map(db.convertDocToObj),
			home : home.map(db.convertDocToObj)
		},
	};

}