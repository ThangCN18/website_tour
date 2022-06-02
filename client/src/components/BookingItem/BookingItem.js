import React, { useState, useEffect } from "react";
import axios from "axios"
import { Modal } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"

function BookingItem(props) {
    const bookTour = props.bookTour
    const user = useSelector(state => state.user.data)
    const [isshowcancel, setisshowcancel] = useState(false);
    const [reason, setReason] = useState("");

    const dispatch = useDispatch()

    const token = { token: "baner " + user.token }
    const handerCancel = async (e) => {
        e.preventDefault()
        setisshowcancel(false)
        console.log(reason)
        await axios({
            method: "PATCH",
            headers: token,
            url: "http://localhost:8000/booktour/status/" + bookTour._id + "/",
            data: { status: "cancel", reason: reason }
        }).then(result => {
            dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully on change status booking!" })

           
        })
    }
    return ( 
        bookTour?
        <div key={bookTour._id} className="row border-top border-bottom py-4">
        <div className="row main align-items-center mx-0">
            <div className="col-md-2 "><img style={{ width: "100%", borderRadius: "5px" }} className="img-fluid" src={bookTour.url_image} /></div>
            <div className="col-md-2 text-center">
                <div className="row mt-2" style={{ whiteSpace: "nowrap", overflow: "hidden", width: "100%", textOverflow: "ellipsis" }}>{bookTour.name_tour} </div>

                <div className="row text-muted">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(bookTour.price)}</div>
            </div>
            <div className="col-md-2 mt-2">
                <div className="row">Giảm giá </div>
                <div className="row  text-danger">{bookTour.discount + " %"} </div>

            </div>
            <div className="col-md-2 mt-2">
                <div className="row ">Số Lượng </div>
                <div className="row text-muted">{bookTour.quantity} </div>

            </div>
            <div className="col-md-2 text-right">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format((bookTour.price - bookTour.price / 100 * bookTour.discount) * bookTour.quantity)}</div>

            {
                bookTour.status === "booking" ?
                    <div className="col-md-2 text-center  mb-4 ">
                        <button type="button" onClick={e => setisshowcancel(true)} className="btn btn-danger">Hủy Tour</button>
                    </div>
                    :

                    bookTour.status === "cancel" ?
                        <div className="text-center col-md-2">
                            <div className="">Đã hủy</div>
                            <div className="text-muted">{bookTour.reason} </div>
                        </div> :
                        <div className="text-center col-md-2">
                            <div className="">Đã hoàn thành</div>
                        </div>

            }
        </div>
        <Modal show={isshowcancel}>
            <Modal.Header>Do you want to  the Cancel Booking '{bookTour._id}'?</Modal.Header>
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
    </div>:null


     );
}

export default BookingItem;