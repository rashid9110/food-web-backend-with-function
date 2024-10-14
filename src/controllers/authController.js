const { loginUser } = require("../services/authService");

async function login(req,res) {

    try{
        const loginPayload=req.body;

        //auth service
        const response=await loginUser(loginPayload)

        return res.status(200).json({
            success:true,
            message:'logined in successfully',
            data:response,
            error:{}
            
        })
    }catch(error){
        return res.status(error.statusCode).json({
           success:false,
           message:error.message,
           data:{},
           error:error,
        })
    }
   
    
}

module.exports={
    login,
}