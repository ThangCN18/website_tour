const mongoose = require("mongoose")
const Tours = require("./TourModel")

const tourTripSchema = mongoose.Schema({
    id_tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Tours
    },
    departure_day: {
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    quantity_booked : {
        type: Number,
        default: 0
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("TourTrips", tourTripSchema)