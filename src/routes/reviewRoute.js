const express = require("express")

const {
    createReview,
    deleteReviewById,
    getAllReviews,
    getReviewsByIdTour
} = require("../controllers/reviewController")

const {
    authAdminAndStaff,
    authAdminOnly,
    authLogged,
    authAdminOrAsAUser
} = require("../middlewares/auth")

const Router = express.Router()


Router.post("/:id_tour", authLogged, createReview)
      .delete("/:id_review", authAdminAndStaff,  deleteReviewById)
      .get("/:id_tour", getReviewsByIdTour)
      .get("/", getAllReviews)

module.exports = Router
