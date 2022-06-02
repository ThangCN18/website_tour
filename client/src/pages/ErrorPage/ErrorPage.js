import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import logo from '../../images/logo.png';


function ErrorPage() {
    return ( 
       <div>
       <Header/>
       <div className="text-center pt-5" style={{width: "100vw" , height: "50vh"}}>
       <img className='mr-3' src={logo}　style={{width: "70px"}}/>
       <Link to="/" style={{fontSize: "30px", fontWeight: "bold", color: "black", textDecoration: "none"}}>GoTour</Link>
       <h3 className='mt-2' style={{fontWeight: "bold"}}>Trang này không tồn tại</h3>
       <Link to="/"><h5 className='mt-2'>Quay lại</h5></Link>
       
       </div>
       <Footer/>
       </div>
     );
}

export default ErrorPage;