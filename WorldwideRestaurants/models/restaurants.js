const mongoose = require('mongoose')
const Schema = mongoose.Schema


// const restaurantSchema = new Schema({
//     name: String
// })

module.exports = mongoose.model('restaurant', restaurantSchema)