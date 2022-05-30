import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"

import logo from '../../images/logo.png';
import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"


function RegisterPage(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [idCard, setIdCard] = useState("");
    const [address, setAddress] = useState("");
    const [numberPhone, setnumberPhone] = useState("");
    const [age, setAge] = useState(18);

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, -document.body.scrollHeight);

        
    }, []);


    const handerRegister = (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            axios({
                method: 'post',
                url: "http://localhost:8000/user/register",
                data: { email: email, fullname: fullName, password: password, id_card: idCard, address: address, number_phone: numberPhone, age: age }
            }).then(result => {
                dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully registered !" })
                navigate('/login')
                setLoading(false)

            }).catch(error => {
                setMessage(error)
                setLoading(false)

            })


        } catch (error) {
            setLoading(false)


        }
    }

    return (
        <div className="login-flex-container">
            <div className="register-image"></div>
            <div className="login-form-content ">
                <div className="login-form-root " style={{ marginLeft: "20%", marginTop: "20px" }}>
                    <img className='mr-3' src={logo} style={{ width: "60px" }} />
                    <Link to="/" style={{ fontSize: "30px", fontWeight: "bold", color: "black", textDecoration: "none" }}>GoTour</Link>
                    <h3 className='mt-2' style={{ fontWeight: "bold" }}>Hello, Welcome to GoTour!</h3>
                    <h5 className='mt-2'>Create new user with GoTour</h5>
                    <h5 className='mt-3' style={{ color: "#b50b0b" }}>{message}</h5>

                    <form style={{ width: "60%" }} onSubmit={handerRegister}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Full Name</label>
                            <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" aria-describedby="emailHelp" placeholder="Enter full name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <label htmlFor="inputCity">Id Card</label>
                                <input type="Number" required className="form-control" placeholder='Enter id card' value={idCard} onChange={e => setIdCard(e.target.value)} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="inputCity">Number Phone</label>
                                <input type="text" required className="form-control" placeholder='Enter number phone' value={numberPhone} onChange={e => setnumberPhone(e.target.value)} />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputCity">Age</label>
                                <input type="number" required className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Address</label>
                            <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" aria-describedby="emailHelp" placeholder="Enter address" />
                        </div>

                        {loading ? <button type="submit" className="btn btn-primary btn-lg btn-block mb-2" disabled>
                            <div style={{ width: "21px", height: "21px" }} className="spinner-border text-light" role="status">
                            </div>
                        </button>
                            : <button type="submit" className="btn btn-primary btn-lg btn-block mb-2">Register</button>}
                        <div style={{ height: "20px", width: "100%", position: "relative" }}>
                            <div style={{ height: "1px", width: "100%", background: "black", position: "absolute", top: "9.5px" }}></div>
                            <p className='text-center' style={{ position: "absolute", height: "20px", width: "8%", background: "white", left: "46%" }}>or</p>
                        </div>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <button type="button" className="btn btn-outline-primary btn-lg btn-block mt-2">Login</button>
                        </Link>
                    </form>
                </div>
            </div>


        </div>
    );
}

export default RegisterPage;