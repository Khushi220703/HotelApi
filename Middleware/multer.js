const multer = require("multer");
const path = require("path")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinaryConfig")

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hotel_images",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "bmp","webp"], 
    resource_type: "image", 
  },
});




const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});


 
 
 
const uploadMultipleImages = (req, res, next) => {
  uploadImage.array("images", 5)(req, res, (err) => {
      if (err) {
          console.error("Multer Error:", err);
          return res.status(400).json({ message: "Multer Error", error: err });
      }
      console.log("Middleware hit after multer");
      console.log("Files received:", req.files);
      console.log("Request body:", req.body);
      next();
  });
};





module.exports = {uploadMultipleImages};