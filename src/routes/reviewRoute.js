const express = require("express")

const {
    createReview,
    deleteReviewById,
    getAllReviews,
    getReviewsByIdTour,
    editReviewById
} = require("../controllers/reviewController")

const {
    authAdminAndStaff,
    authAdminOnly,
    authLogged,
    authAdminOrAsAUser,
    authAdminOrStaffOrAsAUser
} = require("../middlewares/auth")

const Router = express.Router()


Router.post("/:id_tour", authLogged, createReview)
      .delete("/:id_review", authLogged,  deleteReviewById)
      .patch("/:id_review", authLogged, editReviewById)
      .get("/:id_tour", getReviewsByIdTour)
      .get("/", getAllReviews)

module.exports = Router
