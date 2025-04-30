const cloudinary=require('../config/cloudinaryConfig');
const productRepositories=require('../repositories/productRepositories')
const fs=require('fs/promises');
const InternalServerError = require('../utils/InternalServerError');
const NotFoundError = require('../utils/notFoundError');


async function createProduct(productDetails) {
    const imagePath = productDetails.imagePath;
    let productImage = ''; // Initialize productImage

    // 1. Check if an image path is provided
    if (imagePath) {
        try {
            // Upload image to Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath, {
                resource_type: 'auto',  // Automatically detect the type of file (e.g., image, video)
            });

            // Store the Cloudinary secure URL
            productImage = cloudinaryResponse.secure_url;

            // 2. Delete the temporary file after uploading to Cloudinary
            try {
                await fs.unlink(imagePath); // Remove the temp file
                console.log(`Temporary file deleted: ${imagePath}`);
            } catch (unlinkError) {
                console.error('Error deleting temporary file:', unlinkError);
                // Don't throw error for unlink failure; proceed anyway
            }

        } catch (cloudinaryError) {
            console.error('Cloudinary upload failed:', cloudinaryError);
            throw new InternalServerError('Image upload failed');
        }
    } else {
        console.warn('No image provided, proceeding without image');
        // Optionally, you could set a default image URL here
        // productImage = 'default_image_url'; // Set a fallback image URL
    }

    // 3. Create the product using the provided details and Cloudinary URL (if any)
    try {
        const product = await productRepositories.createProduct({
            ...productDetails,
            productImage,
        });

        return product;
    } catch (dbError) {
        console.error('Database error during product creation:', dbError);
        throw new InternalServerError('Error creating product in the database');
    }
}

// async function createProduct(productDetails) {
    
//     //1. we should check if an image is comming to create the product 

//     const imagePath=productDetails.imagePath;
//     if(imagePath){
//         try{
//             const cloudinaryResponse=await cloudinary.uploader.upload(imagePath);
//             var productImage=cloudinaryResponse.secure_url;
//             await fs.unlink(process.cwd()+"/"+imagePath);
//         }catch(error){
//             console.log(error);
//             throw new InternalServerError();
//         }
//     }

//     //2. Then use the url from cloudinary and other product details to add product in 
//     const product = await productRepositories.createProduct({
//         ...productDetails,
//         productImage:productImage,
//     });

//     return product;
// }

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