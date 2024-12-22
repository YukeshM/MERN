import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const create = async (req, res) => {
    try {
        const { firstName, middleName, lastName, mobileNumber, isActive, email, password } = req.body;

        console.warn("obj user: ", req.body)

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            firstName,
            middleName,
            lastName,
            mobileNumber,
            isActive,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.error("email :", email)

        // Find the user by email
        const user = await User.findOne({ email });

        console.error("user : ", user)
        if (!user) {
            return res.status(401).json({
                error:
                    'Invalid credentials'
            });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password,
            user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                error:
                    'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id },
            '9ZT2C7Z9SSLBOL99GXR3QGSVNTP4QM9OX4I1HBAH1IZ6WA874U3OVI35DLT8CXMI', {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error:
                'Internal server error'
        });
    }
}

export const logout = (req, res) => {
    /* 
    You may want to perform additional
    cleanup or session invalidation here
     */
    res.clearCookie('token').send('Logged out successfully');
}