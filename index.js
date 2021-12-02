const express = require("express");
const app = express();
const signup = require('./src/routes/auth');
const signin = require('./src/routes/auth');
const admin = require('./src/routes/admin/auth');
require("./src/database/db")();
require("dotenv").config();
// const config = require('config');

// if (!config.get('jwtPrivateKey')) {
//   console.error('jwt muhit aniqlanmagan');
//   process.exit(1);
// }

app.use(express.json());
app.use('/api', signup);
app.use('/api', signin);
app.use('/admin', admin);

app.get('/', (req, res) =>{
  res.send('Backend_Project connected!');
});

console.log('Abdulvoris');
app.listen("2000", () => {
  console.log(`2000-port connected!`);
});