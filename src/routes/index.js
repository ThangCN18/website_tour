const userRoute = require("./userRoute")
const tourRoute = require("./tourRoute")
const tourTripRoute = require("./tourTripRoute")
const bookTourRoute = require("./bookTourRoute")
const reviewRoute = require("./reviewRoute")

const Router = (app)=>{
    app.use("/user", userRoute)
    app.use("/tour", tourRoute)
    app.use("/tourtrip", tourTripRoute)
    app.use("/booktour", bookTourRoute)
    app.use("/review", reviewRoute)
}

module.exports = Router