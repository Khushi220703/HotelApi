
const bookingSchema = require("../Models/BookedHotelModel");

// add bookings.
const bookHotel = async(req,res) =>{
   
    const {userId,hotelId,roomId,checkInDate,checkOutDate,totalPrice,status,guests} = req.body;

    try {
        

        const bookings = await bookingSchema({userId,hotelId,roomId,checkInDate,checkOutDate,totalPrice,status,guests});

        await bookings.save();

        res.status(201).send({message:"Hotel booked!"});


    } catch (error) {
        console.log(error);
        
        res.status(500).send({message:"There is an error from server side."});
    }
}

const cancelBooking = async(req,res) =>{
    let {id} = req.params;
    id = id.replaceAll(":","");
    try {
        const reponse = await bookingSchema.deleteOne({_id:id});
        res.status(201).send({message:"Booking cancelled!"});

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"There is an error from server side."});
    }
}

module.exports = {bookHotel,cancelBooking};