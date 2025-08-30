import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store';
import Image from 'next/image';

export default function CartItem({item}) {

    const {state , dispatch} = useContext(Store);
    const removeItemHandler = ()=>{
        dispatch({type:'CART_REMOVE_ITEM' , payload:item});
    };

    const [qty , setQty] = useState(item.quantity);

    useEffect(()=>{
        const updateCartHandler =  () => {
            dispatch({type : 'CART_ADD_ITEM' , payload : {...item , quantity : qty}});
        }
        updateCartHandler();
    },[ qty])

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
    <>
        <tr key={item.slug}>
            <td className="product-thumbnail  text-left">
                {/* <!-- Single-product start --> */}
                <div className="single-product">
                    <div className="product-img">
                        <Link href={`/product/${item.slug}`}><Image style={{cursor:'pointer'}} src={item.image} width={110} height={110} alt={item.name} /></Link>
                    </div>
                    <div className="product-info">
                        <h4 className="post-title"><Link className="text-light-black" href={`/product/${item.slug}`}>{item.name.slice(0,22)}</Link></h4>
                        <p className="mb-0">Category : {mapping[item.category]}</p>
                        <p className="mb-0">SKU : {item.sku}</p>
                    </div>
                </div>
                {/* <!-- Single-product end -->	*/}
            </td>
            <td className="product-price">${item.price}</td>
            <td className="product-quantity">
                <div style={{display : 'flex' , alignItems : 'center' , justifyContent : 'center'}}>

				 <div style={{display:'flex' , backgroundColor : '#6d8c75' , height:'40px' , width : '175px' , alignItems : 'center' , justifyContent : 'space-evenly'}}>
					<span className='onhoverMilk' onClick={() =>{ if(qty > 1)setQty(qty-1);}} style={{fontSize : '1.5em'  , fontWeight : 'lighter',  cursor : 'pointer'}}>-</span>
					<input className='cart-plus-minus-box' disabled  style={{ height : '17px', color : "#343434" , borderRight : 'solid #343434 0.5px' , borderLeft : 'solid #343434 0.5px'}} type="text" value={qty}  />	
					<span className='onhoverMilk'  onClick={() => {setQty(qty+1); }} style={{fontSize : '1.5em'  , fontWeight : 'lighter' , cursor : 'pointer'}}>+</span>
				</div>
                </div>
            </td>
            <td className="product-subtotal">₹ {item.price * item.quantity}</td>
            <td className="product-remove">
                <span style={{cursor:'pointer'}} onClick={()=>removeItemHandler(item)}><i className="zmdi zmdi-close"></i></span>
            </td>
        </tr>
    </>
  )
}
