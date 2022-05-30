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
    authAdminAndStaff,
    authAdminOnly,
    authLogged,
    authAdminOrAsAUser
} = require("../middlewares/auth")

const Router = express.Router()

Router.patch("/status/:id_book_tour", authLogged, updateStatusBookTour)
      .patch("/quantity/:id_book_tour", authLogged, updateQuantityBookTour)
      .post("/:id_tour_trip", authLogged, createBookTour)
      .delete("/:id_book_tour", authAdminAndStaff, deleteBookTourById)
      .get("/", authAdminAndStaff, getAllBookTour)
      .get("/user/:id_user", authAdminOrAsAUser, getBookTourByIdUser)

module.exports = Router