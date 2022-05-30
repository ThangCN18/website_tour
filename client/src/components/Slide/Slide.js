import {Link} from "react-router-dom"
import "./slide.css"

import { useState, useEffect } from "react"
import axios from "axios"


function Slide() {

  const [tourNuiData, settourNuiData] = useState(null);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/tour/nui"
    }).then(result=>{
      const a = result.data.tours
      settourNuiData(a)
    })
  }, []);
    return (  
     
        tourNuiData?
        <div id="carouselExampleIndicators" className="carousel slide mx-auto slide-root" data-ride="carousel" style={{width:"100%", overflow:"hidden"}}>
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner ">
          <div className="carousel-item active">
            <img className="d-block " style={{width: "1900px", height: "100vh"}} src={tourNuiData[0].url_image} alt="First slide" />
            <div className="carousel-caption d-none d-md-block text-left" style={{marginLeft: "50%", marginBottom: "15%"}}>
            <h2 className="text-success" style={{fontSize: "30px"}}>{tourNuiData[0].name_tour}</h2>
            <p style={{color: "black"}} className="text-justify" >{tourNuiData[0].description}</p>
            <Link to={"/tour/"+tourNuiData[0]._id}><button type="button" className="btn-slide">Get Started</button></Link>
        </div>
            </div>
          <div className="carousel-item">
            <img className="d-block " style={{width: "1900px", height: "100vh"}} src={tourNuiData[1].url_image} alt="Second slide" />
            <div className="carousel-caption d-none d-md-block text-left" style={{marginLeft: "10%", marginBottom: "15%"}}>
            <h2 className="text-success" style={{fontSize: "30px"}}>{tourNuiData[1].name_tour}</h2>
            <p style={{color: "black", width: "400px"}} className="text-justify" >{tourNuiData[1].description}</p>
            <Link to={"/tour/"+tourNuiData[1]._id}><button type="button" className="btn-slide">Get Started</button></Link>
        </div>
            </div>
          <div className="carousel-item">
            <img className="d-block " style={{width: "1900px", height: "100vh"}} src={tourNuiData[2].url_image} alt="Third slide" />
            <div className="carousel-caption d-none d-md-block text-left" style={{marginLeft: "45%", marginBottom: "15%"}}>
            <h2 className="text-success" style={{fontSize: "30px"}}>{tourNuiData[2].name_tour}</h2>
            <p style={{color: "black"}} className="text-justify" >{tourNuiData[2].description}</p>
            <Link to={"/tour/"+tourNuiData[2]._id}><button type="button" className="btn-slide">Get Started</button></Link>
        </div>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next " href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon " aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
        :
        <div className="row mx-auto text-center container-fluid px-5" style={{height: "100px", lineHeight: "100px"}} >
        <div className="spinner-border" style={{marginLeft: "50%"}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
        </div>
        

        
    );
}

export default Slide;


