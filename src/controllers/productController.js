const { createProduct, deleteProductById, getProductById, getAllProductsData } = require("../services/productService");
const AppError = require("../utils/appError");


async function addProduct(req,res) {

    try {
        const product=await createProduct({
            productName:req.body.productName,
            description:req.body.description,
            imagePath:req.file?.path,
            price:req.body.price,
            category:req.body.category,//if category is undefined, veg will be stored
            inStock:req.body.inStock,//if inStock is underfind then true will be stored
    
        })
        return res.status(201).json({
            success:true,
            message:'successfully create the product',
            error:{},
            data:product, 
        })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error,
            })
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something want worng',
            data:{},
            error:error,
        })
    }
}

async function getProduct(req,res) {
    try {
        const resource=await getProductById(req.params.id);
        return res.status(200).json({
            success:true,
            message:'SuccessFully fetched the product',
            error:{},
            data:resource,
        })
      
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error,
            })
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something want worng',
            data:{},
            error:error,
        })
    }
}

async function getProducts(req,res) {
    try {
        const resource=await getAllProductsData();
        return res.status(200).json({
            success:true,
            message:'SuccessFully fetched the product',
            error:{},
            data:resource,
        })
      
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error,
            })
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something want worng',
            data:{},
            error:error,
        })
    }
}

async function deleteProduct(req,res) {
    try {
        const resource=await deleteProductById(req.params.id);
        console.log(resource)
        return res.status(200).json({  
            success:true,
            message:'SuccessFully Deleted the product',
            error:{},
            data:resource,
        })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error,
            })
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something want worng',
            data:{},
            error:error,
        })
    }
}





module.exports={
    addProduct,
    getProduct,
    deleteProduct,
    getProducts,
}

