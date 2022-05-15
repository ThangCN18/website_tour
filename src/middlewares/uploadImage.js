
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/images")
    },
    filename: function(req, file, cb){
        const newfilename = Date.now() + "-"+file.originalname
        cb(null, newfilename)
    },
})

const uploadImage = multer({
    storage: storage
})

module.exports = uploadImage