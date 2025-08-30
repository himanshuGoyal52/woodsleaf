import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FacebookShareButton , TwitterShareButton , WhatsappShareButton , LinkedinShareButton } from 'react-share'

export default function QuickView({product , addToCart}) {
  return (
	    <div id="quickview-wrapper" style={{backgroundColor : '#0000001a'}}>   
            <div  className="modal fade" id="productModal" tabIndex="-1" role="dialog">
                 <div  className="modal-dialog" role="document">
                     <div  className="modal-content" style={{backgroundColor : '#efebd9'}}>
                         <div  className="modal-header">
                             <button type="button"  className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                         </div>
                         <div  className="modal-body">
                             <div  className="modal-product">
                                 <div  className="product-images">
                                     <div  className="main-image images">
                                         <Image width={370} height={450} alt={product?.name} src={product?.image1}/>
                                     </div>
                                 </div>

                                 <div  className="product-info">
                                     <h1 style={{color : '#6d8c75'}}>{product?.name}</h1>
                                     <div  className="price-box-3">
                                         <hr />
                                         <div  className="s-price-box">
                                             <span  className="new-price">${product?.price}</span>
                                             {product?.actual_price ? <span  className="old-price" style={{fontSize : '0.7em'}}>${product?.actual_price}</span> : ''}
                                         </div>
                                         <hr />
                                     </div>
                                     <a className="see-all" href={`/product/${product?.slug}`}>See all features</a>
                                     <div  className="quick-add-to-cart">
                                         <div  className="cart">
                                             <button style={{marginLeft : '0px'}}  className="single_add_to_cart_button" onClick={() => { addToCart(product , 1)}}>Add to cart</button>
                                         </div>
                                     </div>
                                     <div  className="quick-desc">
                                         {product?.desc?.slice(0,125)}...
                                     </div>
                                     <div  className="social-sharing">
                                         <div  className="widget widget_socialsharing_widget" style={{backgroundColor : '#efebd9'}}>
                                             <h3  className="widget-title-modal">Share this product</h3>
                                             <ul  className="social-icons">
                                                 <li> <WhatsappShareButton title={product?.name} separator='||' url={`https://www.dcraftive.com/product/${product?.slug}`}> <a target="_blank" title="Whatsapp"   className="gplus social-icon"><i  className="zmdi zmdi-whatsapp"></i></a> </WhatsappShareButton></li>
                                                 <li> <TwitterShareButton title={product?.name} url={`https://www.dcraftive.com/product/${product?.slug}`} > <a target="_blank" title="Twitter"   className="twitter social-icon"><i  className="zmdi zmdi-twitter"></i></a> </TwitterShareButton></li>
                                                 <li> <FacebookShareButton quote={product?.name} hashtag='#dcraftive' url={`https://www.dcraftive.com/product/${product?.slug}`}><a target="_blank" title="Facebook"   className="facebook social-icon"><i  className="zmdi zmdi-facebook"></i></a> </FacebookShareButton> </li>
                                                 <li> <LinkedinShareButton title={product?.name} url={`https://www.dcraftive.com/product/${product?.slug}`}><a target="_blank" title="LinkedIn"   className="linkedin social-icon"><i  className="zmdi zmdi-linkedin"></i></a> </LinkedinShareButton></li>
                                             </ul>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
            
        </div>
        
  )
}
