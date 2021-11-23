const mongoose = require ("mongoose");
const mysql = require("mysql")

module.exports = function(){  mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => console.log('Database connected!'))
    .catch(() => console.error('Database error'))
}

// Comment by Abdurashid