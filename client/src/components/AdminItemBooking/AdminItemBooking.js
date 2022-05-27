import "./adminItemBooking.css"
import { useState, } from "react";
import { Modal } from "react-bootstrap"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"

function AdminItemBooking(props) {
    const booking = props.booking
    const [isshowcancel, setisshowcancel] = useState(false);
    const [reason, setReason] = useState("");
    const [isShowComplate, setisShowComplate] = useState(false);
    const user = useSelector(state => state.user.data)
    const dispatch = useDispatch()



    const token = { token: "baner " + user.token }
    const handerCancel = async (e) => {
        e.preventDefault()
        setisshowcancel(false)
        console.log(reason)
        await axios({
            method: "PATCH",
            headers: token,
            url: "http://localhost:8000/booktour/status/" + booking._id + "/",
            data: { status: "cancel", reason: reason }
        }).then(result => {
            dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully on change status booking!" })

            axios({
                method: 'get',
                headers: token,
                url: "http://localhost:8000/booktour/",
            }).then(result => {

                const a = result.data.bookTours
                props.setDataBooking(a)


            }).catch(error => {
                console.log(error)
            })
        })
    }

    const handerComplate = async (e) => {
        e.preventDefault()
        setisShowComplate(false)

        await axios({
            method: "PATCH",
            headers: token,
            url: "http://localhost:8000/booktour/status/" + booking._id + "/",
            data: { status: "complete", reason: "Tour complete" }
        }).then(result => {
            dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully on change status booking!" })

            axios({
                method: 'get',
                headers: token,
                url: "http://localhost:8000/booktour/",
            }).then(result => {

                const a = result.data.bookTours
                props.setDataBooking(a)


            }).catch(error => {
                console.log(error)
            })
        })
    }


    return (
        <tr >
            <td style={{ lineHeight: "30px" }} scope="col" ><p className="td-booking-aa" >{booking._id}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className=" td-booking-aaff" >{booking.name_tour}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="text-center" >{booking.departure_day.slice(0, 10)}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="text-center" >{booking.price}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="text-center" >{booking.quantity}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="text-center" >{booking.discount} %</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className=" td-booking-aaff" >{booking.email}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className=" text-center" >{booking.status}</p></td>

            <td style={{ lineHeight: "30px" }} scope="col" ><p className=" td-booking-aaff" >{booking.reason}</p></td>

            <td>
                <button type="button" className="btn btn-success mt-0 mr-2 " onClick={(e) => setisShowComplate(true)}>Complete</button>
                <button type="button" className="btn btn-danger mt-0" onClick={(e) => setisshowcancel(true)}>Cancel Tour</button>
            </td>
            <Modal show={isshowcancel}>
                <Modal.Header>Do you want to  the Cancel Booking '{booking._id}'?</Modal.Header>
                <Modal.Body>
                    <div className="col mt-2">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example1">Reason</label>
                            <input type="text" required value={reason} onChange={e => setReason(e.target.value)} className="form-control" placeholder="Reason" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e => setisshowcancel(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={handerCancel} >Ok</button>
                </Modal.Footer>
            </Modal>

            <Modal show={isShowComplate}>
            <Modal.Header>Do you want to  the Complete Booking '{booking._id}'?</Modal.Header>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={e => setisShowComplate(false)}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={handerComplate} >Complete</button>
            </Modal.Footer>
        </Modal>

        </tr>
    );
}

export default AdminItemBooking;