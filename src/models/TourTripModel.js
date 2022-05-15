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
},
{
    timestamps: true
})

module.exports = mongoose.model("TourTrips", tourTripSchema)