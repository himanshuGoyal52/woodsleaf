import React, { useState } from 'react';
import Layout from '../components/Layout';
import {useForm} from 'react-hook-form';
import {signIn, useSession} from 'next-auth/react'
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import CheckoutWizard from '../components/CheckoutWizard';
import Banner from '../components/Banner';
import axios from 'axios';

export default function LoginScreen() {

	const {data : session} = useSession();
 	const router = useRouter();
	const {redirect} = router.query;
	const [news , setNews] = useState(true);
	const {
		handleSubmit,
		register,
		formState : {errors},
	} = useForm();

	useEffect(()=>{
		if(session?.user){
			router.push(redirect || '/');
		}
	},[router, session, redirect, news]);

	
	const [Loading , setLoading ] = useState(false);
	const [Loading2 , setLoading2] = useState(false);

    const submitHandler = async ({email , password}) => {
        try {
			setLoading2(true);
			const result = await signIn('credentials' , {
				redirect : false,
				email,
				password,
			});
			setLoading2(false);
			if(result.error){
				toast.error(result.error);
			}
		} catch (err) {
			setLoading2(false);
			toast.error(getError(err));
		}
    };

	const {
		register: register2,
		formState: { errors: errors2 },
		handleSubmit: handleSubmit2,
		getValues : getValues2,
		setValue : setValue2
	  } = useForm({
		mode: "onBlur",
	  });


    const rsubmitHandler = async ({ name , email , password }) => {

        try {
			setLoading(true);
			await axios.post('/api/auth/signup' , {
				name , email , password , news : news 
			});
			setLoading(false);

			toast.success("An email sent to your email, please verify");

			setValue2('name' , '');
			setValue2('email' , '');
			setValue2('password' , '');
			setValue2('confirmPassword' , '');
			setNews(!news);

		} catch (err) {
			setLoading(false);
			toast.error(getError(err));
		}
    };

  return (
    <Layout title="Login || Register" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
            <Banner bannerText="Registration" />
			<div className="shopping-cart-area pt-80 pb-80">
				<div className="container">	
					<div className="row">
						<div className="col-lg-12">
							<div className="shopping-cart">
								{redirect ? (<CheckoutWizard activeStep={1} />) : ``}
								
								<div className="login-area">
									<div className="container">

											<div className="row">
                					            <form className='formform' onSubmit={handleSubmit(submitHandler)}>
												    <div className='formdiv'>
												    	<div className="customer-login text-left">
												    		<h4 className="title-1 title-border text-uppercase mb-30">Registered customers</h4>
												    		<p className="text-gray">If you have an account with us, Please login!</p>
												    		<input 
                					                            {...register('email' , {required:"Please enter email" , pattern : {value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i , message : "Please enter valid email"} })} 
                					                            type="text" placeholder="Email here..." name="email" />
                					                        {errors.email && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors.email.message}</div>)}
												    		<input
                					                             {...register('password' , {required:"Please enter password" , minLength : {value:6 , message : 'password is more than 5 character'}, })} 
                					                        type="password" placeholder="Password" />
                					                        {errors.password && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors.password.message}</div>)}
												    		
												    		<button type="submit" data-text={ Loading2 ? "Loading.." : 'Login'}  className="button-one submit-button mt-15">{ Loading2 ? "Loading.." : 'Login'} </button>
												    	</div>					
												    </div>
                					            </form>

                					            <form onSubmit={handleSubmit2(rsubmitHandler)} className='formform'>
												    <div className='formdiv'>
												    	<div className="customer-login text-left">
												    		<h4 className="title-1 title-border text-uppercase mb-30">new customers</h4>
												    		<p className="text-gray">If you don't have an account with us, Please Register!</p>
												    		<input {...register2('name' , {required : 'Please enter your name'})}
																type="text" placeholder="Your name here..." name="name" />
															{errors2.name && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors2.name.message}</div>)}

												    		<input {...register2('email' , {required:"Please enter email" , pattern : {value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i , message : "Please enter valid email"} })}
																type="text" placeholder="Email address here..." name="email" />
															{errors2.email && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors2.email.message}</div>)}

												    		<input   {...register2('password' , {required:"Please enter password" , minLength : {value:6 , message : 'Password should be more than 5 character'}, })}
																type="password" placeholder="Password" />
															{errors2.password && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors2.password.message}</div>)}

												    		<input {...register2('confirmPassword' , {required : 'Please enter confirm password' , 
																validate : (value) => {return value === getValues2('password')},
																minLength : {
																	value : 6,
																	message : 'Confirm password is more than 5 chars'
																},
															})}
																type="password" placeholder="Confirm password" />
															{errors2.confirmPassword && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors2.confirmPassword.message}</div>)}
															{errors2.confirmPassword && errors2.confirmPassword.type === 'validate' && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}>Password do not match</div>)}

												    		<p className="mb-0">
												    			<input  type="checkbox" id="newsletter" name="newsletter" checked={news}  onClick={() => setNews(!news)}/>
												    			<label htmlFor="newsletter"><span>Sign up for our newsletter!</span></label>
												    		</p>

												    		<button type="submit" data-text={ Loading ? "Loading.." : 'regiter'} className="button-one submit-button mt-15">{ Loading ? "Loading.." : 'regiter'}</button>
												    	</div>					
												    </div>
                					            </form>
											</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- LOGIN-AREA START --> */}
			
			{/* <!-- LOGIN-AREA END --> */}
    </Layout>
  )
}
