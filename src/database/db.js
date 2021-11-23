const mongoose = require ("mongoose");
// wwww by Abdulvoris
const www = require("www")

module.exports = function(){  mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => console.log('Database connected!'))
    .catch(() => console.error('Database error'))
}