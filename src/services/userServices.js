const { createUser, findUser } = require("../repositories/userRepository");

  
    async function registerUser(userDetails){
      //it will created a brand new user in a db

      //you need to check if the user with this email and mobile number

      const User= await findUser({
        email: userDetails.email,
        mobilNumber: userDetails.mobilNumber,

      })

      if(User){
        throw {reason: "User with the given email and mobile number already exist", statusCode: 400}
      }

      //if not then the create user in the  database

      const newUser=await createUser({ 
        email:userDetails.email,
        password:userDetails.password,
        firstName:userDetails.firstName,
        lastName:userDetails.lastName,
        mobilNumber:userDetails.mobilNumber
      })

      if(!newUser){
        throw {reason: 'Something went worng, connot create user', statusCode: 500}
      }

      //return the details of create user

      return newUser;
    }
 

module.exports={
  registerUser,
};