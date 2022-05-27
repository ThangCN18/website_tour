
import { useEffect, useState } from "react"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AdminItemTourTrip from "../../components/AdminItemTourTrip/AdminItemTourTrip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Modal } from "react-bootstrap"

import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"


function AdminTourTrip() {
    const [datatourtrip, setdatatourtrip] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isShowAdd, setisShowAdd] = useState(false);
    const [departurePlace, setDeparturePlace] = useState("");
    const [discount, setDiscount] = useState(0);
    const user = useSelector(state => state.user.data) 

    const { id_tour } = useParams()
    const notify = useSelector(state => state.notify)
    const dispatch = useDispatch()

    const handelAddTourTrip = async (e)=>{
        e.preventDefault()
        const token = {token: "baner " + user.token}
        setisShowAdd(false)
        axios({
            method: 'post',
            headers: token,
            url: "http://localhost:8000/tourtrip/"+id_tour+"/",
            data: { departure_day: departurePlace, discount: discount }
          }).then(result => {
            dispatch({ type: TURN_ON_NOTIFY, message: "you have successfully created a new tour trip!" })
          }).catch(error =>{
            console.log(error)
          })
          
       
      }
        
    


    useEffect(() => {
        setLoading(false)

        axios({
            method: 'get',
            url: "http://localhost:8000/tourtrip/tour/" + id_tour + "/",
        }).then(result => {
            const a = result.data.tourTrips

            setdatatourtrip(a)
            setLoading(true)
        }).catch(error => {
            console.log(error)
        })
        if (notify.isNotify) {
            toast.success(notify.message)
            dispatch({ type: TURN_OFF_NOTIFY })
        }

    }, [notify])
    return (
        <div className="mx-4" >

            {
                loading ?
                    <div className="p-3">
                        <Link to="/admin/" style={{ textDecoration: "none", display: "inline", fontSize: "20px", color: "green" }}>{"<<Back"}</Link>
                        <h2 style={{ display: "inline", marginLeft: "45%", color: "green" }} >Tour Trip</h2>
                        <button type="button" onClick={e => setisShowAdd(true)} className="btn btn-success mr-2 float-right my-3 mt-3 ">Add new tour trip</button>

                        <table className="table table-bordered">
                            <thead>
                                <tr style={{ background: "green", color: "white" }}>
                                    <th className="text-center" style={{ width: "150px" }} scope="col">_id</th>
                                    <th className="text-center" style={{ width: "150px" }} scope="col">Departure place</th>
                                    <th className="text-center" style={{ width: "150px" }} scope="col">Total quantity</th>
                                    <th className="text-center" style={{ width: "150px" }} scope="col">Price</th>
                                    <th className="text-center" style={{ width: "150px" }} scope="col">Discount</th>


                                    <th className="text-center" style={{ width: "195px" }} scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>

                                {datatourtrip.map((tourtrip) => <AdminItemTourTrip setdatatourtrip={setdatatourtrip} key={tourtrip._id} tourtrip={tourtrip} />)}

                            </tbody>
                        </table>
                    </div> :
                    <div className="spinner-border text-success mt-3" style={{ marginLeft: "50%" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
            }

            <ToastContainer />

            <Modal show={isShowAdd}>
                <Modal.Header>Create New Tour Trip'?</Modal.Header>
                <Modal.Body>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example1">Departure Place</label>
                            <input type="date" required value={departurePlace} onChange={e => setDeparturePlace(e.target.value)} className="form-control" placeholder="Departure Place" />
                        </div>
                    </div>

                    <div className="col mt-2">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example1">Discount</label>
                            <input type="number" required value={discount} onChange={e => setDiscount(e.target.value)} className="form-control" placeholder="Discount" />
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e => setisShowAdd(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={handelAddTourTrip}  >Add</button>
                </Modal.Footer>
            </Modal>



        </div>

    );
}

export default AdminTourTrip;