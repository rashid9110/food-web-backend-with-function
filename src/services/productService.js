const cloudinary=require('../config/cloudinaryConfig');
const productRepositories=require('../repositories/productRepositories')
const fs=require('fs/promises');
async function createProduct(productDetails) {
    
    //1. we should check if an image is comming to create the product 

    const imagePath=productDetails.imagePath;
    if(imagePath){
        try{
            const cloudinaryResponse=await cloudinary.uploader.upload(imagePath);
            var productImage=cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        }catch(error){
            console.log(error)
            throw {response:'not able to create product', statusCode:500}
        }
    }

    const product = await productRepositories.createProduct({
        ...productDetails,
        productImage:productImage,
    });

    if(!product){
       throw {response:'not able to create product', statusCode:500}
    }


    return product;
}

module.exports={
    createProduct,
}