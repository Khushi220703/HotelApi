const HotelModel = require("../Models/HotelModel");
const HotelUser = require("../Models/UserModel");
const cloudinary = require('cloudinary').v2;



const addHotel = async (req, res) => {
   

    try {
      
        
        const { name, location, description, email, rooms, amenities, rating, pricePerNight,imageDescriptions} = req.body;
        const images = req.files; // Ensure images are received
        // const imageDescriptions = Array.isArray(req.body.imageDescriptions)
        //     ? req.body.imageDescriptions
        //     : [req.body.imageDescriptions];
        const parsedLoaction = JSON.parse(location);
        const parsedAmenities = JSON.parse(amenities);
        const paredImageDescriptions = JSON.parse(imageDescriptions);

        if (!images || images.length === 0) {
            return res.status(400).send({ message: "Please upload at least three image." });
        }
    
       
        
        const uploadedImages = [];
        for(let i = 0;i<images.length;i++){

   
            const image = {
                url: images[i].path,
                description: paredImageDescriptions[i] || ''
            }
            uploadedImages.push(image);
        }

       
        const newHotel = new HotelModel({
            name,
            location:parsedLoaction,
            email,
            description,
            rooms,
            amenities:parsedAmenities,
            images: uploadedImages,
            rating,
            pricePerNight,
        });

        await newHotel.save();
        res.status(201).json({ message: "Hotel added successfully!" });
    } catch (error) {
        console.error("Error adding hotel:", error);
        res.status(500).json({ message: "Error uploading hotel details to the server." });
    }
};


const getAllHotel = async (req,res) =>{
   
    const {email} = req.params;
    
    
    
    try {

        const responses = await HotelUser.findOne({email});

        if(responses.role === "admin"){
        
        const response = await HotelModel.find({email:email});
        res.status(200).send(response);
    }else{

        const response = await HotelModel.find();
        console.log(response);
        
        
        res.status(200).send(response);
    }

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