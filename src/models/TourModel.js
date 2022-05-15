const mongoose = require("mongoose")

const tourSchema = mongoose.Schema({
    name_tour: {
        type: String,
        required: true
    },
    departure_place: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total_quantity: {
        type: Number,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content_tour: {
        type: String,
        required: true
    },
    category: {
        type: Array
    },
    url_image: {
        type: String,
        required: true
    },

},
{
    timestamps: true
})

module.exports = mongoose.model("Tours", tourSchema)