import express from "express";
import UserModel from "../models/Usermodel.js";
import { verifyToken } from "../utils/helpers.js";
import upload from "../utils/multer.js";

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

// Upload profile photo
router.post("/upload-photo", verifyToken, upload.single("photo"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "No file uploaded" });
        }

        // Store the file path to the user's profile photo in the database
        const photoPath = `/uploads/${req.file.filename}`;

        // Update the user's photo in the database
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: req.emailFromAuthToken },
            { photo: photoPath },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        // Return the updated user profile with the new photo
        res.status(200).send({ photoPath: updatedUser.photo });
    } catch (err) {
        console.error("Error uploading photo:", err);
        res.status(500).send({ message: "Error uploading photo" });
    }
});

export default router;