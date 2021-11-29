const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/auth");
// // // signin
async function signin(req, res) {
  try {
    console.log('mana ishlayabdi');
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send('Email xato!!!');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword){
      return res.status(400).send('Parol xato!!!');
    }
    // const token = user.generateAuthToken();
    res/*.header('x-auth-token', token)*/.send("Siz kirdingiz");
  } catch (error) {
    console.log(error);
  }
}
  
  function validate(req) {
      const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
      });
    
      return schema.validate(req);
    }

module.exports = signin;