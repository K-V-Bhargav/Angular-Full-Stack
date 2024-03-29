const mongoose = require("mongoose");

const youtubeSchema = new mongoose.Schema({
    'videoPath': {
        type: String,
        required: true,
    },
    'comments': {
        type: [String],
        required: true,
    },
    'likes': {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("youtube", youtubeSchema);