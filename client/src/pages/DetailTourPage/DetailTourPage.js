import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ItemTour from "../../components/ItemTour/ItemTour";

import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"


function DetailTourPage() {

    const [tour, setTour] = useState(null);
    const [dataTours, setDataTours] = useState(null);
    const [tourtripch, settoutripch] = useState(null)
    const [datatourtrip, setdatatourtrip] = useState(null)
    const [numberbook, setnumberbook] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data) 


    const [isShow, setIsShow] = useState(false);

    const { id_tour } = useParams()


    useEffect(() => {
        window.scrollTo(0, -document.body.scrollHeight);

        const url = "http://localhost:8000/tour/" + id_tour

        axios({
            method: "get",
            url: url,

        }).then(result => {
            const a = result.data.tour
            setTour(a)
            const urrl = "http://localhost:8000/tour/category/" + id_tour
            axios({
                method: "post",
                url: urrl,
                data: { category: a.category }

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
        })

        


    }, [id_tour]);


    const handelBooking = (e)=>{
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
                                            <label className="form-label mt-3" htmlFor="form6Example133">Lượng chọn chuyến đi</label>

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
            <Footer />
        </div>

    );
}

export default DetailTourPage;