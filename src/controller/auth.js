const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("../models/auth");

const signup = async (req, res) => {
  // validatsiya qilish
  const { error } = validateUser(req.body);

  try {
    if (error) {
      return res.status(404).send(error.message);
    }
  } catch (error) {
    console.error("1 error");
  }
  // email boyicha tekshirish
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Bu email oldin ro`yxatdan o`tgan");
  } catch (error) {
    console.error("2 error");
  }
  // yangi user qoshish
  try {
    newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
  } catch (error) {
    console.error("3 error");
  }

  // passwordni hash lash
  try {
    let list = new User(req.body, [
      "firstName",
      "lastName",
      "userName",
      "email",
      "password",
    ]);
    const salt = await bcrypt.genSalt();
    list.password = await bcrypt.hash(list.password, salt);
    // token berish
    try {
      const token = jwt.sign({ _id: newUser._id }, "kalit");
      //  destructuring assignment
      let { userName, email } = list;
      // saqlash
      await list.save();
      // Va qaytarib berish
      res.header("x-auth-token", token).send({ userName, email });
    } catch (error) {
      console.error(error.message);
      console.error("5 xato");
    }
  } catch (error) {
    console.error(error.message);
    console.error("4 xato");
  }
};

// // // signin
// async function signin(req, res) {
//   try {
//     console.log('mana ishlayabdi');
//     const { error } = validate(req.body);
//     if (error)
//       return res.status(400).send(error.details[0].message);

//     let user = await User.findOne({ email: req.body.email });
//     if (!user)
//       return res.status(400).send('Email yoki parol xato');

//     const isValidPassword = await bcrypt.compare(req.body.password, User.password);
//     if (!isValidPassword)
//       return res.status(400).send('Email yoki parol xato0');

//     const token = user.generateAuthToken();
//     res.header('x-auth-token', token).send(true);
//   } catch (error) {
//     console.log(error);
//   }
// }
  
//   function validate(req) {
//       const schema = Joi.object({
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).max(255).required()
//       });
    
//       return schema.validate(req);
//     }
// // signup
function validateUser(user) {
  try {
    const userSchema = Joi.object({
      firstName: Joi.string().min(3).max(20).required(),
      lastName: Joi.string().min(3).max(20).required(),
      userName: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(4).required(),
      // role: Joi.string().boolean().required(),
      // timestamps: Joi.boolean().required()
    });
    return userSchema.validate(user);
  } catch (error) {
    console.log("5 error");
  }
}
// TODO sdadadfasfsf
module.exports = signup;
// module.exports = signin;
