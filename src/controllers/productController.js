const { createProduct, deleteProductById, getProductById, getAllProductsData } = require("../services/productService");
const AppError = require("../utils/appError");
const fs = require('fs/promises');


// async function addProduct(req,res) {

//     try {
//         const product=await createProduct({
//             productName:req.body.productName,
//             description:req.body.description,
//             imagePath:req.file?.path,
//             price:req.body.price,
//             category:req.body.category,//if category is undefined, veg will be stored
//             inStock:req.body.inStock,//if inStock is underfind then true will be stored
    
//         })
//         return res.status(201).json({
//             success:true,
//             message:'successfully create the product',
//             error:{},
//             data:product, 
//         })
//     } catch (error) {
//         if(error instanceof AppError){
//             return res.status(error.statusCode).json({
//                 success:false,
//                 message:error.message,
//                 data:{},
//                 error:error,
//             })
//         }
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:'something want worng',
//             data:{},
//             error:error,
//         })
//     }
// }
// controllers/productController.js

async function addProduct(req, res) {
    try {
        // Log to check the file path received
        console.log("File received:", req.file?.path);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        // Call the service to handle product creation
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file?.path, // /tmp path
            price: req.body.price,
            category: req.body.category || 'veg', // Default to 'veg' if undefined
            inStock: req.body.inStock ?? true,  // Default to true if undefined
        });

        return res.status(201).json({
            success: true,
            message: 'Successfully created the product',
            error: {},
            data: product,
        });

    } catch (error) {
        console.log('Error during product creation:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error.message || error,
        });
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

