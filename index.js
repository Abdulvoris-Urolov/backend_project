const mongoose = require ("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { body, validationResult } = require('express-validator');
const userRoutes = require('./src/routes/auth');
const userSchema = require('./src/models/auth')
const dataBase = require('./src/database/db');
dotenv.config()

// mongoose.connect(process.env.MONGODB_URL, {})
//   .then(() => console.log('Database connected!'))
//   .catch(() => console.error('Database error'))


app.use(express.json());
console.log('Abdulvoris');

app.get('/', (req, res) =>{
  res.send('Backend_Project connected!');
});


app.use('/api', userRoutes);
app.use('/api', userSchema);
app.use('/', dataBase);
    






app.listen("2000", (req, res) =>{
  console.log(`2000-port connected!`);
});