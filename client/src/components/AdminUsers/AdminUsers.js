import { useSelector } from "react-redux";
import { useEffect, useState } from "react"
import axios from "axios";

import AdminItemUser from "../AdminItemUser/AdminItemUser";

function AdminUsers() {
    const [dataUsers, setDataUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.data) 
    
    useEffect(() => {
      setLoading(false)
      const token = {token: "baner " + user.token}
  
      axios({
        method: 'get',
        headers: token,
        url: "http://localhost:8000/user/",
      }).then(result => {

        const a = result.data.users
        setDataUser(a)
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
                    <th className="text-center" style={{ width: "130px" }} scope="col">_id</th>
                    <th className="text-center" style={{ width: "200px" }} scope="col">Email</th>
                    <th className="text-center" style={{ width: "150px" }} scope="col">Full Name</th>
                    <th className="text-center" style={{ width: "90px" }} scope="col">Id Card</th>
                    <th className="text-center" style={{ width: "130px" }} scope="col">Address</th>
                    <th className="text-center" style={{ width: "30px" }} scope="col">Age</th>
                    <th className="text-center" style={{ width: "150px" }} scope="col">Number Phone</th>
                    <th className="text-center" style={{ width: "50px" }} scope="col">Role</th>
                    <th className="text-center" style={{ width: "70px" }} scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataUsers.map((user) => <AdminItemUser setDataUser={setDataUser} key={user._id} user={user}/>)}
  
  
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

export default AdminUsers;