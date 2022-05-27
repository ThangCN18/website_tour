import { Route, Routes } from "react-router-dom"
import './App.css';
import AdminAddTour from "./pages/AdminAddTour/AdminAddTour";
import AdminEditTour from "./pages/AdminEditTour/AdminEditTour";
import AdminPage from "./pages/AdminPage/AdminPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AdminTourTrip from "./pages/AdminTourTrip/AdminTourTrip";



function App() {
  return (
    <div >
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminPage/>} />
      <Route path="/admin/add-tour" element={<AdminAddTour/>} />
      <Route path="/admin/edit/:id_tour" element={<AdminEditTour/>} />
      <Route path="/admin/tour-trip/:id_tour" element={<AdminTourTrip/>} />

      <Route path="*" element={<ErrorPage/>}/>

    </Routes>
  </div>
  );
}

export default App;
