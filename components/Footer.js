import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import Link from 'next/link';

export default function Footer({title , your_products}) {

	const {
		handleSubmit,
		register,
		setValue,
		formState : {errors},
	} = useForm();

	const submitHandler = async ({email}) => {
        try {
			await axios.post('/api/auth/emails' , { email });
			toast.success("You subscribed to our newsletter successfully");
			setValue('email' , '');
		} catch (err) {
			toast.error(getError(err));
		}
    };

	const {
		register: register2,
		formState: { errors: errors2 },
		handleSubmit: handleSubmit2,
		setValue : setValue2
	  } = useForm();

	  const submitHandler2 = async ({email}) => {
        try {
			await axios.post('/api/auth/emails' , { email });
			toast.success("You subscribed to our newsletter successfully");
			setValue2('email' , '');
		} catch (err) {
			toast.error(getError(err));
		}
    };

  return (
    <>
        {/* <!-- FOOTER START --> */}
			<footer>
				{/* <!-- Footer-area start --> */}
			{/* <!-- SUBSCRIVE-AREA START --> */}
            {title === "Home" ? 
                <div className="subscribe-area pt-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="subscribe">
								<form onSubmit={handleSubmit(submitHandler)}>
									<input type="text" placeholder="Enter your email address" {...register('email' , {required:"Please enter email" , pattern : {value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i , message : "Please enter valid email"} })} />
									<button className="submit-button submit-btn-2 button-one" data-text="subscribe" type="submit" >subscribe</button>
									{errors.email && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors.email.message}</div>)}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
            : ""}
			{/* <!-- SUBSCRIVE-AREA END --> */}

				<div className={`footer-area ${title === "Home" ? "" : "footer-2"}`}>
					<div className="container">
						<div className="row">
							<div className="col-lg-4 col-md-6">
								<div className="single-footer">
									<h3 className="footer-title  title-border">Contact Us</h3>
									<ul className="footer-contact">
										<li><span>Address :</span>H-182, 3rd Phase, RIICO<br/>Industrial Area, Jodhpur, Rajasthan (IN)</li>
										<li><span>Cell-Phone :</span>+91-83062 32343 &nbsp; +91-87642 32343 <br/> +91-74129 72658</li>
										<li><span>Email :</span>info@dcraftive.com <br/> team@dcraftive.com</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6">
								<div className="single-footer">
									<h3 className="footer-title  title-border">THE COMPANY</h3>
									<ul className="footer-menu">
										<li><Link  href="/aboutus"><a><i className="zmdi zmdi-dot-circle"></i>About Us</a></Link></li>
										<li><Link href="/faq"><a ><i className="zmdi zmdi-dot-circle"></i>FAQs</a></Link></li>
										<li><Link href="/contact"><a ><i className="zmdi zmdi-dot-circle"></i>Contact Us</a></Link></li>
										<li><Link href="/privacy"><a ><i className="zmdi zmdi-dot-circle"></i>Privacy & Policy</a></Link></li>
										<li><Link href="/terms"><a ><i className="zmdi zmdi-dot-circle"></i>Term & Conditions</a></Link></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6">
								<div className="single-footer">
									<h3 className="footer-title  title-border">USEFUL LINKS</h3>
									<ul className="footer-menu">
										<li><Link href="/shop"><a><i className="zmdi zmdi-dot-circle"></i>New Products</a></Link></li>
										<li><Link href="/shop/chair"><a><i className="zmdi zmdi-dot-circle"></i>Chairs</a></Link></li>
										<li><Link href="/shop/cabinet"><a><i className="zmdi zmdi-dot-circle"></i>Cabinets</a></Link></li>
										<li><Link href="/shop/bed"><a><i className="zmdi zmdi-dot-circle"></i>Beds</a></Link></li>
										<li><Link href="/blogs"><a><i className="zmdi zmdi-dot-circle"></i>Blogs</a></Link></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
                                {title==="Home" ? 
                                        <div className="single-footer">
                                        <h3 className="footer-title  title-border">your choice Products</h3>
                                        <div className="footer-product">
                                            <div className="row">
                                                <div className="col-sm-6 col-12">
                                                    <div className="footer-thumb">
                                                        <Link href={`/product/${your_products[0].slug}`}><a><img src={your_products[0].image} alt="" /></a></Link>
                                                        <div className="footer-thumb-info">
                                                            <p><Link href={your_products[0].slug}><a>{your_products[0].name}</a></Link></p>
                                                            <h4 className="price-3">₹ {your_products[0].price}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-12">
                                                    <div className="footer-thumb">
                                                        <Link href={`/product/${your_products[1].slug}`}><a><img src={your_products[1].image} alt="" /></a></Link>
                                                        <div className="footer-thumb-info">
                                                            <p><Link href={your_products[1].slug}><a>{your_products[1].name}</a></Link></p>
                                                            <h4 className="price-3">₹ {your_products[1].price}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                <div className="single-footer newsletter-item">
                                    <h3 className="footer-title  title-border">Email Newsletter</h3>
                                    <div className="footer-subscribe">
                                        <form onSubmit={handleSubmit2(submitHandler2)}>
                                            <input type="text" name="email" placeholder="Email Address..." {...register2('email' , {required:"Please enter email" , pattern : {value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i , message : "Please enter valid email"} })} />
											{errors2.email && (<div style={{color:'red' , marginBottom:'15px' , fontSize:'11px'}}> {errors2.email.message}</div>)}
                                            <button className="button-one submit-btn-4" type="submit" data-text="Subscribe">Subscribe</button>
                                        </form>
                                    </div>
                                </div>
                                }
								
							</div>
						</div>
					</div>
				</div>
				{/* <!-- Footer-area end --> */}
				{/* <!-- Copyright-area start --> */}
				<div className={`copyright-area ${title === "Home" ? "" : "copyright-2"}`}>
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<div className="copyright">
									<p className="mb-0">&copy; dcraftive.com 2025. All Rights Reserved.</p>
								</div>
							</div>
							<div className="col-md-6">
								<div className="payment  text-md-end">
									<a><img src="/img/payment/1.png" alt="" /></a>
									<a><img src="/img/payment/2.png" alt="" /></a>
									<a><img src="/img/payment/3.png" alt="" /></a>
									<a><img src="/img/payment/5.png" alt="" /></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- Copyright-area start --> */}
			</footer>
			{/* <!-- FOOTER END --> */}
    </>
  )
}
