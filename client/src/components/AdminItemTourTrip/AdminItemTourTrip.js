import { useState, } from "react";
import { Modal } from "react-bootstrap"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"

function AdminItemTourTrip(props) {

    const tourtrip = props.tourtrip
    const user = useSelector(state => state.user.data)
    const token = { token: "baner " + user.token }
  const { id_tour } = useParams()


    const dispatch = useDispatch()
    const [isshowdelete, setisshowdelete] = useState(false);

    const handerDeleteReview = async (e) => {
        e.preventDefault();
        try {
            await axios({
                method: 'DELETE',
                headers: token,
                url: "http://localhost:8000/tourtrip/" + tourtrip._id + "/"

            }).then(result => {
                setisshowdelete(false)
                axios({
                    method: 'get',
                    url: "http://localhost:8000/tourtrip/tour/"+ id_tour + "/",
                }).then(result => {
                   
                    const a = result.data.tourTrips
                    props.setdatatourtrip(a)
                    dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully delete a tour trip!" })

                }).catch(error => {
                    console.log(error)
                })

            })

        } catch (error) {


        }

    }
    return ( 
        <tr >
        <td style={{ lineHeight: "30px" }} scope="col" ><p className="th-user-aaee" >{tourtrip._id}</p></td>
        <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaee text-center " >{tourtrip.departure_day.slice(0,10)}</p></td>
        <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaee text-center" >{tourtrip.total_quantity}</p></td>
        <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaee text-center" >{tourtrip.price}</p></td>
        <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaee text-center" >{tourtrip.discount}</p></td>
        <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaee text-center" >{tourtrip.quantity_booked}</p></td>
        <td>
            <button type="button" onClick={(e) => setisshowdelete(true)} className="btn btn-danger mt-0">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
        </td>
        <Modal show={isshowdelete}>
            <Modal.Header>Do you want to delete the tourtrip '{tourtrip._id}'?</Modal.Header>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={e => setisshowdelete(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handerDeleteReview} >Delete</button>
            </Modal.Footer>
        </Modal>
       
    </tr>
     );
}

export default AdminItemTourTrip;