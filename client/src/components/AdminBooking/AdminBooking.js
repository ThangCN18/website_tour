import { useSelector } from "react-redux";
import { useEffect, useState } from "react"
import axios from "axios";
import AdminItemBooking from "../AdminItemBooking/AdminItemBooking";

function AdminBooking() {
    const [dataBooking, setDataBooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.data) 
    
    useEffect(() => {
      setLoading(false)
      const token = {token: "baner " + user.token}
  
      axios({
        method: 'get',
        headers: token,
        url: "http://localhost:8000/booktour/",
      }).then(result => {

        const a = result.data.bookTours
        setDataBooking(a)
        setLoading(true)
  
      }).catch(error => {
        console.log(error)
      })
  
    }, [])
    return (
      <div className="ml-4">
        {
          loading ?
            <div className="mt-5">
              
  
              <table className="table table-bordered">
                <thead>
                  <tr style={{ background: "green", color: "white" }}>
                    <th className="text-center" style={{ width: "80px" }} scope="col">_id</th>
                    <th className="text-center" style={{ width: "150px" }} scope="col">Name Tour</th>
                    <th className="text-center" style={{ width: "130px" }} scope="col">Departure Day</th>
                    <th className="text-center" style={{ width: "100px" }} scope="col">Price</th>
                    <th className="text-center" style={{ width: "20px" }} scope="col">Quantity</th>
                    <th className="text-center" style={{ width: "20px" }} scope="col">Discount</th>
                    <th className="text-center" style={{ width: "150px" }} scope="col">Email</th>
                    <th className="text-center" style={{ width: "80px" }} scope="col">Status</th>
                    <th className="text-center" style={{ width: "150px" }} scope="col">Reason</th>
                    <th className="text-center" style={{ width: "210px" }} scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                {dataBooking.map((booking) => <AdminItemBooking key={booking._id} booking={booking} setDataBooking={setDataBooking}/>)}
                </tbody>
              </table>
            </div> :
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
        }
  
      </div>
    )
}

export default AdminBooking;