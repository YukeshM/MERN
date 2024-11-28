import express from "express";

const app = express();

app.listen(5000, ()=>{
    console.warn('port started at 5000, http://localhost:5000')
})