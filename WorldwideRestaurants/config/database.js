const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/worldwideRestaurants',{
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('connected', function(){
    console.log(`connected to Mongodb at ${db.host}:${db.port}`)
})