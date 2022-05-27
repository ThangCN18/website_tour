import { Modal } from "react-bootstrap"
import { useState } from "react";
import "./adminItemUser.css"
import axios from "axios";
import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"
import { useDispatch, useSelector } from "react-redux";


function AdminItemUser(props) {
    const user = props.user
    const [valuerole, setvaluerole] = useState(user.role);
    const [isShowchangerole, setisShowchangerole] = useState(false);
    const usertoken = useSelector(state => state.user.data.token)
    const [isShowDeleteUser, setisShowDeleteUser] = useState(false);

    const token = { token: "baner " + usertoken }
    const dispatch = useDispatch()


    const handerChangeRole = async (e) => {
        e.preventDefault()
        setisShowchangerole(false)

        await axios({
            method: "PATCH",
            headers: token,
            url: "http://localhost:8000/user/role/" + user._id + "/",
            data: { role: valuerole }
        }).then(result => {
            dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully on change Role of a User!" })

            axios({
                method: 'get',
                headers: token,
                url: "http://localhost:8000/user/",
            }).then(result => {
                const a = result.data.users
                props.setDataUser(a)


            }).catch(error => {
                console.log(error)
            })
        })
    }

    const handerDeleteUser = async (e) => {
        e.preventDefault()
        setisShowDeleteUser(false)

        await axios({
            method: "delete",
            headers: token,
            url: "http://localhost:8000/user/" + user._id + "/",
        }).then(result => {
            
            dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully on change Role of a User!" })
            axios({
                method: 'get',
                headers: token,
                url: "http://localhost:8000/user/",
            }).then(result => {
                const a = result.data.users
                console.log(a)
                props.setDataUser(a)
            })
        })
    }
    return (
        <tr >
            <td style={{ lineHeight: "30px" }} scope="col" ><p className="th-user-aa" >{user._id}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaee" >{user.email}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aaff" >{user.fullname}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aa" >{user.id_card}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="th-user-aa" >{user.address}</p></td>
            <td style={{ lineHeight: "30px" }} className="text-center" scope="col">{user.age}</td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="" >{user.number_phone}</p></td>
            <td style={{ lineHeight: "30px" }} scope="col"><p className="" >
                {
                    user.role === "admin" ?
                        <select class="form-select form-select-sm" disabled aria-label=".form-select-sm example">
                            <option value="admin">Admin</option>
                        </select> :
                        <select class="form-select form-select-sm" value={valuerole} onChange={(e) => {
                            setvaluerole(e.target.value)
                            setisShowchangerole(true)


                        }} aria-label=".form-select-sm example">
                            <option value="customer">Customer</option>
                            <option value="staff">Staff</option>
                        </select>
                }
            </p></td>

            <td>
                {
                    user.role === "admin" ?
                        <button type="button" disabled className="btn btn-danger mt-0">Delete</button> :
                        <button type="button" className="btn btn-danger mt-0" onClick={e => setisShowDeleteUser(true)}>Delete</button>
                }


            </td>
            <Modal show={isShowchangerole}>
                <Modal.Header>Do you want to  the change role '{user._id}'?</Modal.Header>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e => { setisShowchangerole(false); setvaluerole(user.role) }}>Cancel</button>
                    <button type="button" className="btn btn-success" onClick={handerChangeRole} >Ok</button>
                </Modal.Footer>
            </Modal>
            <Modal show={isShowDeleteUser}>
                <Modal.Header>Do you want to  the delete user '{user._id}'?</Modal.Header>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e => { setisShowDeleteUser(false) }}>Cancel</button>
                    <button type="button" className="btn btn-success" onClick={handerDeleteUser} >Ok</button>
                </Modal.Footer>
            </Modal>

        </tr>
    );
}

export default AdminItemUser;