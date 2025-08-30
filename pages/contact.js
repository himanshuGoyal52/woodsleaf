import React from 'react'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Contact() {

	const {
		handleSubmit,
		register,
		setValue,
		formState : {errors},
	} = useForm();

	const submitHandler = async ({ name , email , message}) => {
        try {
			
			const {data} = await axios.post('/api/contact' , {
				name , email , message
			});

			toast.success(`Thanks for contacting us ${data?.name}, we will reach out to you!!`);

			setValue('name' , '');
			setValue('email' , '');
			setValue('message' , '');
			
		} catch (err) {
			toast.error(getError(err));
		}
    };

	const defaultProps = {
		center: {
		  lat: 26.212150,
		  lng: 72.951610
		},
		zoom: 15
	  };

  return (
    <Layout title="Contact Us" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
			<Banner bannerText="Contact Us" />
			{/* <!-- contact-us-AREA START --> */}
			<div className="contact-us-area  pt-80 pb-80">
				<div className="container">	
					<div className="contact-us customer-login ">
						<div className="row">
							<div className="col-lg-4 col-md-5">
								<div className="contact-details">
									<h4 className="title-1 title-border text-uppercase mb-30">contact details</h4>
									<ul>
										<li>
											<i className="zmdi zmdi-pin"></i>
											<span>H-182, 3rd Phase, RIICO Industrial Area</span>
											<span>Jodhpur, Rajasthan (IN)</span>
										</li>
										<li>
											<i className="zmdi zmdi-phone"></i>
											<span>+91-83062 32343</span>
											<span>+91-87642 32343</span>
										</li>
										<li>
											<i className="zmdi zmdi-email"></i>
											<span>team@dcraftive.com</span>
											<span>info@dcraftive.com</span>
										</li>
									</ul>
								</div>
								<div className="send-message mt-60">
									<form onSubmit={handleSubmit(submitHandler)}>
										<h4 className="title-1 title-border text-uppercase mb-30">send message</h4>
										<input {...register('name' , {required : 'Please enter your name'})} type="text"  placeholder="Your name here..." />
										{errors.name && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors.name.message}</div>)}
										<input {...register('email' , {required:"Please enter email" , pattern : {value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i , message : "Please enter valid email"} })}  type="text"  placeholder="Your email here..." />
										{errors.email && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors.email.message}</div>)}
										<textarea  {...register('message' , {required : 'Please enter your message'})} className="custom-textarea"  placeholder="Your message here..."></textarea>
										{errors.message && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors.message.message}</div>)}
										<button className="button-one submit-button mt-20" data-text="submit message" type="submit">submit message</button>
									</form>
								</div>
							</div>
							<div className="col-lg-8 col-md-7 mt-xs-30">
								<div style={{width: '100%' ,height: '600px'}}>
								<GoogleMapReact
									bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}}
									defaultCenter={defaultProps.center}
									defaultZoom={defaultProps.zoom}
								>
								 <AnyReactComponent
									lat={59.955413}
									lng={30.337844}
									text="Dcraftive"
								/>
								</GoogleMapReact>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- CONTACT-US-AREA END --> */}
    </Layout>
  )
}
