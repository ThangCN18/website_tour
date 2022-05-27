const express = require("express")
const uploadImage = require("../middlewares/uploadImage")
const {
    createTour,
    updateTourById,
    deleteTourById,
    getAllTour,
    getTourById,
    getTourByPage,
    getTourSlide
} = require("../controllers/tourController")

const {
    authAdminAndStaff,
    authAdminOnly,
    authLogged,
    authAdminOrAsAUser
} = require("../middlewares/auth")

const Router = express.Router()

      
Router.get("/nui", getTourSlide)
      .get("/:id_tour", getTourById)
      .patch("/:id_tour", authAdminAndStaff, uploadImage.single("image_tour"), updateTourById)
      .delete("/:id_tour", authAdminAndStaff, deleteTourById)
      .get("/pages/:page", getTourByPage)
      .get("/", getAllTour)
      .post("/", authAdminAndStaff, uploadImage.single("image_tour"), createTour)

module.exports = Router
