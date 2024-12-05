import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
},{
    timestamps: true // createdAt, updatedAt
})

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;