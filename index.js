const express = require("express");
const app = express();
const auth = require('./src/routes/auth');
require("./src/database/db")();

app.use(express.json());
app.use('/api', auth );

app.get('/', (req, res) =>{
  res.send('Backend_Project connected!');
});

console.log('Abdulvoris');
app.listen("2000", () => {
  console.log(`2000-port connected!`);
});