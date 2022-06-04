
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"
import { Modal } from "react-bootstrap"

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  import {
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR
  
  } from "../../redux/constants/userConstant"
  




function ProfilePage() {
    const user = useSelector(state => state.user.data)
    const [isshowimage, setisshowimage] = useState(false);
    const [imageuser, setimageuser] = useState(null);
  const notify = useSelector(state=>state.notify)
  const dispatch = useDispatch()
  const [isshowupdateuser, setisshowupdateuser] = useState(false);
  const [fullname, setfullname] = useState("");
  const [id_card, setid_card] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [age, setage] = useState(18);
  const [isshowchangpass, setisshowchangpass] = useState(false);
  const [passcurrent, setpasscurrent] = useState("");
  const [newpass, setnewpass] = useState("");
  const [messagechange, setmessagechange] = useState("");


    const navigator = useNavigate()

    useEffect(() => {
        if(!user.token){
            navigator("/")
            
        }else{
          setfullname(user.user.fullname)
            setid_card(user.user.id_card)
            setaddress(user.user.address)
            setphone(user.user.number_phone)
            setage(user.user.age)
        }
        if(notify.isNotify){
          toast.success(notify.message)
          dispatch({ type: TURN_OFF_NOTIFY})
        }

        
        

    }, [notify]);
    
    const handelChaneImage = e =>{
      let file = imageuser
      let fd = new FormData()
      fd.append('image_user', file)
      const url = "http://localhost:8000/user/image/" + user.user._id
      axios({
        method: "patch",
        url: url,
        headers: {token: "token " + user.token},
        data: fd
      }).then(result =>{
        dispatch({ type: FETCH_LOGIN_SUCCESS, data: result.data})
        dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully changed avatar!" })
      })
      setisshowimage(false)
      
    }

    const handelChanePass = e =>{
      
      const url = "http://localhost:8000/user/update-pass/" + user.user._id
      axios({
        method: "patch",
        url: url,
        headers: {token: "token " + user.token},
        data: {
          passcurrent: passcurrent,
          newpass: newpass,
        }
      }).then(result =>{
    
          dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully updated password!" })
          setisshowchangpass(false)
          setmessagechange("")
          setpasscurrent("")
          setnewpass("")
       
      }).catch(err => setmessagechange("Thay đổi password không thành công!"))
      

      
    }


    const handelEditUser = e =>{
      const url = "http://localhost:8000/user/" + user.user._id
      axios({
        method: "patch",
        url: url,
        headers: {token: "token " + user.token},
        data: {fullname: fullname, id_card: id_card, age: age, address: address, number_phone: phone}
      }).then(result =>{
        dispatch({ type: FETCH_LOGIN_SUCCESS, data: result.data})
        dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully Updated user!" })
      })
      setisshowupdateuser(false)
    }
    return ( 
        <div>

            <Header/>
            {user.user?
                <div className="container emp-profile my-5 py-4 " style={{border: "solid 2px black", borderRadius: "10px"}}>
      
                <div className="row">
                  <div className="col-md-4 text-center">
                    <div className="profile-img">
                    {
                      user.user.url_image?
                      <img  className="mx-auto" src={user.user.url_image} width="100px" height="100px" style={{borderRadius: "100px", display: "block"}}/>:
                        <img className="mx-auto"  src="https://www.stmichaelsfelton.co.uk/wp-content/uploads/Head-and-shoulder.png" width="100px" height="100px" style={{borderRadius: "100px",  display: "block"}}/>
                    }
                      <div onClick={e => setisshowimage(true)} className="file btn btn-lg btn-primary">
                        Change Photo
                        
                      </div>
                      <div onClick={e => setisshowchangpass(true)} style={{width: "112px"}} className=" mx-auto file btn btn-lg my-2 btn-primary d-block">
                        Change pass
                        
                      </div>
                     
                   
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="profile-head">
                      <h5>
                        {user.user.fullname}
                      </h5>
                      <h6>
                        Role: {user.user.role}
                      </h6>
                      
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">More</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-2">
                  <button type="button"  onClick={e => setisshowupdateuser(true)} className="btn btn-primary">Edit</button>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-md-4">
                    
                  </div>
                  <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                       
                        <div className="row">
                          <div className="col-md-6">
                            <label>Email</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.email}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Phone</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.number_phone}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Id card</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.id_card}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Age</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.age}</p>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <div className="row">
                          <div className="col-md-6">
                            <label>Full name</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.fullname}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Role</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.role}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Age</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.age}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Email</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.email}</p>
                          </div>
                        </div>  
                        <div className="row">
                          <div className="col-md-6">
                            <label>Phone</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.number_phone}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Id card</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.id_card}</p>
                          </div>
                        </div>
                      
                      <div className="row">
                          <div className="col-md-6">
                            <label>Address</label>
                          </div>
                          <div className="col-md-6">
                            <p>{user.user.address}</p>
                          </div>
                        </div>
                     
                      </div>
                    </div>
                  </div>
                </div>
                <Modal show={isshowimage}>
                <Modal.Header>Thêm ảnh đại diện của bạn.</Modal.Header>
                <Modal.Body>
                <label>Chọn hình ảnh:</label><br/>
                <input type="file" required id="form6Example1aa" className="form-control" onChange={(e) =>setimageuser(e.target.files[0])} placeholder="Select Image File" />

                </Modal.Body>
                
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e=>setisshowimage(false)} >Hủy bỏ</button>
                    
                       {
                         imageuser?
                         <button type="button" className="btn btn-success" onClick={handelChaneImage} >Thêm ảnh</button> 
                         : <button type="button" disabled className="btn btn-success" >Thêm ảnh</button> 
                       }  
                    
                </Modal.Footer>
            </Modal>

            <Modal show={isshowchangpass}>
                <Modal.Header>Thay đổi password.</Modal.Header>
                <Modal.Body>
              <p className="text-center text-danger">{messagechange}</p>
                <label>Password current:</label><br/>
                <input type="password" required  className="form-control" value={passcurrent} onChange={(e) =>setpasscurrent(e.target.value)} placeholder="Password curent" />
                <label>New password:</label><br/>
                <input type="password" required  className="form-control" value={newpass} onChange={(e) =>setnewpass(e.target.value)} placeholder="New password" />
                </Modal.Body>
                
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e=>{setisshowchangpass(false); setpasscurrent(""); setnewpass("")}} >Hủy bỏ</button>
                    
                       {
                         passcurrent && newpass?
                         <button type="button" className="btn btn-success" onClick={handelChanePass} >Change</button> 
                         : <button type="button" disabled className="btn btn-success" >Change</button> 
                       }  
                    
                </Modal.Footer>
            </Modal>

            <Modal show={isshowupdateuser}>
                <Modal.Header>Thay đổi thông tin của bạn.</Modal.Header>
                <Modal.Body>
                <label>Full name:</label><br/>
                <input type="text" required  className="form-control" value={fullname} onChange={(e) =>setfullname(e.target.value)} placeholder="Full name" />
                <label>Id card:</label><br/>
                <input type="text" required  className="form-control" value={id_card} onChange={(e) =>setid_card(e.target.value)} placeholder="Id card" />
                <label>Address:</label><br/>
                <input type="text" required  className="form-control" value={address} onChange={(e) =>setaddress(e.target.value)} placeholder="Address" />
                <label>Phone:</label><br/>
                <input type="text" required  className="form-control" value={phone} onChange={(e) =>setphone(e.target.value)} placeholder="Phone" />
                <label>Age:</label><br/>
                <input type="number" required className="form-control" value={age} onChange={(e) =>setage(e.target.value)} placeholder="age" />
              
                </Modal.Body>
                
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e=>setisshowupdateuser(false)} >Hủy bỏ</button>
                    
                       {
                         fullname && id_card && address && phone && age?
                         <button type="button" onClick={handelEditUser} className="btn btn-success"  >Chỉnh sửa</button> 
                         : <button type="button" disabled className="btn btn-success" >chỉnh sửa</button> 
                       }  
                    
                </Modal.Footer>
            </Modal>
      
            </div>:
        null}
            <Footer/>
        <ToastContainer />

        </div>
     );
}

export default ProfilePage;