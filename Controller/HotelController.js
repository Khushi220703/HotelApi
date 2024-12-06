const HotelModel = require("../Models/HotelModel");

const addHotel = async (req,res) =>{

    const {name,location,description,rooms,amenities,images,rating,reveiws,pricePerNight} = req.body;
    try {
        const response = await HotelModel({name,location,description,rooms,amenities,images,rating,reveiws,pricePerNight});
        await response.save();

        res.status(201).send({message:"Hotel added successfully!"})
    } catch (error) {
        console.log(error);
        
        res.status(500).send({message:"There is error from server side 'HotelController'."});
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
    
   console.log(req.params.id);
   
     
    let {id} = req.params;
    id = id.replaceAll(":","");
    try {
        const response = await HotelModel.deleteOne({_id:id});
        console.log(response);
        
        res.status(200).send({message:"Hotel is deleted succesfully"});
    } catch (error) {
        res.status(500).send({message:"There is error from server side 'HotelController'."});
    }
}



module.exports = {addHotel,getAllHotel,deleteHotel};