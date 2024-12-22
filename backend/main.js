import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import movieRoutes from "./route/movie.route.js"
import authRoutes from "./route/auth.route.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());// allows to accept JSON data in body

app.use("/api/movies", movieRoutes)
app.use("/api/user", authRoutes)

app.listen(port, ()=>{
    connectDB();
    console.warn('port started, http://localhost:' + port)
})