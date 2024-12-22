import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants.js";
import Counter from "../utils/counter.js";

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true,
            unique: true,
        },
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
            minLength: [6, "Password must be atleast 6 characters"],
            required: [true, "Password is required"],
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);

UserModel.getUser = async (req, successCallback, errorCallback) => {
    const reqMail = req?.params?.email;
    const tokenMail = req?.emailFromAuthToken;

    if (reqMail !== tokenMail) {
        errorCallback({ status: 401, message: "Invalid credentials" });
    }

    try {
        const dbRes = await UserModel.find({ email: reqMail });
        successCallback(dbRes);
    } catch (dbErr) {
        console.error("GET | dbErr is: ", dbErr.Error);
        errorCallback(dbErr);
    }
};

UserModel.signIn = async (user, successCallback, errorCallback) => {
    try {
        const dbRes = await UserModel.findOne({ email: user.email });
        if (dbRes) {
            const isPasswordMatch = bcrypt.compareSync(
                user.password,
                dbRes.password
            );
            if (isPasswordMatch) {
                const authToken = jwt.sign(
                    { email: dbRes.email },
                    JWT_SECRET_KEY,
                    {
                        expiresIn: "24h",
                    }
                );
                successCallback({ token: authToken });
            } else {
                errorCallback({ status: 401, message: "Invalid password" });
            }
        } else {
            errorCallback({ message: "User does not exist" });
            return;
        }
    } catch (dbErr) {
        console.error("GET | dbErr is: ", dbErr.Error);
        errorCallback(dbErr);
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
        encryptedPassword = bcrypt.hashSync(user.password, 10);
    } catch (err) {
        console.error("Error hashing password: ", err);
        errorCallback({ message: "Error encrypting password." });
        return;
    }

    try {
        let userId;
        const counter = await Counter.findByIdAndUpdate(
            { _id: "userId" },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true } // Create counter if it doesn't exist
        );
        userId = counter.sequenceValue;

        const dbRes = await UserModel.insertMany([
            { userId, ...user, password: encryptedPassword },
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
export default UserModel;