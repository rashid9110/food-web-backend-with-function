const { createOrder, getAllOrdersCreateByUser, updateOrder, getOrderDetailsById } = require("../services/orderService");
const AppError = require("../utils/appError");

async function createNewOrder(req, res) {
    try{
// console.log("paymentMethod",req.body.paymentMethod);
        const order=await createOrder(req.user.id,req.body.paymentMethod);
        return res.status(201).json({
            success:true,
            message:"Successfully created a new order",
            error:{},
            data:order,
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{},
            })
        }
        return res.status(500).json({
            success:false,
                message:"Something went wrong",
                error:error,
                data:{},
        })
    }
}


async function getAllOrdersByUser(req, res) {
    try{
        const order=await getAllOrdersCreateByUser(req.user.id);
        return res.status(200).json({
            success:true,
            message:"Successfully fetched the order",
            error:{},
            data:order,
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{},
            })
        }
        return res.status(500).json({
            success:false,
                message:"Something went wrong",
                error:error,
                data:{},
        })
    }
}

async function getOrder(req, res) {
    try{
        const order=await getOrderDetailsById(req.params.orderId);
        console.log(req.params.orderId )
        return res.status(200).json({
            success:true,
            message:"Successfully fetched the order",
            error:{},
            data:order,
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{},
            })
        }
        return res.status(500).json({
            success:false,
                message:"Something went wrong",
                error:error,
                data:{},
        })
    }
}

async function cancelledOrder(req, res) {
    try{
        const order=await updateOrder(req.params.orderId,"CANCELLED");
        return res.status(200).json({
            success:true,
            message:"Successfully update the order",
            error:{},
            data:order,
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{},
            })
        }
        return res.status(500).json({
            success:false,
                message:"Something went wrong",
                error:error,
                data:{},
        })
    }
}

async function changeOrderSatatus(req, res) {
    try{
        const order=await updateOrder(req.params.orderId,req.body.status);
        return res.status(200).json({
            success:true,
            message:"Successfully update the order",
            error:{},
            data:order,
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{},
            })
        }
        return res.status(500).json({
            success:false,
                message:"Something went wrong",
                error:error,
                data:{},
        })
    }
}
module.exports={

    createNewOrder,
    getAllOrdersByUser,
    getOrder,
    cancelledOrder,
    changeOrderSatatus,
 
}