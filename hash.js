const bcrypt = require('bcrypt');

async function getSalt(){
  const salt = await bcrypt.genSalt();
  console.log(salt);
}
getSalt();