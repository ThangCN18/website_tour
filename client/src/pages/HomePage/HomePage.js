import {useEffect} from "react"
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ListForeignTour from "../../components/ListForeignTour/ListForeignTour";
import ListTourSea from "../../components/ListTourSea/ListTourSea";
import NewTourItem from "../../components/NewTourItem/NewTourItem";
import Slide from "../../components/Slide/Slide";


function HomePage() {
    useEffect(() => {
        window.scrollTo(0, -document.body.scrollHeight);
        
    }, []);
    
    return ( 
        <div>
        <Header liItem="home"/>
        <Slide/>
        <h1 className="text-center my-5" style={{color: "#038024"}}>Sea Tours</h1>
        <ListTourSea/>
        <NewTourItem/>
        <h1 className="text-center my-5" style={{color: "#038024"}}>Foreign Tours</h1>
        <ListForeignTour/>
        <Footer/>
        </div>
     );
}

export default HomePage;