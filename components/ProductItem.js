import React, { useContext } from 'react'
import Link from 'next/link'
import Ratingstars from './Ratingstars'
import { Store } from '../utils/Store'

export default function ProductItem({product , addToCartHandler , showProduct , addToWishlistHandler}) {
	const state = useContext(Store);
	
  return (
	<div className="col-lg-4 col-md-6">
		<div className="single-product">
			<div className="product-img">
				{product.tag && <span className="pro-label new-label">{product.tag}</span>}
				<span className="pro-price-2">₹ {product.price}</span>
				<Link  href={`/product/${product.slug}`}><img style={{cursor:'pointer'}} src={product.image} alt={product.name}/></Link>
			</div>
			<div className="product-info clearfix text-center">
				<div className="fix">
					<h4 className="post-title"><Link href={`/product/${product.slug}`}>{product.name}</Link></h4>
				</div>
				<div className="fix">
					<span className="pro-rating">
						<Ratingstars reviews={product.reviews} />
					</span>
				</div>
				<div className="product-action clearfix">
					{state?.wishlist?.wishlistItems?.find((x) => x.slug == product.slug) ?  (
						<button onClick={() => addToWishlistHandler(product)}  data-bs-toggle="tooltip" data-placement="top" title="Remove from wishlist"><i className="zmdi zmdi-favorite"></i></button>
					) : (	
						<button onClick={() => addToWishlistHandler(product)} data-bs-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="zmdi zmdi-favorite-outline"></i></button>
					)}
					<button onClick={() => showProduct(product)}  data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View"><i className="zmdi zmdi-zoom-in"></i></button>
					<button onClick={() => showProduct(product)} data-bs-toggle="modal"  data-bs-target="#productModal" title="share"><i className="zmdi zmdi-share"></i></button>
					<button onClick={() => addToCartHandler(product , 1)} data-bs-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="zmdi zmdi-shopping-cart-plus"></i></button>
				</div>
			</div>
		</div>
	</div>
  )
}
