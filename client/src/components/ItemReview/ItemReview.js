

function ItemReview(props) {
  const review = props.review

let rowstar = []

for(var i = 1; i<=5; i++){
  if(review.number_star>= i){
    rowstar.push(<i className="fa fa-star text-warning" key={i} aria-hidden="true" />)
  }else{
    rowstar.push(<i className="fa fa-star" key={i} aria-hidden="true" />)
  }
}
    return ( 
        <div className="review p-2 px-5">
                <div className="row d-flex">
                  <div className="profile-pic">{
                    review.url_image?
                    <img src={review.url_image} width="60px" height="60px" style={{borderRadius: "30px"}}/>:
                    <img src="https://www.stmichaelsfelton.co.uk/wp-content/uploads/Head-and-shoulder.png" width="60px" height="60px" style={{borderRadius: "30px"}}/>
                  }</div>
                  <div className="d-flex flex-column pl-3">
                    <h4>{review.fullname}</h4>
                    <div className="row pb-3 mx-2">
                   
                    {rowstar}

                  <div className="green-text">
                    <h5 className="mb-0 pl-3"></h5>
                  </div>
                </div>
                
                  </div>
                </div>
                
                <div className="row pb-3 px-5">
                  <p className="ml-4"> {review.content}</p>
                </div>
               
              </div>
     );
}

export default ItemReview;