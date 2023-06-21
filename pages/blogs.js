import React from 'react'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import db from '../utils/db';
import Blog from '../models/Blogs';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogsScreen({blogs}) {
	
  return (
    <Layout title="Blogs" desc={blogs[0].content[0].content}>
        <Banner bannerText="Blogs" />
        {/* <!-- BLGO-AREA START --> */}
			<div className="blog-area blog-2  pt-80 pb-80">
				<div className="container">	
					<div className="blog">
						
						<div className="row">
							{blogs.map((blog) => (
								<div key={blog.slug} className="col-lg-4 col-md-6">
									<div className="single-blog mb-30">
										<div className="blog-photo">
											<Link  href={`/blogs/${blog.slug}`}><Image width={1090} height={450} style={{cursor : 'pointer'}} src={blog.image} alt="" /></Link>
											<div className="like-share text-center fix">
												<a ><i className="zmdi zmdi-share"></i><span>{blog.shareCount} Share</span></a>
											</div>
										</div>
										<div className="blog-info"> 
											<div className="post-meta fix">
												<div className="post-date floatleft"><span className="text-dark-red">{blog.createdAt.slice(8,10)}</span></div>
												<div className="post-year floatleft">
													<p className="text-uppercase text-dark-red mb-0">{blog.createdAt.slice(4,8)}, {blog.createdAt.slice(10,16)}</p>
													<h4 className="post-title">{blog.title.slice(0,25)}...</h4>
												</div>
											</div>
											<p>{blog.content[0].content.slice(0,167)}...</p>
											<Link href={`/blogs/${blog.slug}`} className="button-2 text-dark-red">Read more...</Link>
										</div>
									</div>
								</div>
							))}
						</div>	
						
					</div>
				</div>
			</div>
			{/* <!-- BLGO-AREA END -->	 */}
    </Layout>
  )
}

export async function getServerSideProps(){
	await db.connect();
	// by using .lean we only get the product data not the meta data
	const blogs = await Blog.find().lean();
	return {
		props : {
			blogs : blogs.map(db.convertDocToObj),
		},
	};

}
