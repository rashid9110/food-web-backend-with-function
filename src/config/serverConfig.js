const dotenv=require('dotenv');
dotenv.config();

//Here we are exporting all the varibles that the project uses

module.exports={
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET
}