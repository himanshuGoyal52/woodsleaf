import React from "react";


export default function Trackorder({deliveryStatus , isPaid}) {
  const msg = ['Your order has been placed successfully','Your order has been dispatched','Your order is on its way','Your order has been delivered'];
  // 1 : order placed // 2 : order dispacted // 3 : in transit // 4 : delivered
  return (
    <div className="mb-30">
            <div className="col">
              <div
                className="card-stepper card"
                style={{border : 'none' , borderRadius : '0px' , backgroundColor : '#e4e0d3'}}
              >
                <div className="p-4 card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <h4  className="title-1  mb-0" style={{color : '#6d8c75'}}>{isPaid ? msg[deliveryStatus-1] : <span style={{color:'red'}}>Please pay your order!!</span>}</h4>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                    {isPaid ? (
                      <span className={deliveryStatus === 1 ? 'd-flex justify-content-center align-items-center big-dot dot': deliveryStatus >1 ? 'dot dot-active' : 'dot'} >{deliveryStatus === 1 ? (<i className="fa fa-check text-white"></i>):(``)}</span>
                    ) : (
                      <span className={deliveryStatus === 1 ? 'd-flex justify-content-center align-items-center dot': deliveryStatus >1 ? 'dot dot-active' : 'dot'} ></span>
                    )}
                    <hr className={deliveryStatus > 1 ?  "flex-fill track-line" : "flex-fill"} />
                    <span className={deliveryStatus === 2 ? 'd-flex justify-content-center align-items-center big-dot dot':deliveryStatus >2 ? 'dot dot-active' : 'dot'} >{deliveryStatus === 2 ? (<i className="fa fa-check text-white"></i>):(``)}</span>
                    <hr className={deliveryStatus > 2 ?  "flex-fill track-line" : "flex-fill"} />
                    <span className={deliveryStatus === 3 ? 'd-flex justify-content-center align-items-center big-dot dot':deliveryStatus >3 ? 'dot dot-active' : 'dot'} >{deliveryStatus === 3 ? (<i className="fa fa-check text-white"></i>):(``)}</span>
                    <hr className={deliveryStatus > 3 ?  "flex-fill track-line" : "flex-fill"} />
                    <span className={deliveryStatus === 4 ? 'd-flex justify-content-center align-items-center big-dot dot':deliveryStatus >4 ? 'dot dot-active' : 'dot'} >{deliveryStatus === 4 ? (<i className="fa fa-check text-white"></i>):(``)}</span>
                    
                  </div>

                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="d-flex flex-column align-items-start">
                      <span>Order placed</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      
                      <span>Order Dispatched</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      
                      <span>In Transit</span>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
    </div>
  );
}