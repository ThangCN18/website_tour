const express = require("express")
const uploadImage = require("../middlewares/uploadImage")
const {
    createTour,
    updateTourById,
    deleteTourById,
    getAllTour,
    getTourById,
    getTourByPage,
    getTourSlide,
    getTourSea,
    getTourNew,
    getTourForeign,
    getTourSearch,
    getToursByCategory
} = require("../controllers/tourController")

const {
isLoggedIn,
restrictTo
} = require("../middlewares/auth")

const Router = express.Router()

      
Router.get("/nui", getTourSlide)
      .get("/sea", getTourSea)
      .get("/category/:id_tour", getToursByCategory)
      .get("/new", getTourNew)
      .get("/search", getTourSearch)
      .get("/foreign", getTourForeign)
      .get("/:id_tour", getTourById)
      .patch("/:id_tour", isLoggedIn, restrictTo("admin", "staff"), uploadImage.single("image_tour"), updateTourById)
      .delete("/:id_tour", isLoggedIn, restrictTo("admin", "staff"), deleteTourById)
      .get("/pages/:page", getTourByPage)
      .get("/", getAllTour)
      .post("/", isLoggedIn, restrictTo("admin", "staff"), uploadImage.single("image_tour"), createTour)

module.exports = Router
