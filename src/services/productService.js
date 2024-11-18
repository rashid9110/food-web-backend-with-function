const cloudinary=require('../config/cloudinaryConfig');
const productRepositories=require('../repositories/productRepositories')
const fs=require('fs/promises');
const InternalServerError = require('../utils/InternalServerError');
const NotFoundError = require('../utils/notFoundError');
async function createProduct(productDetails) {
    
    //1. we should check if an image is comming to create the product 

    const imagePath=productDetails.imagePath;
    if(imagePath){
        try{
            const cloudinaryResponse=await cloudinary.uploader.upload(imagePath);
            var productImage=cloudinaryResponse.secure_url;
            await fs.unlink(process.cwd()+"/"+imagePath);
        }catch(error){
            console.log(error);
            throw new InternalServerError();
        }
    }

    //2. Then use the url from cloudinary and other product details to add product in 
    const product = await productRepositories.createProduct({
        ...productDetails,
        productImage:productImage,
    });

    return product;
}

async function getProductById(productId) {
    const response=await productRepositories.getProductById(productId);
    if(!response){
        throw new NotFoundError('Product')
    } 
    return response;
    
}

async function getAllProductsData() {
    const response=await productRepositories.getAllProducts();
    if(!response){
        throw new NotFoundError('Product')
    } 
    return response;
    
}
async function deleteProductById(productId) {
    const response=await productRepositories.deleteProductById(productId);
    console.log(response)
    if(!response){
        throw new NotFoundError('Product')
    } 
    return response;
}

module.exports={
    createProduct,
    getProductById,
    deleteProductById,
    getAllProductsData
}