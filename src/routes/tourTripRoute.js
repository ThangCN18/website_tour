const express = require("express")

const {
    createTourTrip,
    getTourTripsById,
    deleteTourTripById,
    getTourTripsByIdTour,
    updateTourTripById,
    getTourTripsByIdTourNotYetDeparted
} = require("../controllers/tourTripController")

const {
    authAdminAndStaff,
    authAdminOnly,
    authLogged,
    authAdminOrAsAUser
} = require("../middlewares/auth")

const Router = express.Router()

Router.get("/yetdeparted/:id_tour", getTourTripsByIdTourNotYetDeparted)
      .get("/tour/:id_tour", getTourTripsByIdTour)
      .get("/:id_tour_trip", getTourTripsById)
      .patch("/:id_tour_trip", authAdminAndStaff, updateTourTripById)
      .delete("/:id_tour_trip", authAdminAndStaff, deleteTourTripById)
      .post("/:id_tour", authAdminAndStaff, createTourTrip)

module.exports = Router
