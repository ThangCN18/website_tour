import { useState, } from "react";
import { Modal } from "react-bootstrap"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"


function AdminItemReview(props) {
    const review = props.review
    const user = useSelector(state => state.user.data)
    const dispatch = useDispatch()
    const [isshowdelete, setisshowdelete] = useState(false);
    const handerDeleteReview = async (e) => {
        e.preventDefault();
        const token = { token: "baner " + user.token }
        try {
            await axios({
                method: 'DELETE',
                headers: token,
                url: "http://localhost:8000/review/" + review._id + "/",

            }).then(result => {
                setisshowdelete(false)
                
                axios({
                    method: 'get',
                    headers: token,
                    url: "http://localhost:8000/review/",
                }).then(result => {
                    
                    const a = result.data.reviews
                    props.setDataReview(a)
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
            <td style={{ lineHeight: "30px" }} scope="col" ><p className="th-user-aa" >{review._id}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaee" >{review.email}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaff" >{review.fullname}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaee" >{review.name_tour}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aa text-center" >{review.number_star}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col" ><p className="th-user-aaee" >{review.content}</p></td>

            <td>
                <button type="button" onClick={(e) => setisshowdelete(true)} className="btn btn-danger mt-0">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </td>
            <Modal show={isshowdelete}>
                <Modal.Header>Do you want to delete the review '{review._id}'?</Modal.Header>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e => setisshowdelete(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={handerDeleteReview} >Delete</button>
                </Modal.Footer>
            </Modal>


        </tr>
    );
}

export default AdminItemReview;