const RoomSchema = require("../Models/RoomsModel");

const addRooms = async(req,res) =>{

    const {hotelId,roomNumber,type,description,pricePerNight,amenities,images,isAvailable,maxOccupancy,bookings} = req.body;
    try {
        const response = await RoomSchema({hotelId,roomNumber,type,description,pricePerNight,amenities,images,isAvailable,maxOccupancy,bookings});
        await response.save();
        res.status(201).send({message:"Rooms added to your hotel"});

    } catch (error) {
        console.log(error);
        
        res.status(500).send({message:"There is an error from server side."});
    }
};


const showHotelRooms = async(req,res) =>{
    const {hotelId} = req.params;
    try {
         const response = await RoomSchema.find({hotelId:hotelId});
         res.status(201).send(response);

    } catch (error) {
        console.log(error);
        
        res.status(500).send({message:"There is an error from server side."});
    }
};

module.exports = {addRooms,showHotelRooms};