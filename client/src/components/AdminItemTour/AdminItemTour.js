import { Link } from "react-router-dom";
import { useState, } from "react";
import { Modal } from "react-bootstrap"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"


function AdminItemTour(props) {
    const tour = props.tour
    const link_edit = "/admin/edit/"+ tour._id
    const link_tour_trip = "/admin/tour-trip/"+ tour._id
    const user = useSelector(state => state.user.data)
    const dispatch = useDispatch()

    const [isshowdelete, setisshowdelete] = useState(false);

    const handerDeleteTour = async (e) => {
        e.preventDefault();
        const token = { token: "baner " + user.token }
        try {
            await axios({
                method: 'DELETE',
                headers: token,
                url: "http://localhost:8000/tour/" + tour._id + "/",

            }).then(result => {
                setisshowdelete(false)
                
                axios({
                    method: 'get',
                   
                    url: "http://localhost:8000/tour/",
                }).then(result => {
                    
                    const a = result.data.tours
                    props.setDataTours(a)
                    dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully delete a review!" })

                }).catch(error => {
                    console.log(error)
                })

            })

        } catch (error) {


        }

    }
    
    return ( 
        <tr >
            <td  style={{lineHeight: "80px"}} scope="col" ><p className="th-tour-aa" >{tour._id}</p></td>
            <td style={{lineHeight: "80px"}} scope="col"><p className="th-tour-aa" >{tour.name_tour}</p></td>
            <td style={{lineHeight: "80px"}} scope="col"><p className="th-tour-aa" >{tour.departure_place}</p></td>
            <td style={{lineHeight: "80px"}} scope="col"><p className="th-tour-aa" >{tour.destination}</p></td>
            <td style={{lineHeight: "80px"}} scope="col"><p className="th-tour-aa" >{tour.description}</p></td>
            <td style={{lineHeight: "80px"}} scope="col">{tour.price} VND</td>

            <td scope="col">
                <img src={tour.url_image} height="80px" width="120px" ></img>
            </td>
            <td>
            <Link to={link_tour_trip}><button type="button" className="btn btn-success mr-2">Tour Trip</button></Link>
            <Link to={link_edit}><button type="button" className="btn btn-warning mr-2">
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button></Link>
            <button type="button" className="btn btn-danger" onClick={e=> setisshowdelete(true)}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
            </button>

            </td>
            <Modal show={isshowdelete}>
                <Modal.Header>Do you want to delete the review '{tour._id}'?</Modal.Header>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e => setisshowdelete(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={handerDeleteTour} >Delete</button>
                </Modal.Footer>
            </Modal>

            

          </tr>
     );
}

export default AdminItemTour;