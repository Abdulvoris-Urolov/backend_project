const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/auth");
const jwt = require("jsonwebtoken");
const config = require('config');
// signin
const signin = async (req, res) => {
  try {
    console.log("Mana ishlayabdi");
    // validatsiya qilish
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
    // emailni tekshirish
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email xato!!!");
    // hash passni tekshirish
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Parol xato!!!");
    }
    // token berish
    // const token = user.generateAuthToken();
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' });
    res.header('authorization', token).send("Salom Xush kelibsiz");
  } catch (error) {
    console.log(error);
  }
}

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = signin;
