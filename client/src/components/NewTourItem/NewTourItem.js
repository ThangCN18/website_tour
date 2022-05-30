import { useState, useEffect } from "react";
import ItemTourSea from "../ItemTourSea/ItemTourSea";
import axios from "axios";
import { Link } from "react-router-dom";


function NewTourItem() {

    
    const [tournew, settournew] = useState(null);



  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/tour/new"
    }).then(result=>{
      const a = result.data.tours
      settournew(a[0])

    })
  }, []);
    return (
        tournew?
        <div className="row container-fluid mx-auto my-5" style={{background: "#eee"}}>
            <div className="col-xl-5 col-md-12">
                <div className="" style={{width: "80%", height: "300px", background: "#c9c9c9", marginLeft:"20%", marginTop: "10%", marginBottom: "5%"}}>
                <img style={{width: "100%", height: "100%", marginLeft: "-7%", marginTop: "-7%"}} src={tournew.url_image}/>
                </div>
            </div>
            <div className="card col-xl-7 col-md-12 pl-5 my-auto" style={{background: "none", border: "none" }}>
                <div className="card-body">
                <h3 className="card-title" style={{color: "#038024",whiteSpace: "nowrap", overflow: "hidden", width:"80%", textOverflow: "ellipsis"}}>{tournew.name_tour}</h3>
                <p className="card-text" style={{flexWrap: "nowrap", overflow: "hidden", width:"80%", height: "100px", textOverflow: "ellipsis"}}>{tournew.description}</p>
                <h6 style={{color: "#038024"}}>{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(tournew.price)}</h6 >
                <Link to={"/tour/"+tournew._id} ><button type="button" className="btn-slide my-3">Read More</button></Link>
                </div>
            </div>
        </div>:
        <div className="row container-fluid mx-auto my-5" style={{background: "#eee"}}>
            <div className="col-xl-5 col-md-12">
                <div className="" style={{width: "80%", height: "300px", background: "#c9c9c9", marginLeft:"20%", marginTop: "10%", marginBottom: "5%"}}>
                </div>
            </div>
            <div className="card col-xl-7 col-md-12 pl-5 my-auto" style={{background: "none", border: "none" }}>
                <div className="card-body">
                <h3 className="card-title " style={{color: "#038024",whiteSpace: "nowrap", overflow: "hidden", width:"80%", textOverflow: "ellipsis"}}>Tour ...</h3>
                <p className="card-text" style={{flexWrap: "nowrap", overflow: "hidden", width:"80%", height: "120px", textOverflow: "ellipsis"}}>...</p>
                <button type="button" className="btn-slide my-1">Read More</button>
                
                </div>
            </div>
        </div>
    );
}

export default NewTourItem;