import React, { useContext, useState } from 'react'
import Ratingstars from './Ratingstars'
import { Store } from '../utils/Store';
import Link from 'next/link';

export default function ProductItemtwo({product , addToCartHandler , showProduct  , addToWishlistHandler}) {
	const [qty , setQty] = useState(1);
	const {state} = useContext(Store);

  return (
    <div className="col-lg-12">
		<div className="single-product clearfix">
			<div className="product-img">
				{product.tag && <span className="pro-label new-label">{product.tag}</span>}
				<span className="pro-price-2">₹ {product.price}</span>
				<Link href={`/product/${product.slug}`}><img style={{cursor:'pointer'}} src={product.image} alt={product.name} /></Link>
			</div>
			<div className="product-info">
				<div className="fix">
					<h4 className="post-title floatleft"><Link href={`/product/${product.slug}`}>{product.name}</Link></h4>
					<span className="pro-rating floatright">
						<Ratingstars reviews={product.reviews} />
						<span>( {product.reviews?.length} Rating )</span>
					</span>
				</div>
				<div className="fix mb-20">
					<span className="pro-price">₹ {product.price}</span>
					{product.actual_price ? <span className="old-price font-16px ml-10"><del>₹ {product.actual_price}</del></span> : ''}
				</div>
				<div className="product-description">
					<p>{product.desc.slice(0,326)}...</p>
				</div>
				<div className="clearfix responsiveFelxi" style={{display : 'flex'}}>
					<div style={{display:'flex' , backgroundColor : '#6d8c75' , height:'40px' , width : '175px' , alignItems : 'center' , justifyContent : 'space-evenly'}}>
						<span className='onhoverMilk' onClick={() =>{ if(qty > 1)setQty(qty-1)}} style={{fontSize : '1.5em'  , fontWeight : 'lighter',  cursor : 'pointer'}}>-</span>
						<input className='cart-plus-minus-box' disabled  style={{ height : '17px', color : "#343434" , borderRight : 'solid #343434 0.5px' , borderLeft : 'solid #343434 0.5px'}} type="text" value={qty}  />	
						<span className='onhoverMilk'  onClick={() => setQty(qty+1)} style={{fontSize : '1.5em'  , fontWeight : 'lighter' , cursor : 'pointer'}}>+</span>
					</div>
					<div className="product-action clearfix">
						{state.wishlist?.wishlistItems?.find((x) => x.slug == product.slug) ?  (
							<button onClick={() => addToWishlistHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Remove from wishlist"><i className="zmdi zmdi-favorite"></i></button>
						) : (	
							<button onClick={() => addToWishlistHandler(product)} data-bs-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="zmdi zmdi-favorite-outline"></i></button>
						)}
						<button onClick={() => showProduct(product)}    data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View"><i className="zmdi zmdi-zoom-in"></i></button>
						<button onClick={() => showProduct(product)} data-bs-toggle="modal"  data-bs-target="#productModal" title="share"><i className="zmdi zmdi-share"></i></button>
						<button onClick={() => addToCartHandler(product , qty)} data-bs-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="zmdi zmdi-shopping-cart-plus"></i></button>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}
