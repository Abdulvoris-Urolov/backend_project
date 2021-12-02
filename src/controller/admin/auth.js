// const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../../models/auth");
const jwt = require("jsonwebtoken");
// signin
const signin = async (req, res) => {
  try {
    console.log("Mana ishlayabdi");
    // validatsiya qilish
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
    // emailni tekshirish
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Email xato!!!")
    }else{
      let password = await user.authentification (
        req.body.password
      )
      console.log(`${password} password`);
      console.log(`${user.password} chiqdi`);
      if (!password) {
        return res.status(400).send("Parol xato!!!");
      }

      let role = await user.authentification (
        req.body.role
      )
      console.log(`${role} role`);
      console.log(`${user.role} chiqdi`);
      if (!role) {
        return res.status(400).send("role xato!!!");
      }
      


      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: `1h` });
      res.header('authorization', token).send("Salom Xush kelibsiz");
    }


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
