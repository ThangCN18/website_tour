const express = require("express")

const {
    createReview,
    deleteReviewById,
    getAllReviews,
    getReviewsByIdTour,
    editReviewById
} = require("../controllers/reviewController")

const {
   isLoggedIn,
   restrictTo
} = require("../middlewares/auth")

const Router = express.Router()


Router.post("/:id_tour", isLoggedIn, createReview)
      .delete("/:id_review", isLoggedIn,  deleteReviewById)
      .patch("/:id_review", isLoggedIn, editReviewById)
      .get("/:id_tour", getReviewsByIdTour)
      .get("/", isLoggedIn, restrictTo("admin", "staff"), getAllReviews)

module.exports = Router
