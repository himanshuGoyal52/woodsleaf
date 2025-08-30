import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { dateConvert, getError } from '../../utils/error';
import Banner from '../../components/Banner';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import Trackorder from '../../components/Trackorder';
import useRazorpay from 'react-razorpay';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, order: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'PAY_REQUEST':
        return { ...state, loadingPay: true };
      case 'PAY_SUCCESS':
        return { ...state, loadingPay: false, successPay: true };
      case 'PAY_FAIL':
        return { ...state, loadingPay: false, errorPay: action.payload };
      case 'PAY_RESET':
        return { ...state, loadingPay: false, successPay: false, errorPay: '' };
      case 'DELIVER_REQUEST':
        return { ...state, loadingDeliver: true };
      case 'DELIVER_SUCCESS':
        return { ...state, loadingDeliver: false, successDeliver: true };
      case 'DELIVER_FAIL':
        return { ...state, loadingDeliver: false};
      case 'DELIVER_RESET':
        return {
          ...state,
          loadingDeliver: false,
          successDeliver: false
        };
      default:
        state;
    }
  }

export default function OrderScreen() {
    const {data : session} = useSession();
    const [{isPending} , paypalDispatch ] = usePayPalScriptReducer();
    const router = useRouter();

    const {query} = useRouter();
    const orderId = query.id;
    const [
        { loading, error, order, successPay , loadingPay , loadingDeliver, successDeliver },
        dispatch,
      ] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
      });

      useEffect(() => {
        // if (!userInfo) {
        //   return router.push('/login');
        // }
        const fetchOrder = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/orders/${orderId}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };
        if (
          !order._id ||
          successPay ||
          successDeliver ||
          (order._id && order._id !== orderId)
        ) {
          fetchOrder();
          if (successPay) {
            dispatch({ type: 'PAY_RESET' });
          }
          if (successDeliver) {
            dispatch({ type: 'DELIVER_RESET' });
          }
        } else {
          const loadPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/keys/paypal');
            paypalDispatch({
              type: 'resetOptions',
              value: {
                'client-id': clientId,
                currency: 'USD',
              },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
          };
          loadPaypalScript();
        }
      }, [order, successPay, successDeliver, orderId, paypalDispatch]);

      const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        totalPrice,
        isPaid,
        deliveryStatus,
      } = order;


      function createOrder(data, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: totalPrice },
              },
            ],
          })
          .then((orderID) => {
            return orderID;
          });
      }
      function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
          try {
            dispatch({ type: 'PAY_REQUEST' });
            const { data } = await axios.put(
              `/api/orders/${order._id}/pay`,
              details,
            );
            dispatch({ type: 'PAY_SUCCESS', payload: data });
            toast.success("Order is paid successfully!!");
          } catch (err) {
            dispatch({ type: 'PAY_FAIL', payload: getError(err) });
            toast.error(getError(err));
          }
        });
      }
    
      function onError(err) {
        toast.error(getError(err));
      }


      // razorpay //
      const Razorpay = useRazorpay();
      const [razorpayLoading , setRazorpayLoading] = useState(false);
      const handlePayment = useCallback(async () => {
        setRazorpayLoading(true);
        const info = await axios.get( `/api/orders/${orderId}/razorpay`);
       
        const options = {
          key: info.data.key,
          amount: info.data.amount,
          currency: "INR",
          name: "Dcraftive",
          description: "Transaction",
          image: "https://xcmprn.stripocdn.email/content/guids/CABINET_aa5f800d1a4d1636fc6ba7e018205b294e599208b3a1e002ce02964ececeddfc/images/leaf_trans_logo.png",
          order_id: info.data.id,
          handler: async (res) => {
            const _data =  await axios.post (`/api/orders/${orderId}/verify`,{
                razorpay_payment_id :res.razorpay_payment_id ,
                razorpay_order_id : res.razorpay_order_id ,
                razorpay_signature : res.razorpay_signature,
            });
            if(_data.error){
                toast.error("Payment Unsuccessful");
            }else{
                toast.success('Payment Successful (reload!!!)');
                router.reload();
            }
          },
          theme: {
            color: "#6d8c75",
          },
        };
      
        const rzpay = new Razorpay(options);
        setRazorpayLoading(false);
        rzpay.open();
      }, [Razorpay, orderId, router]);
    

      const deliveryArray = ['Order Processing' , 'Order Dispatched' , 'In Transit' , 'Delivered'];
      async function deliverOrderHandler() {
        try {
          dispatch({ type: 'DELIVER_REQUEST' });
          const { data } = await axios.put(
            `/api/admin/orders/${order._id}/deliver`,
            {}
          );
          dispatch({ type: 'DELIVER_SUCCESS', payload: data });
          toast.success(`Order is ${deliveryArray[order.deliveryStatus]}`);
        } catch (err) {
          dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
          toast.error(getError(err));
        }
      }

  return (
    <Layout title={`Order ${orderId}`} desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
      <Banner bannerText="Order"   />
			{/* <!-- WISHLIST-AREA START --> */}
			<div className="shopping-cart-area pt-80 pb-80">
				<div className="container">	
          {loading ? (<div>Loading...</div>) : 
            error ? ( <div>{error}</div> ) :
            (
              <div className="row">
              <div className="col-lg-12">
                <div className="shopping-cart">
                  
                  <div  className="thank-recieve  mb-30" style={{backgroundColor : '#6d8c75' , color : '#efebd9'}}>
                    {isPaid ? (<p>Thank you. Your order has been placed.</p>) : (<p>Thank you. Your order has been received.</p>)}
                  </div>
                  <div  className="order-info  text-center clearfix mb-30" style={{backgroundColor : '#e4e0d3'}}>
                    <div  className="single-order-info">
                      <h4  className="title-1 text-uppercase mb-0" style={{color : '#6d8c75'}}>order id</h4>
                      <p  className="text-uppercase text-light-black mb-0"><strong>{order._id}</strong></p>
                    </div>
                    <div  className="single-order-info">
                      <h4  className="title-1 text-uppercase mb-0" style={{color : '#6d8c75'}}>Date</h4>
                      <p  className="text-uppercase text-light-black mb-0"><strong>{dateConvert(order.createdAt?.slice(0,10))}</strong></p>
                    </div>
                    <div  className="single-order-info">
                      <h4  className="title-1 text-uppercase mb-0" style={{color : '#6d8c75'}}>Payment Status</h4>
                      <p  className="text-uppercase text-light-black mb-0"><strong>{order.isPaid ? 'Paid' : (<span style={{color : 'red'}}>Not Paid</span>)}</strong></p>
                    </div>
                    <div  className="single-order-info">
                      <h4  className="title-1 text-uppercase mb-0" style={{color : '#6d8c75'}}>payment method</h4>
                      <p  className="text-uppercase text-light-black mb-0"><strong>{paymentMethod}</strong></p>
                    </div>
                  </div>
                  <Trackorder deliveryStatus={deliveryStatus} isPaid={order.isPaid}/>

                  <div  className="shop-cart-table check-out-wrap ">
												<div  className="row">
													<div  className="col-md-6">
														<div  className="our-order payment-details pr-20">
															<h4  className="title-1 title-border text-uppercase mb-30">Your order</h4>
															<table>
																<thead>
																	<tr>
																		<th><strong>Product</strong></th>
																		<th  className="text-end"><strong>Total</strong></th>
																	</tr>
																</thead>
																<tbody>
																	{
																		orderItems.map((item) => (
																			<tr key={item._id}>
																				<td>{item.name}  x {item.quantity}</td>
																				<td  className="text-end">${item.price * item.quantity}</td>
																			</tr>
																		))
																	}
																	<tr>
																		<td>Cart Subtotal</td>
																		<td  className="text-end">${itemsPrice}</td>
																	</tr>
																	
																	<tr>
																		<td>Vat</td>
																		<td  className="text-end">${taxPrice}</td>
																	</tr>
																	<tr>
																		<td>Order Total</td>
																		<td  className="text-end">${totalPrice}</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
													{/* <!-- payment-method --> */}
													<div  className="col-md-6 mt-xs-30">
														<div  className="payment-method  pl-20">
															<h4  className="title-1 title-border text-uppercase mb-30">Shipping Address</h4>
															<p>{shippingAddress.fullName} , {shippingAddress.address} , {shippingAddress.city} , {shippingAddress.state} , {shippingAddress.country} , {shippingAddress.postalCode}</p>
															<p >Phone number : {shippingAddress.phone}  </p>			
														</div>
                            {!isPaid && (
                            <>
                              {paymentMethod === "paypal" ? (
                                <div className="payment-method  pl-20" >
                                  {isPending ? (<div>Loding..</div>) : (
                                    <div>
                                      
                                    <h4  className="title-1 title-border text-uppercase mb-30">Pay via paypal</h4>
                                      <PayPalButtons
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={onError}
                                      ></PayPalButtons>
                                    </div>
                                  )}
                                  {loadingPay && <div>Loading...</div>}
                                </div>
                              ) :(
                                <div className=" mt-30 quick-add-to-cart col-md-6 mt-xs-30 pl-20">
                                  <h4  className="title-1 title-border text-uppercase mb-30">Pay via razorpay</h4>
                                  <button style={{ fontSize : '1rem', marginLeft : '0px' , display : 'flex', alignItems: 'center', justifyContent: 'space-evenly' , width : '98%' , padding : '0px 36px'}} className="single_add_to_cart_button" onClick={handlePayment}>{razorpayLoading ? 'Loading..' : (<>Pay <Image  width={150} height={31.8} alt="razorpay"  src='/img/razorpay.png'  /></>)}</button>
                                </div>
                              )}
                            </>
                            )}

                            {session.user.isAdmin && order.isPaid && order.deliveryStatus < 4 && (
                              <div className=" mt-30 quick-add-to-cart col-md-6 mt-xs-30 pl-20">
                              <button style={{ fontSize : '1rem', marginLeft : '0px' , display : 'flex', alignItems: 'center', justifyContent: 'space-evenly' , width : '98%' , padding : '0px 36px'}} className="single_add_to_cart_button" onClick={deliverOrderHandler}>{loadingDeliver ? 'Loading...' : deliveryArray[order.deliveryStatus]} </button>
                              </div>
                            )}
													</div>
												</div>
									</div>
  
                </div>
              </div>
            </div>
            )
          }
					
				</div>
			</div>
			{/* <!-- WISHLIST-AREA END --> */}
    </Layout>
  )
}

OrderScreen.auth = true;