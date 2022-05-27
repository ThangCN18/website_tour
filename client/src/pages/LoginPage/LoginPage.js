import React, {useState, useEffect} from 'react';
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import logo from '../../images/logo.png';
import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_ERROR

} from "../../redux/constants/userConstant"

import {
TURN_OFF_NOTIFY,
TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"

import "./loginPage.css"
function LoginPage() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const requesting = useSelector(state=>state.user.requesting)
  const message = useSelector(state=>state.user.message)
  const navigate = useNavigate()
  const notify = useSelector(state=>state.notify)



  const onSubmitLogin = (e) =>{
    e.preventDefault()
    try {
      dispatch({ type: FETCH_LOGIN_REQUEST })
       axios({
        
        method: 'post',
        url: "http://localhost:8000/user/login",
        data: { email: email, password: password }
      }).then(result => {
        dispatch({ type: FETCH_LOGIN_SUCCESS, data: result.data})
        navigate('/')
      }).catch(error =>{
        dispatch({ type: FETCH_LOGIN_ERROR, data: error.response.data.message})
        console.log(error)
      })
      
    } catch (error) {
      dispatch({ type: FETCH_LOGIN_ERROR, data: "error"})
      
    }
  }

  useEffect(() => {
    if(notify.isNotify){
      toast.success(notify.message)
      dispatch({ type: TURN_OFF_NOTIFY})
    }
    
  }, []);

  return ( 
    <div className="login-flex-container">
      <div className="login-image"></div>
      <div className="login-form-content " style={{overflow: "hidden"}}>
        <div className="login-form-root " style={{ marginLeft: "20%", marginTop: "10%"}}>
            <img className='mr-3' src={logo}　style={{width: "70px"}}/>
            <Link to="/" style={{fontSize: "30px", fontWeight: "bold", color: "black", textDecoration: "none"}}>GoTour</Link>
            <h3 className='mt-2' style={{fontWeight: "bold"}}>Hello, Welcome to GoTour!</h3>
            <h5 className='mt-2'>Login as admin and try all the features.</h5>
            <h5 className='mt-3' style={{color: "#b50b0b"}}>{message}</h5>
            
            <form  style={{width: "60%"}} onSubmit={onSubmitLogin}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <Link to={"/forgot"} style={{textDecoration: "none"}}><p className='text-right'>Forgot password?</p></Link>
            {requesting ? <button type="submit" className="btn btn-primary btn-lg btn-block mb-2" disabled>
            <div style={{width:"21px", height: "21px"}} className="spinner-border text-light" role="status">
          </div>
            </button> 
            : <button type="submit" className="btn btn-primary btn-lg btn-block mb-2">Login</button>}
            <div style={{height: "20px", width: "100%", position: "relative"}}>
              <div style={{height: "1px", width: "100%", background: "black", position: "absolute", top: "9.5px"}}></div>
              <p className='text-center' style={{position: "absolute", height: "20px", width: "8%", background: "white", left: "46%"}}>or</p>
            </div>
            <Link to="/register" style={{textDecoration: "none"}}>
            <button type="button"  className="btn btn-outline-primary btn-lg btn-block mt-2">Register</button>
            </Link>
          </form> 
        </div>
      </div>
         
      <ToastContainer />
    </div>
   );
}

export default LoginPage;