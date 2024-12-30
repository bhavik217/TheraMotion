import express from "express";
import UserModel from "../models/Usermodel.js";
import { verifyToken } from "../utils/helpers.js";
import upload from "../utils/multer.js";
import multer from "multer";

const router = express.Router();

router.get("/:email", verifyToken, (req, res) => {
    UserModel.getUser(
        req,
        (dbRes) => {
            res.status(200).json(dbRes);
        },
        (dbErr) => {
            res.status(dbErr.status || 500).json({ error: dbErr.message });
        }
    );
});

router.put("/:email", verifyToken, async (req, res) => {
    const { email } = req.params;
    const { firstName, lastName, newEmail } = req.body;

    try {
        // Find the user by email (or another unique identifier)
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user fields if provided
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = newEmail || user.email;

        // Save the updated user
        await user.save();

        // Send the updated user data back to the client
        res.status(200).json(user);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", (req, res) => {
    const user = req.body;

    UserModel.addUser(
        user,
        (dbRes) => {
            if (dbRes) {
                res.send(dbRes);
            } else {
                res.status(400);
                res.send(dbRes);
            }
        },
        (dbError) => {
            console.log(dbError.name);
            if (dbError.name === "ValidationError") {
                res.status(400); //client side error
            } else {
                res.status(500); //server side error
            }
            res.send({ error: dbError.message });
        }
    );
});

router.post("/signin", (req, res) => {
    UserModel.signIn(
        req.body,
        (dbRes) => {
            res.status(200).json(dbRes);
        },
        (dbErr) => {
            res.status(dbErr.status || 500).json({ error: dbErr.message });
        }
    );
});

router.post("/upload-photo", verifyToken, (req, res) => {
    upload.single("photo")(req, res, async (err) => {
        try {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    success: false,
                    message: "Error uploading file: " + err.message
                });
            }
            
            if (err?.message === "FILE_TYPE_ERROR") {
                return res.status(400).json({
                    success: false,
                    message: "Only .jpeg, .jpg, and .png files are allowed"
                });
            }
            
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Server error during upload"
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded"
                });
            }

            const updatedUser = await UserModel.findOneAndUpdate(
                { email: req.emailFromAuthToken },
                { photo: req.file.path }, // Cloudinary URL
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: true,
                secure_url: req.file.path
            });

        } catch (error) {
            console.error("Server error:", error);
            return res.status(500).json({
                success: false,
                message: "Error uploading photo"
            });
        }
    });
});

router.delete("/:email", verifyToken, async (req, res) => {
    const { email } = req.params;
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }
    
    if (email !== req.emailFromAuthToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized to delete this account"
        });
    }

    try {
        await UserModel.deleteUserAndBookings(email, password);
        
        res.clearCookie('authToken');
        res.status(200).json({
            success: true,
            message: "Account and all related bookings deleted"
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error deleting account"
        });
    }
});

export default router;