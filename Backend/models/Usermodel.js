import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants.js";
import dotenv from "dotenv";
import AppointmentModel from "./AppointmentModel.js";

dotenv.config();

const HashSalt = parseInt(process.env.HashSalt, 10);

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: [true, "First Name is required"],
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: [true, "Email is required"],
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },
        password: {
            type: String,
            minLength: [6, "Password must be at least 6 characters"],
            required: [true, "Password is required"],
        },
        photo: {
            type: String, // URL or file path to the photo
            default: "/DefaultAvatar.png", 
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);

UserModel.getUser = async (req, successCallback, errorCallback) => {
    const reqMail = req?.params?.email;
    const tokenMail = req?.emailFromAuthToken;

    if (reqMail !== tokenMail) {
        return errorCallback({ status: 401, message: "Invalid credentials" });
    }

    try {
        const dbRes = await UserModel.findOne({ email: reqMail });
        if (!dbRes) {
            return errorCallback({ status: 404, message: "User not found" });
        }
        successCallback(dbRes);
    } catch (dbErr) {
        console.error("GET | dbErr is: ", dbErr.message);
        errorCallback({ status: 500, message: "Database error" });
    }
};

UserModel.signIn = async (user, successCallback, errorCallback) => {
    try {
        const dbRes = await UserModel.findOne({ email: user.email });
        if (dbRes) {
            const isPasswordMatch = await bcrypt.compare(user.password, dbRes.password);
            if (isPasswordMatch) {
                const authToken = jwt.sign(
                    { email: dbRes.email },
                    JWT_SECRET_KEY,
                    { expiresIn: "24h" }
                );
                return successCallback({ token: authToken });
            }
            return errorCallback({ status: 401, message: "Invalid password" });
        }
        errorCallback({ status: 404, message: "User does not exist" });
    } catch (dbErr) {
        console.error("POST | dbErr is: ", dbErr.message);
        errorCallback({ status: 500, message: "Database error" });
    }
};

UserModel.addUser = async (user, successCallback, errorCallback) => {
    if (user?.password?.length < 6) {
        errorCallback({
            message: "Password must be at least 6 characters long",
        });
        return;
    }

    let encryptedPassword = "";
    try {
        encryptedPassword = bcrypt.hashSync(user.password, HashSalt);
    } catch (err) {
        console.error("Error hashing password: ", err);
        errorCallback({ message: "Error encrypting password." });
        return;
    }

    try {
        const dbRes = await UserModel.insertMany([
            { ...user, password: encryptedPassword },
        ]);
        console.log("POST | dbRes is: ", dbRes);
        successCallback(dbRes);
    } catch (dbError) {
        if (dbError.name === "ValidationError") {
            const validationErrors = Object.values(dbError.errors)
                .map((err) => err.message)
                .join(", ");
            errorCallback({ message: validationErrors });
        } else if (dbError.code === 11000) {
            errorCallback({ message: "Email already exists. Please use a different email." });
        } else {
            console.error("POST | dbError is: ", dbError.message);
            errorCallback({ message: "An unexpected error occurred." });
        }
    }
};

UserModel.deleteUserAndBookings = async function(email, password) {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        // Find and verify user
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw { status: 404, message: "User not found" };
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw { status: 401, message: "Invalid password" };
        }

        // Delete all related bookings
        await AppointmentModel.deleteMany({ email }, { session });
        
        // Delete user
        await UserModel.findOneAndDelete({ email }, { session });

        await session.commitTransaction();
        return true;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};


export default UserModel;