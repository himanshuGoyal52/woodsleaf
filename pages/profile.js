import React, {  useContext, useEffect, useReducer } from 'react'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import { dateConvert, getError } from '../utils/error';
import axios from 'axios';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';

function reducer(state, action) {
	switch (action.type) {
	  case 'FETCH_REQUEST':
		return { ...state, loading: true, error: '' };
	  case 'FETCH_SUCCESS':
		return { ...state, loading: false, orders: action.payload, error: '' };
	  case 'FETCH_FAIL':
		return { ...state, loading: false, error: action.payload };
	  default:
		state;
	}
  }

function ProfileScreen() {
	const deliveryArray = ['Order Processing' , 'Order Dispatched' , 'In Transit' , 'Delivered'];
	  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: true,
		orders: [],
		error: '',
	  });



	useEffect(() => {
		const fetchOrders = async () => {
			try {
			  dispatch({ type: 'FETCH_REQUEST' });
			  const { data } = await axios.get(`/api/orders/history`);
			  dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
			  dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		  };
		  fetchOrders();
	},[])

	const dta = useContext(Store);

	const logoutClickHandler = () => {
		Cookies.remove('cart');
		dta?.dispatch({ type : 'CART_RESET' });
		signOut({callbackUrl : "/login" });
	};

	/* Profile code  */
	const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('name', session?.user.name);
    setValue('email', session?.user.email);
  }, [session?.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('Profile updated successfully');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
			<Banner bannerText="My Account" />
			{/* <!-- MY-ACCOUNT-AREA START --> */}
			<div className="my-account-area  pt-80 pb-80">
				<div className="container">	
					<div className="my-account">
						<div className="row">
							<div className="col-md-6">
								<div className="panel-group" id="accordion">
									<div className="panel mb-2">
										<div className="my-account-menu" >
											<a style={{color : '#fff'}}>
											My Personal Information
											</a>
										</div>
										<div id="my-info" className="panel-collapse collapse show" data-bs-parent="#accordion">
											<div className="panel-body">
												<div className="billing-details shop-cart-table">
													<form onSubmit={handleSubmit(submitHandler)}>
														<input type="text" placeholder="Your name here..."  {...register('name', {required: 'Please enter name', })}/>
														{errors.name && (<div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.name.message}</div>)}
														<input type="text" disabled placeholder="Email address here..." {...register('email', {required: 'Please enter email',pattern: {value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i , message: 'Please enter valid email',},})} />
														{errors.email && (
          												  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.email.message}</div>
          												)}
														<input type="password" placeholder="Your new password here..." {...register('password', {required: 'Please enter new password',minLength: { value: 6, message: 'password is more than 5 chars' },})} />
														{errors.password && (
          												  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.password.message}</div>
          												)}
														<input {...register('confirmPassword', {required: 'Please confirm new password',validate: (value) => value === getValues('password'),minLength: {value: 6,message: 'confirm password is more than 5 chars',},})} type="password" placeholder="Please confirm your password..." />
														{errors.confirmPassword && (
            											<div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>
            											  {errors.confirmPassword.message}
            											</div>
          												)}
          												{errors.confirmPassword &&
            												errors.confirmPassword.type === 'validate' && (
            											  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>Password do not match</div>
            											)}
														<button   className="button-one submit-button mt-15" data-text="Update Profile" type="submit">Update Profile</button>
													</form>
														<button onClick={logoutClickHandler}  className="button-one submit-button mt-15 " data-text="Log out" type="submit">Log out</button>
												</div>
											</div>
										</div>
									</div>				
								</div>
							</div>
							<div className="col-md-6">
								<div className="panel-group" id="accordion-2">
									<div className="panel mb-2">
										<div className="my-account-menu" >
											<a   style={{color : '#fff'}}>
											Order History
											</a>
										</div>
										<div id="my-payment-method" className="panel-collapse collapse show" data-bs-parent="#accordion-2">
											<div className="panel-body">
												<div className="payment-method  shop-cart-table">
													{loading ? (<div>Loading...</div>): error ? (
														<div style={{color:'red'}}>{error}</div>
													) : orders.length===0 ? (<div>No order yet!!</div>) : (
														<div className="payment-accordion">
															{orders.map((order) => (
																<>
																	<h3 className="payment-accordion-toggle active">Order Id : {order._id}</h3>
																	<div className="payment-content">
																		<table className="table table-condensed">
    																		<thead>
    																			<tr>	
    																				<th>
    																					Date:
    																				</th>
    																				
    																				<th style={{fontWeight : 'lighter'}}>
																						{dateConvert(order.createdAt)}
    																				</th>
    																			</tr>
    																			<tr>	
    																				<th>
    																					Total Price  :
    																				</th>
    																				
    																				<th style={{fontWeight : 'lighter'}}>
																						${order.totalPrice}
    																				</th>
    																			</tr>
    																			<tr>	
    																				<th>
																						{order.isPaid ? 'Delivery Status :' : 'Payment Status :'}
    																				</th>
    																				
    																				<th style={{fontWeight : 'lighter'}}>
																						{
																							order.isPaid ? (<>{deliveryArray[order.deliveryStatus-1]}</>) : (<span style={{color:'red'}}>Not paid</span>)
																						}
    																				</th>
    																			</tr>
    																		</thead>
																		<Link href={`/order/${order._id}`} ><a className="button-one  text-uppercase " data-text={order.isPaid ?'Details' : 'Pay Now'}>{order.isPaid ?'Details' : 'Pay Now'}</a></Link>
    																	</table>
																	</div>
																</>
															))} 	
														</div>
													)}															
												</div>
											</div>
										</div>
									</div>
									<div className="panel">
										<div className="my-account-menu my-account-menu-2" >
											<Link   href="/wishlist" ><a>
											My Wishlist
											</a></Link>
										</div>
									</div>
								</div>								
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- MY-ACCOUNT-CART-AREA END --></div> */}
    </Layout>
  )
}


ProfileScreen.auth = true;
export default ProfileScreen;