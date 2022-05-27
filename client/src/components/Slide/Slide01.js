import { useState, } from "react";

function Slide01(props) {  
    const tour = props.tour  
    console.log(tour)
    return ( 
        tour != null?
        <div className="carousel-item active">
        <img className="d-block " style={{ width: "1900px", height: "100vh" }} src={tour.url_image} alt="First slide" />
        <div className="carousel-caption d-none d-md-block text-left" style={{ marginLeft: "50%", marginBottom: "15%" }}>
          <h2 className="text-success" style={{ fontSize: "45px" }}>{tour.name_tour}</h2>
          <p style={{ color: "black" }} >{tour.description}</p>
          <button type="button" className="btn-slide">Get Started</button>
        </div>
        </div>:
        null
     );
}

export default Slide01;