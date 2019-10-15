const mongoose = require("mongoose"), Schema = mongoose.Schema;

const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    rating: {
        type: Number, min: 1, max: 5
    },
    duration: {
        type: mongoose.Decimal128,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    hashtags: {
        type: [String]
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'city',
        required: true
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
});

module.exports = mongoose.model("itinerary", itinerarySchema);