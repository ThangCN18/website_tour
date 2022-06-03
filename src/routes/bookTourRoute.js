const express = require("express")
const {
    createBookTour,
    deleteBookTourById,
    getAllBookTour,
    updateQuantityBookTour,
    updateStatusBookTour,
    getBookTourByIdUser
} = require("../controllers/bookTourController")

const {
    isLoggedIn,
    restrictTo
} = require("../middlewares/auth")

const Router = express.Router()

Router.patch("/status/:id_book_tour", isLoggedIn, updateStatusBookTour)
      .patch("/quantity/:id_book_tour", isLoggedIn, updateQuantityBookTour)
      .post("/:id_tour_trip", isLoggedIn, createBookTour)
      .delete("/:id_book_tour", isLoggedIn, restrictTo("admin", "staff"), deleteBookTourById)
      .get("/", isLoggedIn, restrictTo("admin", "staff"), getAllBookTour)
      .get("/user/:id_user", isLoggedIn, getBookTourByIdUser)

module.exports = Router