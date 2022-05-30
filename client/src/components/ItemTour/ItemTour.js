import { Link } from "react-router-dom";


function ItemTour(props) {
  const tour = props.tour
    
    return ( 
        tour?
        <div className="col-12 col-md-6 col-xl-4 mb-5 ">
        <div className="card mx-auto card-tour-item" style={{width: '95%'}}>
        <img className="card-img-top mx-auto"  style={{width: '90%', height: "220px", marginTop: "5%",borderRadius: "5px"}} src={tour.url_image} alt="Card image cap" />
        <div className="card-body">
        <h5 className="card-title" style={{color: "#038024",whiteSpace: "nowrap", overflow: "hidden", width:"100%", textOverflow: "ellipsis"}}>{tour.name_tour}</h5>
        <p className="card-text text-center mx-auto" style={{flexWrap: "nowrap", overflow: "hidden", width:"80%", height: "120px", textOverflow: "ellipsis"}}>{tour.description}</p>
        <h6 style={{color: "#038024"}}>{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(tour.price)}</h6 >

        <Link to={"/tour/"+tour._id}><button type="button" className="btn-slide-new mt-1 mb-3">Read More</button></Link>
        
        </div>
      </div>
        </div>:
        null
     );
}

export default ItemTour;