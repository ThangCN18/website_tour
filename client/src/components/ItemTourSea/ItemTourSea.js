import { Link } from "react-router-dom";


function ItemTourSea(props) {
  const tour = props.tour
    return ( 
        tour?
        <div className="card col-lg-3 col-md-6 col-12 mt-2" style={{width: '18rem',border: "none"}}>
        <img className="card-img-top mx-auto" style={{height: "200px", width:"200px", borderRadius:"50%"}} src={tour.url_image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title" style={{color: "#038024",whiteSpace: "nowrap", overflow: "hidden", width:"100%", textOverflow: "ellipsis"}}>{tour.name_tour}</h5>
          <p className="card-text text-center mx-auto" style={{flexWrap: "nowrap", overflow: "hidden", width:"80%", height: "120px", textOverflow: "ellipsis"}}>{tour.description}</p>
          <Link to={"/tour/"+tour._id}><button type="button" className="btn-slide my-3">Read More</button></Link>
        </div>
      </div>:
      null
     );
}

export default ItemTourSea;