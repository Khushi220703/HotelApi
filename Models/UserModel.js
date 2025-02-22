const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'admin'], 
        default: 'customer',
    },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking', 
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// userSchema.pre('save', async function(next){
     
//     if(!this.isModified('password')) return next(); 

//     const saltRounds = parseInt(process.env.SALT,10) || 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
// })
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
const HotelUser = new mongoose.model('HotelUser', userSchema);
// Export the model
module.exports = HotelUser;
