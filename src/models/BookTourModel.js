const mongoose = require("mongoose")
const Users = require("./UserModel")
const TourTrips = require("./TourTripModel")

const bookTourSchema = mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Users
    },
    id_tour_trip: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: TourTrips
    },
    quantity:{
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    status: {
        type: String,
        enum: ["booking", "cancel", "complete", "paid"],
        default: "booking"
    },
    reason: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("BookTours", bookTourSchema)