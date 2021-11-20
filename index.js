const mongoose = require ("mongoose");
const dotenv = require("dotenv");
dotenv.config()

mongoose.connect(process.env.MONGODB_URL, {})
  .then(() => console.log('Database connected!'))
  .catch(() => console.error('Database error'))