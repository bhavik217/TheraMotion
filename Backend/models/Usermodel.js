import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants.js";

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
        return errorCallback({ message: "Password must be at least 6 characters long" });
    }

    try {
        const encryptedPassword = await bcrypt.hash(user.password, 10);
        const dbRes = await UserModel.create({ ...user, password: encryptedPassword });
        successCallback(dbRes);
    } catch (dbError) {
        if (dbError.name === "ValidationError") {
            const validationErrors = Object.values(dbError.errors)
                .map((err) => err.message)
                .join(", ");
            errorCallback({ status: 400, message: validationErrors });
        } else if (dbError.code === 11000) {
            errorCallback({ status: 400, message: "Email already exists. Please use a different email." });
        } else {
            console.error("POST | dbError is: ", dbError.message);
            errorCallback({ status: 500, message: "An unexpected error occurred." });
        }
    }
};
export default UserModel;