import React from 'react'
import Layout from '../components/Layout'
import Banner from '../components/Banner'

export default function about() {
  return (
    <Layout title="About us" desc="On the first sight you think we are a furniture selling unit but we are more than that . Our vision is to make everyone aware for our nature . As we are making furniture by cutting down the trees . So we also want to grow or plant more and more trees. We provide furniture as well as gift hampers to take care of our nature">
           <Banner bannerText="About us" />
			{/* <!-- ABOUT-US-AREA START --> */}
			<div className="about-us-area  pt-80 pb-80">
				<div className="container">	
					<div className="about-us ">
						<div className="row">
							<div className="col-lg-6">
								<div className="about-photo">
									<img src="/img/aboutus1.png" alt="" />
								</div>
							</div>
							<div className="col-lg-6">
								<div className="about-brief bg-dark-white">
									<h4 className="title-1 title-border text-uppercase mb-30">about dcraftive</h4>
									<p>Welcome to Dcraftive, a leading name in the furniture industry, where craftsmanship and innovation come together to create exquisite pieces for your living spaces. We specialize in designing and crafting furniture made of iron, wood, leather, bone inlay, marble, and canning. With a strong emphasis on quality, customization, and timely delivery, we have become a trusted brand worldwide.</p>
									<p>At Dcraftive, we understand that furniture is not just a functional element but an expression of your unique style and personality. That's why we offer a wide range of customizable options to ensure that every piece we create reflects your individual taste and meets your specific requirements. From timeless classics to contemporary designs, our skilled artisans and designers meticulously craft furniture that will enhance the beauty and comfort of your spaces.</p>
								</div>
							</div>
						</div>
						<div className="row">
							<div style={{zIndex : '10'}} className="col-lg-6">
								<div  className="about-brief-right bg-dark-white">
									<p>What sets Dcraftive apart is our commitment to excellence and attention to detail. With years of experience in the industry, we have earned a reputation for delivering exceptional quality furniture that stands the test of time. Our dedicated team of craftsmen takes pride in their work, ensuring that each piece is crafted with precision and care.</p>
									<p>Not only do we cater to individual customers, but we also specialize in B2B furniture projects both within and outside India. Whether it's furnishing a hotel, restaurant, office, or any other commercial space, our expertise and capabilities allow us to handle large-scale projects with efficiency and professionalism.</p>
									<p>At Dcraftive, we believe in building lasting relationships with our customers. We value your trust and strive to provide a seamless and enjoyable experience throughout your journey with us. Our friendly and hardworking team is always ready to assist you, answering your queries and offering expert guidance to help you make the right choices for your spaces.</p>
									<p>For international projects, we have a dedicated design team that understands the nuances of different cultures and design preferences. They work closely with clients to create furniture pieces that blend seamlessly with their unique aesthetics and requirements.</p>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="about-photo">
									<img src="/img/aboutus2.png" alt="" />
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
    </Layout>
  )
}