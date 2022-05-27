import { Link, useNavigate} from "react-router-dom";
import React, {  useEffect } from 'react';
import Header from "../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import AdminTours from "../../components/AdminTours/AdminTours";
import AdminUsers from "../../components/AdminUsers/AdminUsers";
import AdminReview from "../../components/AdminReview/AdminReview";
import AdminBooking from "../../components/AdminBooking/AdminBooking";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import {
  TURN_OFF_NOTIFY,
  TURN_ON_NOTIFY
  } from "../../redux/constants/notifyConstant"

function AdminPage() {
    const user = useSelector(state => state.user) 
    const navigate = useNavigate()
    const notify = useSelector(state=>state.notify)
  const dispatch = useDispatch()
  


    useEffect(() => {

        if(!user.success || user.data.user.role === "customer"){
            navigate("/")
        }
        if(notify.isNotify){
          toast.success(notify.message)
          dispatch({ type: TURN_OFF_NOTIFY})
        }
      });

    return ( 
      <div>
      <div className=" fixed-top"><Header liItem="admin" /></div>

        <div className="row mt-5">
        <div className="nav mt-5 flex-column nav-pills col-2 text-center  fixed-top  bg-light pl-3 pr-1 pt-4" style={{height: "100vh"}} id="v-pills-tab" role="tablist" aria-orientation="vertical">
          
          <a className="nav-link active mt-2" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Tours</a>
          <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Booking</a>
          {user.data.user.role === "admin"?<a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Users</a>:null}
          <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Reviews</a>
          
        </div>
        <div className="col-2 mr-3 float-left"></div>
        <div className="tab-content "  id="v-pills-tabContent">
          <div className="tab-pane fade show active " id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <AdminTours/>
          </div>
          <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><AdminBooking/></div>
          {user.data.user.role === "admin"?<div className="tab-pane fade " id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><AdminUsers/></div>:null}
          
          <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"><AdminReview/></div>
        </div>
        <ToastContainer />
      </div>
      </div>
     );
}

export default AdminPage
