const mongoose = require("mongoose")
const Tours = require("./TourModel")
const Users = require("./UserModel")

const reviewSchema = mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Users
    },
    id_tour: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Tours
    },
    number_star: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Reviews", reviewSchema)