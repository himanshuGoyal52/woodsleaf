import React from 'react'

export default function Ratingstars({reviews , stars}) {
    let star=0;
    reviews?.forEach((x) => star += x.star);
    star = star / reviews?.length;
    if(stars){
      star = stars;
    }
  return (
    <>
        <a href="#"><i className={star >= 1 ? 'zmdi zmdi-star' : star >= 0.5 ? 'zmdi zmdi-star-half' : 'zmdi zmdi-star-outline'}></i></a>
	    <a href="#"><i className={star >= 2 ? 'zmdi zmdi-star' : star >= 1.5 ? 'zmdi zmdi-star-half' : 'zmdi zmdi-star-outline'}></i></a>
	    <a href="#"><i className={star >= 3 ? 'zmdi zmdi-star' : star >= 2.5 ? 'zmdi zmdi-star-half' : 'zmdi zmdi-star-outline'}></i></a>
	    <a href="#"><i className={star >= 4 ? 'zmdi zmdi-star' : star >= 3.5 ? 'zmdi zmdi-star-half' : 'zmdi zmdi-star-outline'}></i></a>
	    <a href="#"><i className={star >= 5 ? 'zmdi zmdi-star' : star >= 4.5 ? 'zmdi zmdi-star-half' : 'zmdi zmdi-star-outline'}></i></a>
    </>
  )
}
