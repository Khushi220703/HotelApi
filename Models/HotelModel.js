const mongoose = require('mongoose');

// Define the schema
const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    description: {
        type: String,
        trim: true,
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room', // Reference to Room schema
        },
    ],
    amenities: [
        {
            type: String,
            required: true,
        },
    ], // E.g., ["Free WiFi", "Pool", "Gym"]
    images: [
        {
            url: String,
            description: String,
        },
    ],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to User schema
            },
            comment: {
                type: String,
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
            },
        },
    ],
    pricePerNight: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true, // For future scalability if you want to deactivate hotels
    },
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
hotelSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Export the model
module.exports = mongoose.model('Hotel', hotelSchema);
