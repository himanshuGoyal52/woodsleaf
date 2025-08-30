import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Header({title}) {

	const { status , data : session } = useSession();
	const router = useRouter();

	const {state , dispatch} = useContext(Store);
	const {cart} = state;
	
	const [cartItems , setcartItems] = useState(0);
	useEffect(() => {
		setcartItems(cart.cartItems.reduce((a,c) => a+c.quantity , 0))
	},[cart.cartItems]);


	const logoutClickHandler = () => {
		Cookies.remove('cart');
		dispatch({ type : 'CART_RESET' });
		signOut({callbackUrl : "/login" });
	};



  return (
    <>
        {/* <!-- Mobile-header-top Start --> */}
        {title === "Home" ?  
            <div className="mobile-header-top d-block d-md-none">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* <!-- header-search-mobile start --> */}
                            <div className="header-search-mobile">
                                <div className="table">
                                    <div className="table-cell">
                                        <ul>
                                            <li><a className="search-open"><i className="zmdi zmdi-search"></i></a></li>
											{session?.user ? (<li><Link href="/profile"><a><i className="zmdi zmdi-account"></i></a></Link></li>) : (<li><Link  href="/login"><a><i className="zmdi zmdi-lock"></i></a></Link></li>)}
                                            <li><Link href="/wishlist"><a><i className="zmdi zmdi-favorite"></i></a></Link></li>
                                            <li><Link  href="/blogs"><a><i className="zmdi zmdi-collection-text"></i></a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- header-search-mobile start --> */}
                        </div>
                    </div>
                </div>
            </div>
        :
            ``
        }
		{/* <!-- Mobile-header-top End --> */}
			
            {/* <!-- HEADER-AREA START --> */}
			<header id="sticky-menu" className={`header ${title === "Home" ? "" : "header-2"}`}>
				<div className="header-area">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-4 offset-md-4 col-7">
								<div className="logo text-md-center">
									<Link href="/"><img style={{cursor:'pointer'}} src="/img/logo/logo.png"  alt="Dcraftive" /></Link>
								</div>
							</div>
							<div className="col-md-4 col-5">
								<div className="mini-cart text-end">
									<ul>
										<li>
										    <a className="cart-icon"><i className="zmdi zmdi-shopping-cart"></i>{cartItems ? <span>{cartItems > 0 && cartItems}</span> : <></>}</a>
											{cartItems ? 
												(
													<div className="mini-cart-brief text-left">
													<div className="cart-items">
														<p className="mb-0">You have <span>{cartItems} items</span> in your shopping bag</p>
													</div>
													<div className="all-cart-product clearfix">
														{	
															cart?.cartItems?.slice(0,2).map((item) => (
															<div key={item.slug} className="single-cart clearfix">
																<div className="cart-photo">
																	<Link href={`/product/${item.slug}`}><a><Image width={75} height={75} src={item.image} alt={item.name} /></a></Link>
																</div> 
																<div className="cart-info">
																	<h5><Link href={`/product/${item.slug}`}><a>{item.name.slice(0,22)}</a></Link></h5>
																	<p className="mb-0">Price : ₹ {item.price}</p>
																	<p className="mb-0">Qty : {item.quantity} </p>
																</div>
															</div>
															))
														}
														
													</div>
													<div className="cart-totals">
														<h5 className="mb-0">Total : &nbsp;<span className="floatright">${cart?.cartItems?.reduce((a,c) => a+c.quantity * c.price,0)}</span></h5>
													</div>
													<div className="cart-bottom  clearfix">
														<Link  href="/cart"  ><a style={{border: '2px solid #d1cac1'}} data-text="View cart" className="button-one floatleft text-uppercase">View cart</a></Link>
														<button  onClick={() => router.push('login?redirect=/shipping')} style={{border: '2px solid #d1cac1'}}   className="button-one floatright text-uppercase" data-text="Check out">Check out</button>
													</div>
												</div>
												)
											:
											``}
											
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- MAIN-MENU START --> */}
				<div className={`menu-toggle ${title === "Home" ? "" : "menu-toggle-2"} hamburger hamburger--emphatic d-none d-md-block active"`}>
					<div className="hamburger-box">
						<div className="hamburger-inner"></div>
					</div>
				</div>
				<div className="main-menu  d-none d-md-block">
					<nav>
						<ul>
							<li><Link href="/">home</Link></li>
							<li><Link href="/shop">products</Link>
								<div className="mega-menu menu-scroll">
									<div className="table">
										<div className="table-cell">
											<div className="half-width">
												<ul>
													<li className="menu-title">Categories</li>
													<li><Link href="/shop/coffeTable">Coffe Table</Link></li>
													<li><Link href="/shop/sofa">Sofa</Link></li>
													<li><Link href="/shop/studyTable">Study Table</Link></li>
													<li><Link href="/shop/consoleTable">Console Table</Link></li>
													<li><Link href="/shop/endTable">End Table</Link></li>
													<li><Link href="/shop/bedsideTable">Bedside Table</Link></li>
													<li><Link href="/shop/bed">Bed</Link></li>
													<li><Link href="/shop/bunkBed">Bunk bed</Link></li>
												</ul>
											</div>
											<div className="half-width">
												<ul>
													<li className="menu-title">Categories</li>
													<li><Link href="/shop/dressing">Dressing</Link></li>
													<li><Link href="/shop/cabinet">Cabinet</Link></li>
													<li><Link href="/shop/tvUnit">TV unit</Link></li>
													<li><Link href="/shop/chestOfDrawer">Chest of Drawer</Link></li>
													<li><Link href="/shop/sideBoard">Side Board</Link></li>
													<li><Link href="/shop/diningTable">Dining Table</Link></li>
													<li><Link href="/shop/chair">Chair</Link></li>
													<li><Link href="/shop/stool">Stool</Link></li>
													<li><Link href="/shop/ottoman">Ottoman</Link></li>
												</ul>
											</div>
											<div className="full-width">
												<div className="mega-menu-img">
													<Link  href="/shop" ><Image width={501} height={220} style={{cursor:'pointer'}} src="/img/laptopHeader.png" alt="" /></Link>
												</div>
											</div>
											<div className="pb-80"></div>
										</div>
									</div>
								</div>
							</li>
							<li><Link href="/cart">Cart</Link></li>
							<li><Link href="/wishlist">Wishlist</Link></li>
							<li><Link href="/blogs">blog</Link></li>
							<li><Link href="/aboutus">about us</Link></li>
							<li><Link href="/contact">contact</Link></li>
							{status === 'loading' ? ('Loading') : 
								session?.user ? ( <li><Link href="/profile">{session.user.name.split(' ')[0]}</Link></li> )
								:(
									<li><Link href="/login">Login</Link></li>
								)
							}
							{ session?.user  ? (<li style={{cursor:'pointer'}} onClick={logoutClickHandler}><a>Log out</a></li>) : (<></>)}
							{
								session?.user.isAdmin && (<li style={{cursor:'pointer'}} ><Link href="/admin/dashboard">Dashboard</Link></li>)
							}
						</ul>
					</nav>
				</div>
				{/* <!-- MAIN-MENU END --> */}
			</header>
			{/* <!-- HEADER-AREA END --> */}
			{/* <!-- Mobile-menu start --> */}
			<div className="mobile-menu-area">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xs-12 d-block d-md-none">
							<div className="mobile-menu">
								<nav id="dropdown">
									<ul>
										<li><Link href="/">Home</Link></li>
										<li><Link href="/shop">products</Link>
											<ul>
												<li><Link href="/shop/coffeTable">Coffe Table</Link></li>
												<li><Link href="/shop/sofa">Sofa</Link></li>
												<li><Link href="/shop/studyTable">Study Table</Link></li>
												<li><Link href="/shop/consoleTable">Console Table</Link></li>
												<li><Link href="/shop/endTable">End Table</Link></li>
												<li><Link href="/shop/bedsideTable">Bedside Table</Link></li>
												<li><Link href="/shop/bed">Bed</Link></li>
												<li><Link href="/shop/bunkBed">Bunk bed</Link></li>
												<li><Link href="/shop/dressing">Dressing</Link></li>
												<li><Link href="/shop/cabinet">Cabinet</Link></li>
												<li><Link href="/shop/tvUnit">TV unit</Link></li>
												<li><Link href="/shop/chestOfDrawer">Chest of Drawer</Link></li>
												<li><Link href="/shop/sideBoard">Side Board</Link></li>
												<li><Link href="/shop/diningTable">Dining Table</Link></li>
												<li><Link href="/shop/chair">Chair</Link></li>
												<li><Link href="/shop/stool">Stool</Link></li>
												<li><Link href="/shop/ottoman">Ottoman</Link></li>
											</ul>
										</li>
										<li><Link href="/cart"><a>Cart</a></Link></li>
										<li><Link href="/wishlist"><a>Wishlist</a></Link></li>
										<li><Link href="/blogs"><a>blog</a></Link></li>
										<li><Link href="/aboutus"><a>about us</a></Link></li>
										<li><Link href="/contact"><a>contact</a></Link></li>
										{status === 'loading' ? ('Loading') : 
											session?.user ? ( <li><Link href="/profile">{session.user.name.split(' ')[0]}</Link></li> )
											:(
												<li><Link href="/login">Login</Link></li>
											)
										}
										{
											session?.user.isAdmin && (<li style={{cursor:'pointer'}} ><Link href="/admin/dashboard">Dashboard</Link></li>)
										}

									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
    </>
  )
}
