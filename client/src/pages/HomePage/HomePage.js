import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ListTourSea from "../../components/ListTourSea/ListTourSea";
import Slide from "../../components/Slide/Slide";

function HomePage() {
    return ( 
        <div>
        <Header liItem="home"/>
        <Slide/>
        <h1 className="text-center my-5 text-success">Sea Tours</h1>
        <ListTourSea/>
        <Footer/>
        </div>
     );
}

export default HomePage;