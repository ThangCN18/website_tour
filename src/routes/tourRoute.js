const express = require("express")
const uploadImage = require("../middlewares/uploadImage")
const {
    createTour,
    updateTourById,
    deleteTourById,
    getAllTour,
    getTourById,
    getTourByPage
} = require("../controllers/tourController")

const {
    authAdminAndStaff,
    authAdminOnly,
    authLogged,
    authAdminOrAsAUser
} = require("../middlewares/auth")

const Router = express.Router()

const middlewarUpdateImage = (req, res, next)=> {
    if(req.file.filename){
        uploadImage.single("image_tour")
    }else{
        next()
    }
}

Router.get("/:id_tour", getTourById)
      .patch("/:id_tour", authAdminAndStaff, middlewarUpdateImage, updateTourById)
      .delete("/:id_tour", authAdminAndStaff, deleteTourById)
      .get("/pages/:page", getTourByPage)
      .get("/", getAllTour)
      .post("/", authAdminAndStaff, uploadImage.single("image_tour"), createTour)

module.exports = Router
