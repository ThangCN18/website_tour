const mongoose = require("mongoose")

const connect = async () =>{
    try {
        await mongoose.connect(process.env.URL_DB)
        console.log('Connect MongooDB success')
    } catch (error) {
        console.log('Connect MongooDB fail')
        console.log(`error: ${error}`)
    }
}
module.exports = { connect }