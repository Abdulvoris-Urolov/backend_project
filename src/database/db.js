const mongoose = require ("mongoose");
const mysql = require("mysql")
// wwww by Abdulvoris
const www = require("www")

module.exports = function(){  mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => console.log('Database connected!'))
    .catch(() => console.error('Database error'))
}

// Comment by Abdurashid
// Comment second by Abdurashid

// sdfsdfsd
// dfsfgdfgdf