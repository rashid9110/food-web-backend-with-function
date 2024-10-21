const AppError=require('./appError');

class UnauthorisedError extends AppError{
    constructor(resource){ 
        super(`User is not authorised properly ` ,404);
    }
}

module.exports=UnauthorisedError;