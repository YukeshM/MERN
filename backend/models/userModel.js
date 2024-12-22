import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
        },
    middleName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    isActive : {
        type: Boolean,
        required: true
    }
    },{
    timestamps: true // createdAt, updatedAt
});

// Export the user model
const User = mongoose.model('User', userSchema);
export default User;