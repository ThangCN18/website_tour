import { useEffect, useState } from "react"
import axios from "axios";
import AdminItemReview from "../AdminItemReview/AdminItemReview";
import {useDispatch, useSelector } from "react-redux";
import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"

function AdminReview() {
    const [dataReview, setDataReview] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.data) 
    
    useEffect(() => {
      setLoading(false)
      const token = {token: "baner " + user.token}
  
      axios({
        method: 'get',
        headers: token,
        url: "http://localhost:8000/review/",
      }).then(result => {

        const a = result.data.reviews
        setDataReview(a)
        setLoading(true)

  
  
      }).catch(error => {
        console.log(error)
      })
  
    }, [])
    return (
      <div className="ml-4" style={{marginTop: "40px"}}>
        {
          loading ?
            <div className="mt-5">
             
  
              <table className="table table-bordered">
                <thead>
                  <tr style={{ background: "green", color: "white" }}>
                    <th className="text-center" style={{ width: "130px" }} scope="col">_id</th>
                    <th className="text-center" style={{ width: "150px" }} scope="col">Email</th>
                    <th className="text-center" style={{ width: "150px" }} scope="col">Full Name</th>
                    <th className="text-center" style={{ width: "150px" }} scope="col">Name Tour</th>
                    <th className="text-center" style={{ width: "30px" }} scope="col">Number Star</th>
                    <th className="text-center" style={{ width: "210px" }} scope="col">Content</th>
                    <th className="text-center" style={{ width: "70px" }} scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataReview.map((review) => <AdminItemReview setDataReview={setDataReview} key={review._id} review={review}/>)}
  
  
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

export default AdminReview;