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

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  

  const getAllHotel = async (req, res) => {
    const { email } = req.params;
    const { latitude, longitude } = req.query;
  
    console.log("Query params received:", { latitude, longitude });
  
    try {
      const user = await HotelUser.findOne({ email });
      if (!user) return res.status(404).send({ message: "User not found" });
  
      if (user.role === "admin") {
        const adminHotels = await HotelModel.find({ email });
        return res.status(200).send(adminHotels);
      }
  
      const allHotels = await HotelModel.find();
  
      // Check if lat/lon exist
      if (latitude && longitude) {
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);
  
        const sortedHotels = allHotels
          .map((hotel) => {
            const hotelLat = hotel.location.latitude;
            const hotelLon = hotel.location.longitude;
  
            const distance = hotelLat && hotelLon
              ? getDistanceFromLatLonInKm(userLat, userLon, hotelLat, hotelLon)
              : Infinity;
  
            return { ...hotel._doc, distance };
          })
          .sort((a, b) => a.distance - b.distance);
  
        console.log("Sorted hotels based on location:");
        sortedHotels.forEach(h => console.log(h.name, h.distance));
  
        return res.status(200).send(sortedHotels);
      }
  
      // If location not available
      return res.status(200).send(allHotels);
  
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Server error in getAllHotel" });
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