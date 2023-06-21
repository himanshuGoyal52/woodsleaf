import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout'
import ProductItem from '../../components/ProductItem'
import ProductItemtwo from '../../components/ProductItemtwo'
import db from '../../utils/db'
import Product from '../../models/Product'
import { Store } from '../../utils/Store'
import { toast } from 'react-toastify'
import Banner from '../../components/Banner'
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function shop({products}) {
	const {state , dispatch} = useContext(Store);
	const router = useRouter();

	const [productObj , setproductObj] = useState({});
	const showProduct = (product) => {
		setproductObj(product);
	}
	
	const [priceRange , setPriceRange] = useState(300);
	const [fproducts , setFproducts] = useState(products);
	const updateFilterValue = (e) => {
		let value = e.target.value;

		setPriceRange(value);
		const filteredProducts = products.filter(function(itm){
			return itm.price <= value;
		  });

		setFproducts(filteredProducts);

	}

	const [query , setQuery] = useState('');
	const submitHandlerSearch = (e) => {
		e.preventDefault();
		router.push(`/shop?query=${query}`)
	}

	const addToCartHandler =  (product , qty) => {
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + qty : qty;		
        dispatch({type:'CART_ADD_ITEM' , payload : {...product , quantity }});	
		toast.success(`${product.name} added to the cart`);
		// router.push('/cart');
    };

	const addToWishlistHandler =  (product ) => {
        const existItem = state.wishlist.wishlistItems.find((x) => x._id === product._id);
		if(existItem){
			toast.error(`${product.name} is already in your wishlist`);
			return ;
		}
        dispatch({type:'WISHLIST_ADD_ITEM' , payload : {...product  }});	
		toast.success(`${product.name} added to the your wishlist`);
		// router.push('/cart');
    };

  return (
    <Layout title="Shop" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature" productObj={productObj} addToCart={addToCartHandler} >
      <>
	  		<Banner bannerText="Shop" />
			{/* <!-- PRODUCT-AREA START --> */}
			<div className="product-area pt-80 pb-80 product-style-2">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 order-2 order-lg-1">
							{/* <!-- Widget-Search start --> */}
							<aside className="widget widget-search mb-30">
								<form onSubmit={submitHandlerSearch}>
									<input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search here..." />
									<button type="submit">
										<i className="zmdi zmdi-search"></i>
									</button>
								</form>
							</aside>
							{/* <!-- Widget-search end --> */}
							{/* <!-- Widget-Categories start --> */}
							<aside className="widget widget-categories  mb-30">
								<div className="widget-title">
									<h4>Categories</h4>
								</div>
								<div id="cat-treeview"  className="widget-info product-cat boxscrol2">
									<ul>
										<li><span>Living Room</span>
											<ul>
												<li><Link href="/shop/coffeTable">Coffe Table</Link></li>
												<li><Link href="/shop/sofa">Sofa</Link></li>
												<li><Link href="/shop/studyTable">Study Table</Link></li>
												<li><Link href="/shop/consoleTable">Console Table</Link></li>
												<li><Link href="/shop/endTable">End Table</Link></li>
											</ul>
										</li>          
										<li className="open"><span>Bedroom</span>
											<ul>
												<li><Link href="/shop/bedsideTable">Bedside Table</Link></li>
												<li><Link href="/shop/bed">Bed</Link></li>
												<li><Link href="/shop/bunkBed">Bunk Bed</Link></li>
												<li><Link href="/shop/dressing">Dressing</Link></li>
											</ul>
										</li>          
										<li><span>Cabinetry</span>
											<ul>
												<li><Link href="/shop/cabinet">Cabinet</Link></li>
												<li><Link href="/shop/tvUnit">TV Unit</Link></li>
												<li><Link href="/shop/chestOfDrawer">Chest of Drawer</Link></li>
												<li><Link href="/shop/sideBoard">Side Board</Link></li>
											</ul>
										</li>
										<li><span>Dining & Kitchen</span>
											<ul>
												<li><Link href="/shop/diningTable">Dining Table</Link></li>
												<li><Link href="/shop/chair">Chair</Link></li>
											</ul>
										</li>
										<li><span>Seating</span>
											<ul>
												<li><Link href="/shop/chair">Chair</Link></li>
												<li><Link href="/shop/stool">Stool</Link></li>
												<li><Link href="/shop/ottoman">Ottoman</Link></li>
											</ul>
										</li>
									</ul>
								</div>
							</aside>
							{/* <!-- Widget-categories end --> */}
							<aside className="widget shop-filter mb-30">
								<div className="widget-title">
									<h4>Price Range</h4>
								</div>
							
								<div className="widget-info">
									<div className="price_filter">
										<div className="price_slider_amount">
											<p>$ {priceRange}</p>
											<input type="range" value={priceRange} min={50} max={2000} step='1' onChange={updateFilterValue} />
										</div>
										{/* <div id="slider-range"></div> */}
									</div>
								</div>
							</aside>
						</div>
						<div className="col-lg-9 order-1 order-lg-2">
							{/* <!-- Shop-Content End --> */}
							<div className="shop-content mt-tab-30 mb-30 mb-lg-0">
								<div className="product-option mb-30 clearfix">
									{/* <!-- Nav tabs --> */}
									<ul className="nav d-block shop-tab">
										<li><a href="#grid-view" data-bs-toggle="tab"><i className="zmdi zmdi-view-module"></i></a></li>
										<li><a className="active" href="#list-view"  data-bs-toggle="tab"><i className="zmdi zmdi-view-list"></i></a></li>
									</ul>
									<div className="showing text-end d-none d-md-block">
										<p className="mb-0">Showing 1-{fproducts.length} of {fproducts.length} Results</p>
									</div>
								</div>
								{/* <!-- Tab panes --> */}
								<div className="tab-content">
									{fproducts.length === 0 ? (
										<div>No products</div>
									) : (
										<>
											<div className="tab-pane" id="grid-view">							
												<div className="row">
													{ fproducts.map((product) => (
														<ProductItem showProduct={showProduct}  addToCartHandler={addToCartHandler} addToWishlistHandler={addToWishlistHandler} product={product} key={product._id}></ProductItem>
													))}
													
												</div>
											</div>
											<div className="tab-pane active" id="list-view">							
												<div className="row shop-list">
													{ fproducts.map((product) => (
														<ProductItemtwo showProduct={showProduct}  addToCartHandler={addToCartHandler} addToWishlistHandler={addToWishlistHandler} product={product} key={product._id}></ProductItemtwo>
													))}
													
												</div>
											</div>
										</>
									)}
								</div>
							</div>
							{/* <!-- Shop-Content End --> */}
						</div>
					</div>
				</div>
			</div>
			{/* <!-- PRODUCT-AREA END --> */}
      </>
    </Layout>
  )
}

export async function getServerSideProps({query}){

	const searchQuery = query.query || '';

	const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};

	await db.connect();
	const products = await Product.find({...queryFilter,}).lean();
	return {
		props : {
			products : products.map(db.convertDocToObj),
		},
	};

}