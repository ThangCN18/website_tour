const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")


const authAdminOnly = async (req, res, next) => {
    const token = req.headers.token.split(" ")[1]
    if(!token){
         res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            
            if(user.role === "admin"){
                next()
            }else{
                 res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
             res.status(401).json({message: "Invalid Token"});
        }
    }
}

const authAdminAndStaff = async (req, res, next) => {
    const token = req.headers.token.split(" ")[1]

    if(!token){
         res.status(403).json({message: "Pleace Login"})
    }else{
        try{
            const user = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            if(user.role === "admin" || user.role === "staff"){
                next()
            }else{
                 res.status(401).json({message: "You do not have this right"});
            }
        }catch (error) {
             res.status(401).json({message: "Invalid Token"});
        }
    }
}

const authAdminOrAsAUser = async (req, res, next) => {
    const token = req.headers.token.split(" ")[1]
    if(!token){
         res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            console.log(user)
            if(user.role === "admin" || user.id === req.params.id_user){
                next()
            }else{
                 res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
             res.status(401).json({message: "Invalid Token"});
        }
    }
}


const authLogged = async (req, res, next) => {
    const token = req.headers.token.split(" ")[1]
    if(!token){
         res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            if(user){
                next()
            }else{
                 res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
             res.status(401).json({message: "Invalid Token"});
        }
    }
}


module.exports = {
    authAdminAndStaff,
    authAdminOnly,
    authLogged,
    authAdminOrAsAUser,
    
}