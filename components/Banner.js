import Link from 'next/link'
import React from 'react'

export default function Banner({bannerText}) {
  return (
    <div  className="heading-banner-area overlay-bg">
				<div  className="container">
					<div  className="row">
						<div  className="col-md-12">
							<div  className="heading-banner">
								<div  className="heading-banner-title">
									<h2>{bannerText}</h2>
								</div>
								<div  className="breadcumbs pb-15">
									<ul>
										<li><Link href='/'><a>Home</a></Link></li>
										<li>{bannerText}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
	</div>
  )
}
