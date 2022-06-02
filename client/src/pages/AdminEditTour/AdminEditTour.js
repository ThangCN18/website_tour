import { useState, useEffect } from "react";
import { Link, useNavigate, useParams} from "react-router-dom"

import axios from "axios";
import {useDispatch, useSelector } from "react-redux";
import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"

function AdminEditTour() {
    const [nametour, setnametour] = useState("");
    const [departureplace, setdepartureplace] = useState("");
    const [destination, setdestination] = useState("");
    const [price, setprice] = useState(1000000);
    const [quantity, setquantity] = useState(10);
    const [schedule, setschedule] = useState("");
    const [description, setdescription] = useState("");
    const [contenttour, setcontenttour] = useState("");
    const [category, setcategory] = useState("Tour Trong Nước");
    const [imagetour, setimagetour] = useState(null);
    const [onchangeimg, setonchangeimg] = useState(false)
    const user = useSelector(state => state.user.data) 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id_tour } = useParams()

    useEffect( () => {
        window.scrollTo(0, -document.body.scrollHeight);
        axios({
            method: 'get',
            url: "http://localhost:8000/tour/"+id_tour+"/",
          }).then(result => {
            const tour = result.data.tour
            setnametour(tour.name_tour)
            setdepartureplace(tour.departure_place)
            setdestination(tour.destination)
            setprice(tour.price)
            setquantity(tour.total_quantity)
            setschedule(tour.schedule)
            setdescription(tour.description)
            setcontenttour(tour.content_tour)
            setcategory(tour.category)
            console.log(tour)

          }).catch(error => {
            console.log(error)
          })
        
    }, []);

    const handleEditATour = async (e)=>{
        e.preventDefault();
        let file = imagetour
        let fd = new FormData()
        fd.append('image_tour', file)
        
        fd.append('name_tour', nametour)
        fd.append('departure_place', departureplace)
        fd.append('destination', destination)
        fd.append('price', price)
        fd.append('total_quantity', quantity)
        fd.append('schedule', schedule)
        fd.append('description', description)
        fd.append('content_tour', contenttour)
        fd.append('category', category)



        const token = {token: "baner " + user.token}
        try {
            await axios({
                method: 'PATCH',
                headers: token,
                url: "http://localhost:8000/tour/"+ id_tour+"/",
                data: fd
              }).then(result => {
                dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully update tour!" })
                navigate('/admin')
              })
        } catch (error) {
        }
    }

    return ( 
        <div className="mx-auto container p-4 bg-light">
        <Link to="/admin" style={{ textDecoration: "none", display: "inline", fontSize: "20px" }} className="text-warning">{"<<Back"}</Link>
        <h2 style={{ display: "inline", marginLeft: "40%" }} className="text-warning">Edit Tour</h2>
        <form onSubmit={handleEditATour}>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form6Example3">Name Tour</label>
                <input type="text" required id="form6Example3" value={nametour} onChange={e => setnametour(e.target.value)} className="form-control" placeholder="Name Tour" />
            </div>
            {/* 2 column grid layout with text inputs for the first and last names */}
            <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1">Departure Place</label>
                        <input type="text" required id="form6Example1" value={departureplace} onChange={e => setdepartureplace(e.target.value)}  className="form-control" placeholder="Departure Place" />
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">Destination</label>
                        <input type="text" required id="form6Example2" value={destination} onChange={e => setdestination(e.target.value)}  className="form-control" placeholder="Destination" />
                    </div>
                </div>
            </div>
            {/* Text input */}
            <div className="row mb-4">
                <div className="col-4">
                    <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1">Price</label>
                        <input type="Number" required id="form6Example33" value={price} onChange={e => setprice(e.target.value)}  className="form-control" placeholder="Price" />
                    </div>
                </div>
                <div className="col">
                    <label className="form-label" htmlFor="form6Example133">Category</label>
                    <select class="form-control" id="exampleFormControlSelect1" value={category} onChange={e => setcategory(e.target.value)}>
                        <option value="Tour Trong Nước">Tour Trong Nước</option>
                        <option value="Tour Tham Quan">Tour Tham Quan</option>
                        <option value="Tour Nghỉ Dưỡng">Tour Nghỉ Dưỡng</option>
                        <option value="Tour Biển Đảo">Tour Biển Đảo</option>
                        <option value="Tour Leo Núi">Tour Leo Núi</option>
                        <option value="Tour Nước Ngoài">Tour Nước Ngoài</option>
                    </select>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">Total Quantity</label>
                        <input type="number" required id="form6Example2sd" value={quantity} onChange={e => setquantity(e.target.value)}  className="form-control" placeholder="Total Quantity" />
                    </div>
                </div>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form6Example4">Description</label>
                <input type="text" required id="form6Example43" value={description} onChange={e => setdescription(e.target.value)}  className="form-control" />
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form6Example7">Content Tour</label>
                <textarea className="form-control" required id="form6Example733" value={contenttour} onChange={e => setcontenttour(e.target.value)}  rows={4} defaultValue={""} />
            </div>
            <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">

                        <label className="form-label" htmlFor="form6Example1">Image File</label>
                        <input type="file"  id="form6Example1aa" className="form-control" onChange={(e) =>{setimagetour(e.target.files[0]); setonchangeimg(true)}} placeholder="Select Image File" />
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">Schedule</label>
                        <input type="text" required id="form6Example2sda" value={schedule} onChange={e => setschedule(e.target.value)}  className="form-control" placeholder="Total Quantity" />
                    </div>
                </div>
                
            </div>
            <button type="submit" className="btn btn-warning btn-block mb-4">Edit Tour</button>
        </form>
    </div>
     );
}

export default AdminEditTour;