import Movie from "../models/movieModel.js";
import mongoose from "mongoose";

export const createMovie =  async (req, res)=>{
    const movie = req.body;
    console.warn("movie: ", movie)
    if(!movie.name || !movie.image || !movie.rating || !movie.platform){
        return res.status(400).json({success : false, message: "Please provide all fields!"})
    }

    const newMovie = new Movie(movie);
    try {
        await newMovie.save();
        return res.status(201).json({success: true, data: newMovie});
    } catch (error) {
        console.warn(`Error in create new movie: ${error.message}`);
        return res.status(500).json({success: false, message: "Server error"});
    }
}


export const deleteMovie = async (req, res)=>{
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({success: false, message: "Invalid movie id!"});

    try {
        await Movie.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "Movie deleted successfully!" });
    } catch (error) {
        console.warn(`Error in deleting movie: ${error.message}`);
        return res.status(404).json({success: false, message: "Movie not found!"});
    }
}

export const updateMovie =  async (req, res)=>{
    const {id} = req.params;
    const movie = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({success: false, message: "Invalid movie id!"});

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, movie, {new: true});
        return res.status(200).json({success: true, data: updatedMovie , message: "Movie updated deleted successfully!" });
    } catch (error) {
        console.warn(`Error in deleting movie: ${error.message}`);
        return res.status(500).json({success: false, message: "Server error!"});
    }
}


export const getMovies = async (req, res)=>{
    try {
        console.warn("from get movies!")
        const movies = await Movie.find({});
        res.status(200).json({success: true, data: movies });
    } catch (error) {
        console.warn(`Error in fetching movies: ${error.message}`);
        res.status(500).json({success: false, message: "Movies not found!"});
    }
}