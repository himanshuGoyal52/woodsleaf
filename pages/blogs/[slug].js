import React from 'react'
import Layout from '../../components/Layout'
import Banner from '../../components/Banner'
import db from '../../utils/db';
import Blog from '../../models/Blogs';
import Image from 'next/image';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton , PinterestShareButton } from 'react-share';

export default function SingleBlogScreen({blog}) {
  return (
    <Layout title={blog.title} desc={blog.content[0].content}>
        <Banner bannerText={blog.title}/> 
        {/* <!-- BLGO-AREA START --> */}
			<div className="blog-area blog-2 blog-details-area  pt-80 pb-80">
				<div className="container">	
					<div className="blog">
						<div className="row">
							{/* <!-- Single-blog start --> */}
							<div className="col-lg-12">
								<div className="single-blog mb-30">
									<div className="blog-photo">
										<a ><Image width={1090} height={450} src={blog.image} alt={blog.title} /></a>
										<div className="like-share fix">
											<a ><i className="zmdi zmdi-account"></i><span>{blog.author}</span></a>
											<a className="d-none d-md-block" ><i className="zmdi zmdi-share"></i><span>{blog.shareCount} Share</span></a>
										</div>
										<div className="post-date post-date-2">
											<span className="text-dark-red">{blog.createdAt.slice(8,10)}</span>
											<span className="text-dark-red text-uppercase">{blog.createdAt.slice(10,16)}</span>
										</div>
									</div>
									<div className="blog-info blog-details-info">
										<h4 style={{color : '#6d8c75'}} className="post-title post-title-2">{blog.title}</h4>
										{
											blog.content.map((item) => (
												<>
													<h6 style={{color:'#343434'}}>{item.heading}</h6>
													<p>{item.content}</p>
												</>
											))
										}
										<div className="post-share-tag clearfix mt-40 " >
											<div className="post-share floatleft" style={{color : '#efebd9'}}>
												<span className="text-uppercase"><strong>Share</strong></span>
												<a><WhatsappShareButton title={blog?.title} separator='||' url={`https://www.dcraftive.com/blogs/${blog?.slug}`}><i className="zmdi zmdi-whatsapp"></i></WhatsappShareButton></a>
												<a> <FacebookShareButton quote={blog?.title} hashtag='#dcraftive' url={`https://www.dcraftive.com/blogs/${blog?.slug}`}><i className="zmdi zmdi-facebook"></i></FacebookShareButton></a>
												<a><TwitterShareButton title={blog?.title} url={`https://www.dcraftive.com/blogs/${blog?.slug}`} ><i className="zmdi zmdi-twitter"></i></TwitterShareButton> </a>
												<a><LinkedinShareButton title={blog?.title} url={`https://www.dcraftive.com/blogs/${blog?.slug}`}><i className="zmdi zmdi-linkedin"></i></LinkedinShareButton></a>
												
												<a> <PinterestShareButton media={blog?.image} url={`https://www.dcraftive.com/blogs/${blog?.slug}`} description={blog.content[0].content} title={blog?.title}><i className="zmdi zmdi-pinterest"></i></PinterestShareButton></a>
											</div>
											<div className="post-share post-tag floatright" >
												<span className="text-uppercase"><strong style={{color : '#efebd9'}}>tags</strong></span>
												{blog.tags.map((item , i) => <a style={{color : '#343434'}} key={i} >{item}</a>)}
												
											</div>
										</div>										
									</div>
								</div>
							</div>
							{/* <!-- Single-blog end --> */}
						</div>
					</div>
				</div>
			</div>
			{/* <!-- BLGO-AREA END --> */}
    </Layout>
  )
}


export async function getServerSideProps(context){
	const { params } = context;
	const {slug} = params;
	await db.connect();
	const blog = await Blog.findOne({slug}).lean();
	await db.disconnect();
	return {
		props : {
			blog : blog ? db.convertDocToObj(blog) : null
		},
	};

}