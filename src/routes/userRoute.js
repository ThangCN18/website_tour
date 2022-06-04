const express = require("express")
const uploadImage = require("../middlewares/uploadImage")
const {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUserById,
    addImageUserById,
    updateRoleUserById,
    deleteUserById,
    updatePass
} = require("../controllers/userController")
const {
    isLoggedIn,
    restrictTo
} = require("../middlewares/auth")

const Router = express.Router()

Router.post("/register", register)
      .post("/login", login)
      .get("/:id_user", isLoggedIn, restrictTo("admin"), getUserById)
      .patch("/update-pass/:id_user", isLoggedIn, updatePass)
      .patch("/:id_user", isLoggedIn, updateUserById)
      .patch("/role/:id_user", isLoggedIn, restrictTo("admin"), updateRoleUserById)
      .patch("/image/:id_user", isLoggedIn, uploadImage.single("image_user"), addImageUserById)
      .delete("/:id_user", isLoggedIn, restrictTo("admin"), deleteUserById)
      .get("/", isLoggedIn, restrictTo("admin"), getAllUsers)
      

module.exports = Router
