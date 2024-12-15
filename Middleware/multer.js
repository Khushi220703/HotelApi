const multer = require("multer");
const path = require("path")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    
    allowed_formats: ["jpg", "jpeg", "png", "gif", "bmp","webp"], 
    resource_type: "image", 
  },
});



const uploadImage = multer({ storage: imageStorage });

 
const uploadMultipleImages = uploadImage.array("images", 5); 



module.exports = {uploadMultipleImages};