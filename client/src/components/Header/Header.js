import {Link, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { FETCH_LOGOUT } from "../../redux/constants/userConstant";
import logo from '../../images/logo.png';

function Header(props) {
    const liItem = props.liItem
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data) 
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch({ type: FETCH_LOGOUT })
        navigate("/")
      }
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" >
        <img className='ml-1' src={logo}　style={{width: "37px"}}/>

      <Link className="navbar-brand text-logo text-success ml-3 mr-5" to="/" style={{fontSize: "30px"}}  >
        GoTour
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        {liItem === "home" ?

          <ul className="navbar-nav mr-auto navbar_text">
            <li className="nav-item  active">
              <Link className="nav-link text-center" style={{fontSize: "20px"}} to="/">Home </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" style={{fontSize: "20px"}} to="/tours">Tours</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" style={{fontSize: "20px"}} to="/booking">Booking</Link>
            </li>
          </ul>
          :
          liItem === "tours"? 
          <ul className="navbar-nav mr-auto navbar_text">

            <li className="nav-item ">
              <Link className="nav-link  text-center "  style={{fontSize: "20px"}} to="/">Home </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link text-center" style={{fontSize: "20px"}} id="movies_page" to="/tours">Tours</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" style={{fontSize: "20px"}} to="/booking">Booking</Link>
            </li>
          </ul>:
          liItem === "booking"? 
          <ul className="navbar-nav mr-auto navbar_text">

            <li className="nav-item ">
              <Link className="nav-link  text-center "  style={{fontSize: "20px"}} to="/">Home </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link text-center" style={{fontSize: "20px"}} id="movies_page" to="/tours">Tours</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link text-center" style={{fontSize: "20px"}} to="/booking">Booking</Link>
            </li>
          </ul>:
          <ul className="navbar-nav mr-auto navbar_text">

            <li className="nav-item ">
              <Link className="nav-link  text-center "  style={{fontSize: "20px"}} to="/">Home </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link text-center" style={{fontSize: "20px"}} id="movies_page" to="/tours">Tours</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" style={{fontSize: "20px"}} to="/booking">Booking</Link>
            </li>
          </ul>
          
        }
        {user.user ?
            <ul className="navbar-nav navbar_text ">
                <li className="nav-item "> <p  className="mr-2 my-auto  pt-1 text-center" >Hello {user.user.fullname} !</p></li>
                {user.user.role ===  "admin" || user.user.role ===  "staff"?
                <Link className=" nav-item text-center mr-2 mb-2" to="/admin"><button type="button" id="login_page" className="btn btn-outline-success mt-0">Administrators</button></Link>
                :null}
                <li className="nav-item text-center"><button onClick={handleLogOut}  type="button" id="login_page" className="btn btn-outline-success mt-0 mx-auto">LogOut</button></li>
            </ul>
            

          : <ul className="navbar-nav navbar_text ">
          <li className="nav-item text-center">
          <Link className=" nav-item text-center" to="/login"><button type="button" id="login_page" className="btn btn-outline-success mt-0">Login</button></Link>
          </li>
      </ul>
          
          }
      </div>
    </nav>
        
     );
}

export default Header;