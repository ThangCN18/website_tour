import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import ItemTour from "../../components/ItemTour/ItemTour";
import Footer from "../../components/Footer/Footer";


function ToursPages() {

    const [departure_place, setdeparture_place] = useState("");
    const [category, setcategory] = useState("");
    const [value_price, setvalue_price] = useState(0);
    const [name_tour, setname_tour] = useState("");
    const [pages, setpages] = useState(0);
    const [message, setmessage] = useState(false);
    const [dataTours, setDataTours] = useState([])

    const [loading, setloading] = useState(false);


    useEffect(() => {
        window.scrollTo(0, -document.body.scrollHeight);

        setloading(true)

        axios({
            method: "post",
            url: "http://localhost:8000/tour/search",
            data: {
                departure_place: departure_place,
                category: category,
                value_price: value_price,
                name_tour: name_tour,
                pages: pages
            }
        }).then(result => {
            const a = result.data.tours
            setDataTours(a)
            setpages(6)
        setloading(false)

        })
        

    }, []);

    const hangdelLoadTour =()=> {

        setloading(true)
        
        axios({
            method: "post",
            url: "http://localhost:8000/tour/search",
            data: {
                departure_place: departure_place,
                category: category,
                value_price: value_price,
                name_tour: name_tour,
                pages: pages
            }
        }).then(result => {
            const a = result.data.tours
            const newData = dataTours.concat(a)
            setDataTours(newData)
            if(dataTours.length <= pages){
                setmessage(true)
            }
            const pagenew = pages + 6
            setpages(pagenew)
        setloading(false)

        })
    }

    
    const hangdelSearch = ()=> {

        setloading(true) 
        setmessage(false)
        const data ={
            departure_place: departure_place,
            category: category,
            value_price: value_price,
            name_tour: name_tour,
            pages: 0
        }       
        axios({
            method: "post",
            url: "http://localhost:8000/tour/search",
            data: data
        }).then(result => {
            const a = result.data.tours
            setDataTours(a)

            if(dataTours.length < 6){
                setmessage(true)
            }
            setpages(6)
        setloading(false)

        })
    }


    return (
        <div>
            <Header  liItem="tours"/>
            <div className=" mx-auto mt-2 mb-4 p-4 bg-success" style={{ width: "90%", borderRadius: "5px" }}>
                <h4>Search Tour</h4>
                <div className="row ">
                    <div className="col-12 col-md-6 col-xl-2">
                        <label className="form-label" htmlFor="form6Example133">Departure Place</label>
                        <select className="form-control" value={departure_place} onChange={e => setdeparture_place(e.target.value)}>
                            <option value="">All</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3">
                        <label className="form-label" htmlFor="form6Example133">Category</label>
                        <select className="form-control" value={category} onChange={e => setcategory(e.target.value)} >
                            <option value="">All</option>
                            <option value="Tour Tham Quan">Tour Tham Quan</option>
                            <option value="Tour Nghỉ Dưỡng">Tour Nghỉ Dưỡng</option>
                            <option value="Tour Biển Đảo">Tour Biển Đảo</option>
                            <option value="Tour Leo Núi">Tour Leo Núi</option>
                            <option value="Tour Nước Ngoài">Tour Nước Ngoài</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 col-xl-2">
                        <label className="form-label" htmlFor="form6Example133">Price</label>
                        <select className="form-control" value={value_price} onChange={e => setvalue_price(e.target.value)} >
                            <option value="0">All</option>
                            <option value="3">Dưới 3 triệu</option>
                            <option value="10">Từ 3 đến 10 triệu</option>
                            <option value="11">Trên 10 triệu</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 col-xl-4">
                        <label className="form-label" htmlFor="form6Example133">Name Tour</label>
                        <input type="text" className="form-control" placeholder="..." value={name_tour} onChange={e => setname_tour(e.target.value)} />
                    </div>

                    <div className="col-12 col-md-12 col-xl-1 my-4">
                        <button className="btn btn-primary mt-2 " onClick={hangdelSearch}>Search</button>
                    </div>

                </div>

            </div>

            {dataTours ?
            <div className="row mx-auto text-center container-fluid px-5" >
                {dataTours.map(tour => <ItemTour key={tour._id} tour={tour} />)}
            </div>:
            <div className="row mx-auto text-center container-fluid px-5" style={{ height: "100px", lineHeight: "100px" }} >
                <div className="spinner-border" style={{ marginLeft: "50%" }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>}

            {
                !loading?
                !message?
                <button style={{marginLeft:"48%"}} className="btn btn-success btn-lg mb-5" onClick={e =>{hangdelLoadTour()}}>Tải thêm</button>
                :<p className="text-center">hết mất rồi</p>:null
            }
            <Footer/>
        </div>
    );
}

export default ToursPages;