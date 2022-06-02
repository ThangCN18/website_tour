import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ItemTour from "../../components/ItemTour/ItemTour";
import ItemReview from "../../components/ItemReview/ItemReview";
import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"
import { Modal } from "react-bootstrap"

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function DetailTourPage() {

    const [tour, setTour] = useState(null);
    const [dataTours, setDataTours] = useState(null);
    const [tourtripch, settoutripch] = useState(null)
    const [datatourtrip, setdatatourtrip] = useState(null)
    const [numberbook, setnumberbook] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data) 
    const [datareview, setdatareview] = useState([]);
    const [numbercount, setnumbercount] = useState(0);
    const [isreviewed, setisreviewed] = useState(null)
    const [isshowreview, setisshowreview] = useState(false);
    const [numberStar, setnumberStar] = useState(5);
    const [contentreview, setcontentreview] = useState("");
    const notify = useSelector(state => state.notify)
    const [isshowdeletereview, setisshowdeletereview] = useState(false);
    const [isshoweditreview, setisshoweditreview] = useState(false);
    const [isbookinga, setisbookinga] = useState(true)

    const [isShow, setIsShow] = useState(false);

    const { id_tour } = useParams()

    const handelEditReview = e =>{
        
        const url_edit =  "http://localhost:8000/review/" + isreviewed._id
        axios({
            method: "patch",
            url: url_edit,
            headers: {token: "token " + user.token},
            data: {
                content: contentreview,
                number_star: numberStar
            }
        }).then(result =>{
            dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully updated Review!" })
        })
        setisshoweditreview(false)
        setnumberStar(5)
        setcontentreview("")
       }

    
    const handelAddReview = e =>{
        if(tour){
            const urrel = "http://localhost:8000/review/" + id_tour
            axios({
                method: "post",
                url: urrel,
                headers: {token: "token " + user.token},
                data: {
                    id_user: user.user._id,
                    content: contentreview,
                    number_star: numberStar
                }
            }).then(result =>{
                dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully Review!" })
            })
            setisshowreview(false)
            setnumberStar(5)
            setcontentreview("")
        }
    }

    const handeldeleteReview = e =>{
        if(tour){
            const url_del = "http://localhost:8000/review/" + isreviewed._id
            axios({
                method: "delete",
                url: url_del,
                headers: {token: "token " + user.token},
               
            }).then(result =>{
                dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully deleted Review!" })
            })
            setisshowdeletereview(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, -document.body.scrollHeight);
        setisreviewed(null)
        console.log(isbookinga)
        const url = "http://localhost:8000/tour/" + id_tour
        if(notify.isNotify ){
            toast.success(notify.message)
            if(isbookinga){
                dispatch({ type: TURN_OFF_NOTIFY})

            }
          }

        axios({
            method: "get",
            url: url,

        }).then(result => {
            const a = result.data.tour
            setTour(a)
            const urrl = "http://localhost:8000/tour/category/" + id_tour+"/?c="+a.category
            axios({
                method: "get",
                url: urrl

            }).then(result => {
                const t = result.data.tours
                setDataTours(t)
            })

            const urrrl = "http://localhost:8000/tourtrip/yetdeparted/" + id_tour
            axios({
                method: "get",
                url: urrrl,

            }).then(result => {
                const tt = result.data.tourTrips
                setdatatourtrip(tt)
            })
            const urrrrl = "http://localhost:8000/review/" +id_tour
            axios({
                method: "get",
                url: urrrrl,  
            }).then(result =>{
    
                let a = result.data.reviews

                setdatareview(a)

                if(a.length>0){
                    
                  let sum = 0
                  for(var c = 0; c<a.length; c++){
                      sum = sum+a[c].number_star 
                      if(user.user){

                          if(user.user.email === a[c].email){
                              setisreviewed(a[c])
                          }
                      }       
                  }
                  setnumbercount(sum/a.length)

                }
    
            })
        })
        


    }, [id_tour, notify, user]);

    const handelShowEdit = e =>{
        setisshoweditreview(true)
        setnumberStar(isreviewed.number_star)
        setcontentreview(isreviewed.content)
    }

    const handelBooking = (e)=>{
        setisbookinga(false)

        const urrrl = "http://localhost:8000/booktour/" + tourtripch._id
            axios({
                method: "post",
                url: urrrl,
                headers: {token: "token "+ user.token},
                data: {
                    "id_user": user.user._id,
                    "quantity": numberbook
                }
            }).then(result => {

                dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully booked!" })
                navigate("/booking/")

            })
    }


    return (
        <div>
            <Header />

            {
                tour ?
                    <div className="container-fluit  mx-auto" style={{ marginTop: '30px' }}>
                        <div className="row">
                            <div className="col-md-9">
                                <h2 className="card-title ml-5 pl-3" style={{ color: "#038024", whiteSpace: "nowrap", overflow: "hidden", width: "85%", textOverflow: "ellipsis" }}>{tour.name_tour}</h2>

                                <div className="">
                                    <div className="" style={{ width: "89%", height: "65vh", background: "#e8e4e3", borderRadius: "20px", marginLeft: "10%", marginTop: "7%", marginBottom: "5%", boxShadow: "2px 2px 4px #b4b8b5" }}>
                                        <img style={{ width: "100%", height: "100%", marginLeft: "-5%", borderRadius: "20px", border: "solid 2px #b3b1b1", marginTop: "-5%" }} src={tour.url_image} />

                                    </div>
                                </div>

                                <div className="mx-auto" style={{ width: "80%" }}>
                                    <h4 className="text-success">Giới thiệu:</h4>
                                    <p className="card-text text-left " style={{ flexWrap: "nowrap", overflow: "hidden", width: "100%" }}>{tour.description}</p>
                                    {
                                        isShow ?
                                            <div>
                                                <h6 className="text-success"> - Thể loại: <label style={{ color: "black" }}>{tour.category}</label></h6>

                                                <h6 className="text-success"> - Địa điểm khởi hành: <label style={{ color: "black" }}>{tour.departure_place}</label></h6>
                                                <h6 className="text-success"> - Địa điểm tới: <label style={{ color: "black" }}>{tour.destination}</label></h6>
                                                <h6 className="text-success"> - Thời gian chuyến đi: <label style={{ color: "black" }}>{tour.schedule}</label></h6>
                                                <h4 className="text-success">Tổng quan chuyến đi:</h4>
                                                <p className="card-text text-left " style={{ flexWrap: "nowrap", overflow: "hidden", width: "100%" }}>{tour.content_tour}</p>
                                                <div className="text-center mb-5" style={{ width: "100%", height: "1px", background: "black" }}>
                                                    <button type="button" onClick={e => setIsShow(false)} className="btn btn-outline-secondary my-2" >Ẩn bớt</button>
                                                </div>
                                            </div> :
                                            <div className="text-center mb-5" style={{ width: "100%", height: "1px", background: "black" }}>
                                                <button type="button" onClick={e => setIsShow(true)} className="btn btn-outline-secondary my-2 " >Xem thêm</button>
                                            </div>
                                    }

                                </div>


                            </div>
                            <div className="col-md-3 p-5" >
                                <div className="p-4" style={{ background: "#5acc78", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "10px" }}>
                                    <h5>Bạn muốn đặt tour này?</h5>
                                    <from>
                                        <div className="">
                                            <label className="form-label mt-3" htmlFor="form6Example133">Lựa chọn chuyến đi</label>

                                            <div className="btn-group" style={{ width: "100%" }}>
                                                {
                                                    tourtripch ?
                                                        <button type="button" className="btn btn-light dropdown-toggle mt-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {tourtripch.departure_day.slice(0,10)}
                                                        </button> :
                                                        <button type="button" className="btn btn-light dropdown-toggle mt-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Chọn chuyến đi
                                                        </button>
                                                }


                                                <div className="dropdown-menu" style={{ width: "100%" }}>
                                                    <div className=" dropdown-item ml-0 px-0" >
                                                        <div className="float-left text-center text-success" style={{ width: "50%" }}>Ngày Khởi Hành</div>
                                                        <div className="float-left text-center text-success" style={{ width: "25%" }}>SL</div>
                                                        <div className="text-center text-success" style={{ width: "25%" }}>Giảm giá</div>
                                                    </div>
                                                    {
                                                        datatourtrip ?
                                                            datatourtrip.map(tourtrip => {
                                                                return (
                                                                    <div key={tourtrip._id} className=" dropdown-item ml-0 px-0"  onClick={e=> settoutripch(tourtrip)}>
                                                                    <div className="float-left text-center" style={{ width: "50%" }}>{tourtrip.departure_day.slice(0,10)}</div>
                                                                    <div className="float-left text-center" style={{ width: "25%" }}>{tour.total_quantity -tourtrip.quantity_booked}</div>
                                                                    <div className="text-center text-danger" style={{ width: "25%" }}>{tourtrip.discount} %</div>
                                                                </div>

                                                                )
                                                                
                                                            }):
                                                            null
                                                    }




                                                </div>
                                            </div>


                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label mt-2" htmlFor="form6Example3">Chọn số lượng:</label>
                                            <input type="number" required id="form6Example3" value={numberbook} onChange={
                                                (e)=>{
       

                                                    if(e.target.value <=1){
                                                            setnumberbook(1)                                         
                                                    }else{
                                                       if(e.target.value >= tour.total_quantity- tourtripch.quantity_booked){
                                                           setnumberbook(tour.total_quantity- tourtripch.quantity_booked)
                                                       }else{
                                                        setnumberbook(e.target.value)
                                                       }
                                                            
                                                    }
                                                }
                                            } className="form-control" placeholder="số lượng" />
                                        </div>
                                        <div className="form-outline ">
                                        <label className="form-label mt-2" htmlFor="form6Example3">Đơn giá: </label>
                                        <label className="form-label ml-1 text-primary" htmlFor="form6Example3"> {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(tour.price)}</label>
                                        
                                    </div>
                                   

                                        <div className="form-outline ">
                                        <label className="form-label mt-2" htmlFor="form6Example3">Giảm giá:</label>
                                        {tourtripch?
                                        <label className="form-label ml-1 text-primary" htmlFor="form6Example3"> {tourtripch.discount+ " %"}</label>

                                        :
                                        <label className="form-label ml-1 text-primary" htmlFor="form6Example3"> 0 %</label>


                                        }
                                        
                                    </div>
                                    <div className="form-outline ">
                                    <label className="form-label mt-2" htmlFor="form6Example3">Thành tiền:</label>
                                    {tourtripch?
                                        <label className="form-label ml-1 text-danger" htmlFor="form6Example3"> {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format((tour.price-tour.price/100*tourtripch.discount)*numberbook)}</label>
                                    :
                                    <label className="form-label ml-1 text-danger" htmlFor="form6Example3"> {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(tour.price)}</label>

                                    }
                                    
                                </div>
                                <div className="w-100 mt-2">
                        <label className="form-label" htmlFor="form6Example133">Lựa chọn phương thức thanh toán</label>
                        <select className="form-control" id="exampleFormControlSelect1" >
                            <option value="Thanh toán trực tiếp">Thanh toán trước chuyến đi</option>
                            <option value="Thanh toán online" disabled>Thanh toán online</option>
                            
                        </select>
                    </div>

                                    <div className="form-outline ">
                                        
                                        {tourtripch && user.token?
                                            <button type="button" onClick={handelBooking} className="btn btn-primary btn-lg w-100">Đặt ngay</button>
                                        :
                                        <button type="button" disabled className="btn btn-secondary btn-lg w-100">Đặt ngay</button>

                                        }
                                        
                                    </div>
                                    
                                    </from>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto" style={{ width: "85%" }}>
                            <h4 className="text-success">Gợi ý cho bạn:</h4>

                        </div>
                        {
                            dataTours ?
                                <div className="row mx-auto text-center container-fluid px-5" >
                                    <div className="my-3 mx-auto" style={{ background: "black", height: "2px", width: "92%" }}></div>
                                    {dataTours.map(tour => <ItemTour key={tour._id} tour={tour} />)}
                                </div>
                                : null
                        }
                    </div>
                    :
                    null
            }
            <div className="mt-3 mx-auto" style={{ background: "black", height: "2px", width: "92%" }}></div>
            <div className="container-fluid px-0 pt-4 mx-auto">
        <div className="row justify-content-center mx-0 mx-md-auto">
          <div className="col-lg-10 col-md-11 px-1 px-sm-2">
            <div className="card border-0 px-3">
              {/* top row */}
              <div className="d-flex row py-4 px-5 bg-light" style={{borderRadius: "10px"}}>
                <div className="bg-success p-2 px-3 mx-2" style={{borderRadius: "10px"}}>
                  <p className="sm-text mb-0">OVERALL RATING</p>
                  {datareview.length==0?
                    <h4>5</h4>:
                    <h4>{
                    numbercount
                    }</h4>
                  }
                </div>
                <div className="white-tab p-2 mx-2 text-muted">
                  <p className="sm-text mb-0">ALL REVIEWS</p>
                  {datareview.length!==0?
                    <h4>{
                        datareview.length
                    }</h4>:<h4>0</h4>
                    }
                </div>
              
                <div className="ml-auto ">
                  {user.token?
                    isreviewed?
                    <button className="btn btn-danger px-4" disabled>Bạn đã đánh giá</button>:
                    <button className="btn btn-danger px-4" onClick={e=>setisshowreview(true)} >Thêm đánh giá</button>
                    :
                    <button className="btn btn-danger px-4" disabled>Đăng nhập để có thể đánh giá</button>
                }
                <Modal show={isshowreview}>
                <Modal.Header>Thêm review của bạn.</Modal.Header>
                <Modal.Body>
                <div className="col mt-2">
                <div className="form-outline text-left ">
                <label className="form-label"  style={{display: "block"}} htmlFor="form6Example1">Đánh Giá: {
                    numberStar === 1?
                    <p style={{display: "inline"}} className="text-danger"> Không thích</p>:
                    numberStar ===2?
                    <p style={{display: "inline"}} className="text-danger"> Tạm được</p>:
                    numberStar ===3?
                    <p style={{display: "inline"}} className="text-warning"> Bình thường</p>:
                    numberStar ===4?
                    <p style={{display: "inline"}} className="text-success"> Hài lòng</p>:
                    <p style={{display: "inline"}} className="text-success"> Tuyện vời.</p>
                }</label>
               <div  style={{display: "inline"}}>
               <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(1)} style={{fontSize: "30px"}} aria-hidden="true" />
               </div>
               <div  style={{display: "inline"}}>
               {
                   numberStar===1?
                   <i className="fa fa-star mr-1 text-muted" onMouseOver={e => setnumberStar(2)} style={{fontSize: "30px"}} aria-hidden="true" />:
                   <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(2)} style={{fontSize: "30px"}} aria-hidden="true" />
               }
              
               </div>
               <div  style={{display: "inline"}}>
               {
                   numberStar < 3?
                   <i className="fa fa-star mr-1 text-muted" onMouseOver={e => setnumberStar(3)} style={{fontSize: "30px"}} aria-hidden="true" />:
                   <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(3)} style={{fontSize: "30px"}} aria-hidden="true" />
               }
              
               </div>
               <div  style={{display: "inline"}}>
               {
                   numberStar < 4?
                   <i className="fa fa-star mr-1 text-muted" onMouseOver={e => setnumberStar(4)} style={{fontSize: "30px"}} aria-hidden="true" />:
                   <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(4)} style={{fontSize: "30px"}} aria-hidden="true" />
               }
              
               </div>
               <div  style={{display: "inline"}}>
               {
                   numberStar < 5?
                   <i className="fa fa-star mr-1 text-muted" onMouseOver={e => setnumberStar(5)} style={{fontSize: "30px"}} aria-hidden="true" />:
                   <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(5)} style={{fontSize: "30px"}} aria-hidden="true" />
               }
              
               </div>
               
            
                </div>
            </div>
                    <div className="col mt-2">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example1">Nội dung</label>
                            <input type="text" value={contentreview} onChange={e => setcontentreview(e.target.value)}  className="form-control" placeholder="..." />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e=>setisshowreview(false)} >Hủy bỏ</button>
                    {
                        contentreview?
                        <button type="button" className="btn btn-success" onClick={handelAddReview} >Đánh giá</button>
                        :<button type="button" disabled className="btn btn-success"  >Đánh giá</button>
                    }
                </Modal.Footer>
            </Modal>
                </div>
              </div>
              {/* middle row */}
              {isreviewed?
                <div className="review p-2 px-5">
                <div className="row d-flex">
                  <div className="profile-pic ">{
                    isreviewed.url_image?
                    <img src={isreviewed.url_image} width="60px" height="60px" style={{borderRadius: "30px"}}/>:
                    <img src="https://www.stmichaelsfelton.co.uk/wp-content/uploads/Head-and-shoulder.png" width="60px" height="60px" style={{borderRadius: "30px"}}/>
                  }</div>
                  <div className=" pl-3 " style={{width: "60%"}}>
                    <h4>{isreviewed.fullname}</h4>
                    <div className="row pb-3 mx-2">
                   
                    <div style={{display: "inline"}}>
                        <i className="fa fa-star text-warning" aria-hidden="true" />
                    </div>
                    <div style={{display: "inline"}}>
                    {isreviewed.number_star===1?
                        <i className="fa fa-star text-muted" aria-hidden="true" />:
                        <i className="fa fa-star text-warning" aria-hidden="true" />
                    }
                    </div>
                    <div style={{display: "inline"}}>
                    {isreviewed.number_star < 3?
                        <i className="fa fa-star text-muted" aria-hidden="true" />:
                        <i className="fa fa-star text-warning" aria-hidden="true" />
                    }
                    </div>
                    <div style={{display: "inline"}}>
                    {isreviewed.number_star < 4?
                        <i className="fa fa-star text-muted" aria-hidden="true" />:
                        <i className="fa fa-star text-warning" aria-hidden="true" />
                    }
                    </div>
                    <div >
                    {isreviewed.number_star < 5?
                        <i className="fa fa-star text-muted" aria-hidden="true" />:
                        <i className="fa fa-star text-warning" aria-hidden="true" />
                    }
                    </div>

                    <div className="row w-100 pb-3 mx-0" style={{display: "block"}} >
                    <p className=""> {isreviewed.content}</p>
                  </div>
                </div>
                
                  </div>
                  <div className=" mx-auto pl-3 ">
                  <button type="button " onClick={handelShowEdit} className="btn btn-warning mx-1">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </button>
                  <button type="button " onClick={e => setisshowdeletereview(true)} className="btn btn-danger mx-1">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                  </div>
                </div>
                <Modal show={isshowdeletereview}>
                <Modal.Header>Bạn muốn xóa bài đánh giá này.</Modal.Header>
                
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={e=>setisshowdeletereview(false)} >Hủy bỏ</button>
                    
                        <button type="button" className="btn btn-success" onClick={handeldeleteReview} >Delete</button>   
                    
                </Modal.Footer>
            </Modal>
            <Modal show={isshoweditreview}>
            <Modal.Header>Chỉnh sửa review của bạn.</Modal.Header>
            <Modal.Body>
            <div className="col mt-2">
            <div className="form-outline text-left ">
            <label className="form-label"  style={{display: "block"}} htmlFor="form6Example1">Đánh Giá: {
                numberStar === 1?
                <p style={{display: "inline"}} className="text-danger"> Không thích</p>:
                numberStar ===2?
                <p style={{display: "inline"}} className="text-danger"> Tạm được</p>:
                numberStar ===3?
                <p style={{display: "inline"}} className="text-warning"> Bình thường</p>:
                numberStar ===4?
                <p style={{display: "inline"}} className="text-success"> Hài lòng</p>:
                <p style={{display: "inline"}} className="text-success"> Tuyện vời.</p>
            }</label>
           <div  style={{display: "inline"}}>
           <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(1)} style={{fontSize: "30px"}} aria-hidden="true" />
           </div>
           <div  style={{display: "inline"}}>
           {
               numberStar===1?
               <i className="fa fa-star mr-1 text-muted" onMouseOver={e => setnumberStar(2)} style={{fontSize: "30px"}} aria-hidden="true" />:
               <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(2)} style={{fontSize: "30px"}} aria-hidden="true" />
           }
          
           </div>
           <div  style={{display: "inline"}}>
           {
               numberStar < 3?
               <i className="fa fa-star mr-1 text-muted" onMouseOver={e => setnumberStar(3)} style={{fontSize: "30px"}} aria-hidden="true" />:
               <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(3)} style={{fontSize: "30px"}} aria-hidden="true" />
           }
          
           </div>
           <div  style={{display: "inline"}}>
           {
               numberStar < 4?
               <i className="fa fa-star mr-1 text-muted" onMouseOver={e => setnumberStar(4)} style={{fontSize: "30px"}} aria-hidden="true" />:
               <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(4)} style={{fontSize: "30px"}} aria-hidden="true" />
           }
          
           </div>
           <div  style={{display: "inline"}}>
           {
               numberStar < 5?
               <i className="fa fa-star mr-1 text-muted" onMouseOver={e => setnumberStar(5)} style={{fontSize: "30px"}} aria-hidden="true" />:
               <i className="fa fa-star mr-1 text-warning" onMouseOver={e => setnumberStar(5)} style={{fontSize: "30px"}} aria-hidden="true" />
           }
          
           </div>
           
        
            </div>
        </div>
                <div className="col mt-2">
                    <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1">Nội dung</label>
                        <input type="text" value={contentreview} onChange={e => setcontentreview(e.target.value)}  className="form-control" placeholder="..." />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={e=>setisshoweditreview(false)} >Hủy bỏ</button>
                {
                    contentreview?
                    <button type="button" className="btn btn-success" onClick={handelEditReview} >Đánh giá</button>
                    :<button type="button" disabled className="btn btn-success"  >Đánh giá</button>
                }
            </Modal.Footer>
        </Modal>
                


               
              </div>:
                null
            }
             
              {/* Review by user */}
              {datareview.length !== 0?
                datareview.map(review =>{if(review !== isreviewed){return(<ItemReview review={review} key={review._id}/>)}}):
                <h5>Chưa có review nào</h5>
            }
             
              
            </div>
          </div>
        </div>
      </div>
            <Footer />
        <ToastContainer />

        </div>

    );
}

export default DetailTourPage;