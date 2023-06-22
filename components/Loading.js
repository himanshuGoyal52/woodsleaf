import React from 'react'

export default function Loading() {
  return (
    <div className="sidebar-search">
				<div className="table">
					<div className="table-cell">
                    <div className="LoadingGif">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 offset-md-2 p-50" style={{display:'flex' , alignItems : 'center' , justifyContent : 'center'}}>
                                    <img src="/img/loader.gif" alt="Loading..." style={{ height:'25%'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
					</div>
				</div>
			</div>
  )
}
