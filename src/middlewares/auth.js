const jwt = require("jsonwebtoken")


const authAdminOnly = async (req, res, next) => {
    const token = req.headers.token.split(" ")[1]
    if(!token){
        return res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            if(user.role === "admin"){
                next()
            }else{
                return res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}

const authAdminAndStaff = async (req, res, next) => {
    const token = req.headers.token.split(" ")[1]
    if(!token){
        return res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            if(user.role === "admin" || user.role === "staff"){
                next()
            }else{
                return res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}

const authAdminOrAsAUser = async (req, res, next) => {
    const token = req.headers.token.split(" ")[1]
    if(!token){
        return res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            if(user.role === "admin" || user._id === req.params.id_user){
                next()
            }else{
                return res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}


const authLogged = async (req, res, next) => {
    const token = req.headers.token.split(" ")[1]
    if(!token){
        return res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            if(user){
                next()
            }else{
                return res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}


module.exports = {
    authAdminAndStaff,
    authAdminOnly,
    authLogged,
    authAdminOrAsAUser,
    
}