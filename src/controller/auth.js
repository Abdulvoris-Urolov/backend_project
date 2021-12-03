const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/auth");
// signup
const signup = async (req, res) => {
  // validatsiya qilish
  const { error } = validateUser(req.body);
    if (error) {
      return res.status(404).send(error.message);
    }
  // email boyicha tekshirish
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Bu email oldin ro`yxatdan o`tgan");
  // yangi user qoshish
  // passwordni 
    let {
      firstName,
      lastName,
      email,
      password,
      role
    } = req.body

    let hash_password =await bcrypt.hash(password, 10)

    let  newUser = new User({
      firstName,
      lastName,
      email,
      hash_password,
      role
    });
    newUser.save((error, data) =>{
      if(error){
        console.log(error);
        return res.status(400).json({message: "User saqlanmadi"})
      }
  
      if(data){
        return res.status(201).json({message: "user saqlandi"})
      }
    })}


function validateUser(user) {
  try {
    const userSchema = Joi.object({
      firstName: Joi.string().min(3).max(20).required(),
      lastName: Joi.string().min(3).max(20).required(),
      userName: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(4).required(),
      // role: Joi.string().boolean().required(),
      // timestamps: Joi.boolean().required(),
    });
    return userSchema.validate(user);
  } catch (error) {
    console.log("5 error");
  }
}

module.exports = signup;