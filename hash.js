const bcrypt = require('bcrypt');

async function run(){
const salt =   await bcrypt.genSalt(10); //hacker cannot decrypt salt because they change every time they're called
const hashed = await bcrypt.hash('1234', salt); // password the salt to the hashed password to be able to decrypt it later on

   console.log(salt);
   console.log(hashed);
}

run();
