const {Product}=require('../schema/productSchema');
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/InternalServerError');

async function createProduct(productDetails) {

    try{
    const response=await Product.create(productDetails);
    return response;
    }catch(error){
       if (error.name === 'ValidationError') {
            // Extract validation error messages
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property]?.message || 'Validation error';
            });
            throw new BadRequestError(errorMessageList); // Assuming BadRequestError accepts an array
        }
        console.log(error);
        throw new InternalServerError();
    }
}  

async function getProductById(productId) {
    try {
        const product=await Product.findById(productId);

        return product;
    } catch (error) {
        console.log(error)
        throw new InternalServerError();
    }
}

async function getAllProducts() { 
    try {
        const products=await Product.find({});
        return products;
    } catch (error) {
        console.log(error)
        throw new InternalServerError();
    }
}

async function deleteProductById(productId) {
    try {
        const resource=await Product.findByIdAndDelete(productId);
        console.log(resource)
        return resource;
    } catch (error) {
        console.log(error)
        throw new InternalServerError();
    }
}
module.exports={
    createProduct,
    getProductById,
    deleteProductById,
    getAllProducts,
}