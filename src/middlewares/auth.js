const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")
// const { default: mongoose } = require("mongoose")


// const authAdminOnly = async (req, res, next) => {
//     const token = req.headers.token.split(" ")[1]
//     if(!token){
//          res.status(403).json({message: "Pleace Login"})
//     }else{
//         try {
//             const user = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

//             if(user.role === "admin"){
//                 next()
//             }else{
//                  res.status(401).json({message: "You do not have this right"});
//             }
//         } catch (error) {
//              res.status(401).json({message: "Invalid Token"});
//         }
//     }
// }

// const authAdminAndStaff = async (req, res, next) => {
//     const token = req.headers.token.split(" ")[1]

//     if(!token){
//          res.status(403).json({message: "Pleace Login"})
//     }else{
//         try{
//             const user = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
//             if(user.role === "admin" || user.role === "staff"){
//                 next()
//             }else{
//                  res.status(401).json({message: "You do not have this right"});
//             }
//         }catch (error) {
//              res.status(401).json({message: "Invalid Token"});
//         }
//     }
// }



// const authAdminOrAsAUser = async (req, res, next) => {
//     const token = req.headers.token.split(" ")[1]
//     if(!token){
//          res.status(403).json({message: "Pleace Login"})
//     }else{
//         try {
//             const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

//             if(user.role === "admin" || user.id === req.params.id_user){
//                 next()
//             }else{
//                  res.status(401).json({message: "You do not have this right"});
//             }
//         } catch (error) {
//              res.status(401).json({message: "Invalid Token"});
//         }
//     }
// }

// const authAdminOrStaffOrAsAUser = async (req, res, next) => {
//     const token = req.headers.token.split(" ")[1]
//     if(!token){
//          res.status(403).json({message: "Pleace Login"})
//     }else{
//         try {
//             const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

//             if(user.role === "admin" || user.role === "staff"  || user.id === req.params.id_user){
//                 next()
//             }else{
//                  res.status(401).json({message: "You do not have this right"});
//             }
//         } catch (error) {
//              res.status(401).json({message: "Invalid Token"});
//         }
//     }
// }


// const authLogged = async (req, res, next) => {
//     const token = req.headers.token.split(" ")[1]
//     if(!token){
//          res.status(403).json({message: "Pleace Login"})
//     }else{
//         try {
//             const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
//             if(user){
//                 next()
//             }else{
//                  res.status(401).json({message: "You do not have this right"});
//             }
//         } catch (error) {
//              res.status(401).json({message: "Invalid Token"});
//         }
//     }
// }



const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.status(400).json({message: "You do not have this right"});
        }else{
            next()
        }
    };
};


const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.token.split(" ")[1]
        if (!token) {
            return res.status(400).json({ message: "Please log in!" })
        }
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        const user = await User.findById(decoded.id)
        if (user) {
            req.user = user;
            next()
        } else {
            return res.status(400).json({ message: "Please log in!" })
        }

    } catch (err) {
        return res.status(400).json({ message: "Please log in!" })
    }

};




module.exports = {
    // authAdminAndStaff,
    // authAdminOnly,
    // authLogged,
    // authAdminOrAsAUser,
    // authAdminOrStaffOrAsAUser,
    isLoggedIn,
    restrictTo
}