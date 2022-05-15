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
} = require("../controllers/userController")
const {
    authAdminAndStaff,
    authAdminOnly,
    authLogged,
    authAdminOrAsAUser
} = require("../middlewares/auth")
const Router = express.Router()

Router.post("/register", register)
      .post("/login", login)
      .get("/:id_user", authAdminOnly, getUserById)
      .patch("/:id_user", authAdminOrAsAUser, updateUserById)
      .patch("/role/:id_user", authAdminOnly, updateRoleUserById)
      .patch("/image/:id_user", authAdminOrAsAUser, uploadImage.single("image_user"), addImageUserById)
      .delete("/:id_user", authAdminOnly, deleteUserById)
      .get("/", authAdminOnly, getAllUsers)

module.exports = Router
