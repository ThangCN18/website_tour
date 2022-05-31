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
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BookingItem from "../../components/BookingItem/BookingItem";

function BookingPage() {
    const [databooking, setdatabooking] = useState([]);
    const user = useSelector(state => state.user.data)
    const [isshowcancel, setisshowcancel] = useState(false);
    const [reason, setReason] = useState("");

    const notify = useSelector(state => state.notify)
    const dispatch = useDispatch()
    useEffect(() => {

        if (notify.isNotify) {
            toast.success(notify.message)
            dispatch({ type: TURN_OFF_NOTIFY })
        }

        if(user.user){
            const url = "http://localhost:8000/booktour/user/" + user.user._id
            axios({
                method: "get",
                url: url,
                headers: { token: "token " + user.token },
    
            }).then(result => {
                const a = result.data.bookTours
                setdatabooking(a)
    
            })

        }

       



    }, [notify]);
    return (
        <div>
            <Header liItem="booking" />
            {
                user.token ?
                    <div className="card">
                        <div className="row">
                            <div className="col-xl-9 mx-auto cart px-5">
                                <div className="title">
                                    <div className="row mt-3">
                                        <div className="col my-3"><h4><b>Danh sách các tour đã đặt</b></h4></div>
                                        <div className="col align-self-center text-right text-muted">{databooking.length}</div>
                                    </div>
                                </div>
                                {
                                    databooking ?

                                        databooking.map(bookTour => <BookingItem key={bookTour._id} bookTour={bookTour}/>

                                        )
                                        :
                                        <div className="text-center" style={{ width: "100%", height: "50vh", paddingTop: "20vh" }}>
                        <h3>Bạn chưa đặt tour nào</h3>

                    </div>
                                }


                                <div className="back-to-shop " style={{width: "100vw", height: "18vh"}}></div>
                            </div>

                        </div>
                    </div> :
                    <div className="text-center" style={{ width: "100%", height: "50vh", paddingTop: "20vh" }}>
                        <h3>Vui lòng đăng nhập trước</h3>

                    </div>
            }

            <Footer />
            <ToastContainer />


        </div>


    );
}

export default BookingPage;