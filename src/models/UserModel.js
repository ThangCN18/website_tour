const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    id_card: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    number_phone: {
        type: String,
        required: true
    },
    url_image: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["customer", "staff", "admin"],
        default: "customer"
    },

},
{
    timestamps: true
}
)

module.exports = mongoose.model("Users", userSchema)