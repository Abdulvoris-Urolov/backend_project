const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

<<<<<<< HEAD
module.exports = function() {
    mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => console.log('Database connected!'))
    .catch(() => console.error('Database error'))
}

=======
module.exports = function () {
  mongoose
    .connect(process.env.MONGODB_URL, {})
    .then(() => console.log("Database connected!"))
    .catch(() => console.error("Database ERROR"));
};
>>>>>>> ba22ccd349610108ae82a61f7a427e671a88667d
