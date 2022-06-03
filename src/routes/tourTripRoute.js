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

    isLoggedIn,
    restrictTo
} = require("../middlewares/auth")

const Router = express.Router()

Router.get("/yetdeparted/:id_tour", getTourTripsByIdTourNotYetDeparted)
      .get("/tour/:id_tour", getTourTripsByIdTour)
      .get("/:id_tour_trip", getTourTripsById)
      .patch("/:id_tour_trip", isLoggedIn, restrictTo("admin", "staff"), updateTourTripById)
      .delete("/:id_tour_trip", isLoggedIn, restrictTo("admin", "staff"), deleteTourTripById)
      .post("/:id_tour", isLoggedIn, restrictTo("admin", "staff"), createTourTrip)

module.exports = Router
