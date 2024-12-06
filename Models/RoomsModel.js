const mongoose = require('mongoose');

// Define the schema
const roomSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // Reference to the Hotel schema
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate room numbers
    },
    type: {
        type: String,
        enum: ['single', 'double', 'suite', 'deluxe'], // Common room types
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    pricePerNight: {
        type: Number,
        required: true,
    },
    amenities: [
        {
            type: String,
            required: true,
        },
    ], // E.g., ["Air Conditioning", "TV", "Mini Bar"]
    images: [
        {
            url: String,
            description: String,
        },
    ],
    isAvailable: {
        type: Boolean,
        default: true,
    },
    maxOccupancy: {
        type: Number,
        required: true,
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking', // Reference to Booking schema
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

// Middleware to update `updatedAt` field before saving
roomSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const RoomSchema = new mongoose.model('Room', roomSchema);
module.exports = RoomSchema;
