const AppError=require('./appError');

class BadRequestError extends AppError{

    constructor(invalidParams){
        let message='';
        invalidParams.forEach(params => {
            message+=`${params}\n`;

        });
        console.error(message);
        super(`The requist has the following invalid parameters \n${invalidParams}`,400);
    }
}

module.exports=BadRequestError;