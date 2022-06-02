import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

import axios from "axios";
import {useDispatch, useSelector } from "react-redux";
import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../../redux/constants/notifyConstant"



function AdminAddTour() {
    const [nametour, setnametour] = useState("");
    const [departureplace, setdepartureplace] = useState("");
    const [destination, setdestination] = useState("");
    const [price, setprice] = useState(1000000);
    const [quantity, setquantity] = useState(10);
    const [schedule, setschedule] = useState("");
    const [description, setdescription] = useState("");
    const [contenttour, setcontenttour] = useState("");
    const [category, setcategory] = useState("Tour Tham Quan");
    const [imagetour, setimagetour] = useState(null);
    const user = useSelector(state => state.user.data) 
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const handleCreateNewTour = async (e)=>{
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
        console.log(nametour, departureplace, destination, price, quantity, schedule, description, contenttour, category)
        console.log(fd)

        const token = {token: "baner " + user.token}
        try {
            await axios({
                method: 'POST',
                headers: token,
                url: "http://localhost:8000/tour/",
                data: fd
              }).then(result => {
                dispatch({ type: TURN_ON_NOTIFY, message: "You have successfully created a new tour!" })
                console.log("kalsmdaklsd")
                navigate('/admin')
            
              })
            
        } catch (error) {


        }
    }

    useEffect(() => {
        window.scrollTo(0, -document.body.scrollHeight);
    }, []);

    return (
        <div className="mx-auto container p-4 bg-light" >
            <Link to="/admin" style={{ textDecoration: "none", display: "inline", fontSize: "20px" }} className="text-success">{"<<Back"}</Link>
            <h2 style={{ display: "inline", marginLeft: "35%" }} className="text-success">Create New Tour</h2>
            <form onSubmit={handleCreateNewTour}>
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
                            <input type="file" required id="form6Example1aa" className="form-control" onChange={(e) =>setimagetour(e.target.files[0])} placeholder="Select Image File" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">Schedule</label>
                            <input type="text" required id="form6Example2sda" value={schedule} onChange={e => setschedule(e.target.value)}  className="form-control" placeholder="Total Quantity" />
                        </div>
                    </div>
                    
                </div>
                <button type="submit" className="btn btn-success btn-block mb-4">Create Tour</button>
            </form>
        </div>
    );
}

export default AdminAddTour;