import AdminItemTour from "../AdminItemTour/AdminItemTour";
import { useEffect, useState } from "react"
import axios from "axios";
import "./adminTours.css"
import { Link } from "react-router-dom";

function AdminTours() {
  const [datatours, setDataTours] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false)

    axios({
      method: 'get',
      url: "http://localhost:8000/tour",
    }).then(result => {
      const a = result.data.tours
      setDataTours(a)
      setLoading(true)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div style={{margin: "40px 0 0 20px "}} >
      {
        loading ?
          <div >
            <Link style={{marginLeft: "90%"}} className="" to="/admin/add-tour"><button type="button" className="btn btn-success  ">Add new tour</button></Link>

            <table className="table table-bordered mt-3">
              <thead>
                <tr style={{ background: "green", color: "white" }}>
                  <th className="text-center" style={{ width: "110px" }} scope="col">_id</th>
                  <th className="text-center" style={{ width: "120px" }} scope="col">Name tour</th>
                  <th className="text-center" style={{ width: "150px" }} scope="col">Departure place</th>
                  <th className="text-center" style={{ width: "120px" }} scope="col">Destination</th>
                  <th className="text-center" style={{ width: "120px" }} scope="col">Description</th>
                  <th className="text-center" style={{ width: "150px" }} scope="col">Price</th>
                  <th className="text-center" style={{ width: "120px" }} scope="col">Image</th>
                  <th className="text-center" style={{ width: "220px" }} scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {datatours.map((tour) => <AdminItemTour setDataTours={setDataTours} key={tour._id} tour={tour}/>)}


              </tbody>
            </table>
          </div> :
          <div class="spinner-border text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
      }

    </div>


  );
}

export default AdminTours;