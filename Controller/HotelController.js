const HotelModel = require("../Models/HotelModel");
const cloudinary = require('cloudinary').v2;



const addHotel = async (req, res) => {
    const { name, location, description, rooms, amenities, images, rating, reviews, pricePerNight,imageDescriptions } = req.body;
    const imagess = req.files; // chnage name of imagess when not using postman.
   
    
    if (!images || images.length === 0) {
        return res.status(400).send({ message: "Please upload at least three image." });
    }
    
    
    try {
       
    //     const uploadedImages = [];
    //     for(let i = 0;i<imagess.length;i++){
            
    //         const image = {
    //             url: images[i].path,
    //             description: imageDescriptions[i] || ''
    //         }
    //         uploadedImages.push(image);
    //     }

    //    console.log(uploadedImages);
       
        // Create a new hotel document
        const newHotel = new HotelModel({
            name,
            location,
            description,
            rooms,
            amenities,
            images,  // :uploadedImages , // Save the Cloudinary URLs in the `images` field
            rating,
            reviews,
            pricePerNight,
        });

        await newHotel.save();
        res.status(201).send({ message: "Hotel added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error uploading hotel details to the server." });
    }
};


const getAllHotel = async (req,res) =>{
   
    
    
    try {
        const response = await HotelModel.find();
        
        
        res.status(200).send(response);

    } catch (error) {

        console.log(error);
        res.status(500).send({message:"There is error from server side 'HotelController'."});
    }
};

const deleteHotel = async (req,res) =>{
     
    let {id} = req.params;
    id = id.replaceAll(":","");
    try {
        const response = await HotelModel.deleteOne({_id:id});
        
        
        res.status(200).send({message:"Hotel is deleted succesfully"});
    } catch (error) {
        res.status(500).send({message:"There is error from server side."});
    }
}

const addReview = async (req, res) => {
    const { _id, email, username, comment, rating } = req.body;

    
    const review = {
        email: email,
        username: username,
        comment: comment, 
        rating: rating,
    };

    console.log(review,username);
    
    try {
       
        const hotel = await HotelModel.findById(_id);

        if (hotel) {
           
            const updateResponse = await HotelModel.updateOne(
                { _id },
                { $push: { reviews: review } }
            );

            console.log(updateResponse);
            res.status(201).send({ message: "Review added successfully!" });
        } else {
            res.status(400).send({ message: "Hotel does not exist!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There is an error on the server side." });
    }
};




module.exports = {addHotel,getAllHotel,deleteHotel,addReview};