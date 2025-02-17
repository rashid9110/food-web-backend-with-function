const User=require('../schema/userSchema');
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/InternalServerError');



    async function findUser(parameters){

        try{
            const response=await User.findOne({...parameters});
            return response;
        }catch(error){
            console.log(error)
        }
    }

    async function createUser(userDetails){
        try{
            console.log(userDetails)
            const response=await User.create(userDetails)
            console.log(response)
            return response;
        }catch(error){
            console.error("Unexpected Error:", error);

            if (error.name === 'ValidationError') {
                // Extract validation error messages
                const errorMessageList = Object.keys(error.errors).map((property) => {
                    return error.errors[property]?.message || 'Validation error';
                });
                console.log(errorMessageList)
                throw new BadRequestError(errorMessageList); // Assuming BadRequestError accepts an array
            }
            // console.log(error);
            throw new InternalServerError();
        }
    }

  

module.exports={
    findUser,
    createUser
};  