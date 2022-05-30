
import { useState, useEffect } from "react";
import ItemTourSea from "../ItemTourSea/ItemTourSea";
import axios from "axios";
import ItemTour from "../ItemTour/ItemTour";


function ListForeignTour() {
    const [tourforeign, settourforeign] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/tour/foreign"
    }).then(result=>{
      const a = result.data.tours
      settourforeign(a)
    })
  }, []);
    return ( 
        tourforeign? 
        <div className="row mx-auto text-center container-fluid px-5" >
        {tourforeign.map(tour =><ItemTour key={tour._id} tour={tour}/>)}

        </div>:
        <div className="row mx-auto text-center container-fluid px-5" style={{height: "100px", lineHeight: "100px"}} >
        <div className="spinner-border" style={{marginLeft: "50%"}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
        </div>
     );
}

export default ListForeignTour;